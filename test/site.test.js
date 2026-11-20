// Testes do site: páginas, segurança, formulário de contato e ponte com a K8 Central.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const request = require("supertest");

const BASE = process.env.TEST_DATABASE_URL || "postgresql://postgres@127.0.0.1:5433/k8site_teste";
process.env.DATABASE_URL = BASE; process.env.NODE_ENV = "test";
process.env.WHATSAPP_K8 = "5517981702726,(17) 98102-2684";
const par = crypto.generateKeyPairSync("ed25519");
process.env.TREETOP_CHAVE_PUBLICA = par.publicKey.export({ format: "der", type: "spki" }).toString("base64");
const assinar = (metodo, caminho, corpo) => {
  const ts = String(Date.now()), c = metodo === "GET" ? "" : JSON.stringify(corpo || {});
  return { "x-treetop-ts": ts, "x-treetop-assinatura": crypto.sign(null, Buffer.from(`${ts}\n${metodo}\n${caminho}\n${c}`), par.privateKey).toString("base64") };
};

let app, db;
before(async () => {
  const { Client } = require("pg");
  const adm = new Client({ connectionString: BASE.replace(/\/[^/]+$/, "/postgres") }); await adm.connect();
  const nome = BASE.split("/").pop();
  await adm.query(`drop database if exists ${nome}`); await adm.query(`create database ${nome}`); await adm.end();
  db = require("../server/db"); await db.preparar();
  app = require("../server/index").criarApp();
});
after(async () => { await db.pool.end(); });

test("páginas: início, privacidade, robots, sitemap, 404 e cabeçalhos de segurança", async () => {
  const r = await request(app).get("/");
  assert.equal(r.status, 200);
  assert.match(r.text, /<meta name="description"/);
  assert.match(r.text, /og:image/);
  assert.ok(!/googleapis|gstatic/.test(r.text), "sem fontes do Google");
  assert.match(r.headers["content-security-policy"], /script-src 'self'/);
  assert.equal(r.headers["x-frame-options"], "SAMEORIGIN");
  assert.equal((await request(app).get("/privacidade")).status, 200);
  assert.match((await request(app).get("/robots.txt")).text, /Sitemap: https:\/\/k8\.vinculoapp\.com\.br\/sitemap\.xml/);
  assert.match((await request(app).get("/sitemap.xml")).text, /<loc>https:\/\/k8\.vinculoapp\.com\.br\/<\/loc>/);
  const n = await request(app).get("/nao-existe");
  assert.equal(n.status, 404); assert.match(n.text, /não existe/);
  assert.equal((await request(app).get("/assets/site.js")).status, 200);
  assert.match((await request(app).get("/assets/site.css")).headers["cache-control"], /max-age=604800/);
});

test("WhatsApp: números vêm da configuração, só dígitos e com 55", async () => {
  const r = await request(app).get("/api/config");
  assert.deepEqual(r.body.whatsapp, ["5517981702726", "5517981022684"]);
});

test("contato: valida, exige aceite, barra robô e guarda com o WhatsApp normalizado", async () => {
  const bom = { nome: "Maria Souza", whatsapp: "(17) 99123-4567", tipo: "Criar um app sob medida", ideia: "App para minha loja", origem: "#contato", aceite: true };
  assert.equal((await request(app).post("/api/contato").send({ ...bom, nome: "" })).status, 400);
  assert.equal((await request(app).post("/api/contato").send({ ...bom, whatsapp: "123" })).status, 400);
  assert.equal((await request(app).post("/api/contato").send({ ...bom, aceite: false })).status, 400);
  const robo = await request(app).post("/api/contato").send({ ...bom, nome: "Robô", site: "http://spam" });
  assert.equal(robo.status, 200, "robô acha que deu certo");
  const ok = await request(app).post("/api/contato").send(bom);
  assert.equal(ok.status, 200);
  assert.equal((await request(app).post("/api/contato").send(bom)).status, 200, "reenvio não dá erro");
  const { rows } = await db.q("select * from contatos order by id");
  assert.equal(rows.length, 1, "robô não entra e reenvio em 2 minutos não duplica");
  assert.equal(rows[0].whatsapp, "5517991234567");
  assert.equal(rows[0].status, "novo");
  assert.ok(rows[0].ip_hash && !rows[0].ip_hash.includes("."), "guarda só o resumo do IP");
  assert.equal((await request(app).post("/api/contato").set("content-type", "application/json").send("{quebrado")).status, 400);
});

test("ponte: sem assinatura 401; com assinatura traz resumo, contatos e muda status", async () => {
  assert.equal((await request(app).get("/api/treetop/resumo")).status, 401);
  const r = await request(app).get("/api/treetop/resumo").set(assinar("GET", "/api/treetop/resumo"));
  assert.equal(r.status, 200, JSON.stringify(r.body));
  assert.equal(r.body.series.meses.length, 12);
  assert.equal(r.body.series.linhas[0].valores[11], 1);
  assert.equal(r.body.indicadores.find(i => i.rotulo === "Esperando resposta").valor, 1);
  const c = await request(app).get("/api/treetop/contatos").set(assinar("GET", "/api/treetop/contatos"));
  assert.equal(c.body.contatos.length, 1); const id = c.body.contatos[0].id;
  assert.equal(c.body.contatos[0].ip_hash, undefined, "resumo do IP não sai do site");
  const corpo = { status: "em_conversa", observacao: "liguei", quem: "rf@teste.com" };
  const m = await request(app).post(`/api/treetop/contatos/${id}`).set(assinar("POST", `/api/treetop/contatos/${id}`, corpo)).send(corpo);
  assert.equal(m.status, 200);
  assert.equal((await db.q("select status, status_por from contatos where id = $1", [id])).rows[0].status, "em_conversa");
  // assinatura velha não vale
  const ts = String(Date.now() - 5 * 60000);
  const sig = crypto.sign(null, Buffer.from(`${ts}\nGET\n/api/treetop/resumo\n`), par.privateKey).toString("base64");
  assert.equal((await request(app).get("/api/treetop/resumo").set({ "x-treetop-ts": ts, "x-treetop-assinatura": sig })).status, 401);
});

test("LGPD: limpeza apaga descartados antigos e tudo com mais de 24 meses", async () => {
  await db.q("insert into contatos (nome, whatsapp, status, status_em, criado_em) values ('A','5517900000001','descartado', now() - interval '7 months', now() - interval '8 months'), ('B','5517900000002','em_conversa', null, now() - interval '25 months'), ('C','5517900000003','fechado', now(), now() - interval '3 months')");
  await require("../server/index").limparAntigos();
  const nomes = (await db.q("select nome from contatos order by nome")).rows.map(r => r.nome);
  assert.ok(!nomes.includes("A") && !nomes.includes("B") && nomes.includes("C"));
});
