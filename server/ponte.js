// Ponte com a K8 Central (mesmo padrão dos apps): a central assina cada pedido com Ed25519 e o site confere
// com a chave pública dela (TREETOP_CHAVE_PUBLICA, ou buscada em TREETOP_CENTRAL_URL/chave-publica).
// Sem nenhuma das duas, a ponte não existe (404). Os nomes técnicos "treetop" ficaram por compatibilidade.
const crypto = require("crypto");
const express = require("express");
const { z } = require("zod");
const { q } = require("./db");

let buscada = { valor: "", em: 0 };
async function carregarPublica(){
  if (process.env.TREETOP_CHAVE_PUBLICA) return;
  const url = String(process.env.TREETOP_CENTRAL_URL || "").trim().replace(/\/+$/, "");
  if (!/^https:\/\//.test(url) && !(process.env.NODE_ENV === "test" && /^http:\/\//.test(url))) return;
  if (buscada.valor && Date.now() - buscada.em < 3600e3) return;
  try {
    const r = await fetch(url + "/chave-publica", { signal: AbortSignal.timeout(5000) });
    const t = (await r.text()).trim();
    if (r.ok && /^[A-Za-z0-9+/=]{40,200}$/.test(t)) buscada = { valor: t, em: Date.now() };
  } catch (_) { /* tenta de novo no próximo pedido */ }
}
const publica = () => String(process.env.TREETOP_CHAVE_PUBLICA || buscada.valor || "").trim();
const ligada = () => !!(process.env.TREETOP_CHAVE_PUBLICA || process.env.TREETOP_CENTRAL_URL);

function assinaturaOk(req){
  const pub = publica(), ts = String(req.get("x-treetop-ts") || ""), sig = String(req.get("x-treetop-assinatura") || "");
  if (!pub || !/^\d{10,15}$/.test(ts) || !sig || Math.abs(Date.now() - Number(ts)) > 2 * 60000) return false;
  try {
    const chave = crypto.createPublicKey({ key: Buffer.from(pub, "base64"), format: "der", type: "spki" });
    const corpo = req.method === "GET" ? "" : JSON.stringify(req.body || {});
    return crypto.verify(null, Buffer.from(`${ts}\n${req.method}\n${req.baseUrl}${req.path}\n${corpo}`), chave, Buffer.from(sig, "base64"));
  } catch (_) { return false; }
}

const MESES_SQL = `with m as (
  select to_char(d, 'YYYY-MM') as mes, d as ini, d + interval '1 month' as fim
  from generate_series(date_trunc('month', now() at time zone 'America/Sao_Paulo') - interval '11 months',
                       date_trunc('month', now() at time zone 'America/Sao_Paulo'), interval '1 month') d)`;

function rotas(){
  const r = express.Router();
  r.use((req, res, next) => ligada() ? next() : res.status(404).json({ erro: "Rota não encontrada." }));
  r.use(async (req, res, next) => { await carregarPublica(); return assinaturaOk(req) ? next() : res.status(401).json({ erro: "Assinatura da K8 Central inválida." }); });

  // resumo no formato da ponte: o site entra nos números da central (contatos por mês)
  r.get("/resumo", async (_req, res, next) => {
    try {
      const t0 = Date.now();
      const n = (await q(`select count(*)::int as total, count(*) filter (where status = 'novo')::int as novos,
                                 count(*) filter (where criado_em > now() - interval '30 days')::int as d30,
                                 count(*) filter (where status = 'fechado')::int as fechados from contatos`)).rows[0];
      const s = (await q(`${MESES_SQL} select m.mes,
          (select count(*)::int from contatos c where (c.criado_em at time zone 'America/Sao_Paulo') >= m.ini and (c.criado_em at time zone 'America/Sao_Paulo') < m.fim) as contatos,
          (select count(*)::int from contatos c where c.status = 'fechado' and (c.criado_em at time zone 'America/Sao_Paulo') >= m.ini and (c.criado_em at time zone 'America/Sao_Paulo') < m.fim) as fechados
        from m order by m.mes`)).rows;
      const pct = n.total ? Math.round(n.fechados / n.total * 1000) / 10 : null;
      res.json({
        app: "site-k8", manutencao: false, gerado_em: new Date().toISOString(),
        clientes: { total: n.total, pagantes: 0, ativos_30d: n.d30, novos_30d: n.d30 },
        receita: { mes_atual: 0, mrr: 0, por_mes: [] },
        saude: { ok: true, banco_ms: Date.now() - t0 },
        alertas: n.novos ? [{ nivel: "atencao", texto: `${n.novos} contato(s) novo(s) do site esperando resposta.` }] : [],
        destaques: [{ rotulo: "Contatos novos", valor: String(n.novos) }, { rotulo: "Contatos (30 dias)", valor: String(n.d30) }, { rotulo: "Viraram cliente", valor: String(n.fechados) }],
        series: { meses: s.map(x => x.mes), linhas: [
          { chave: "contatos", rotulo: "Contatos pelo site", formato: "numero", valores: s.map(x => x.contatos) },
          { chave: "fechados", rotulo: "Contatos que viraram cliente", formato: "numero", valores: s.map(x => x.fechados) }] },
        indicadores: [
          { grupo: "Contatos", rotulo: "Contatos no total", valor: n.total, formato: "numero" },
          { grupo: "Contatos", rotulo: "Esperando resposta", valor: n.novos, formato: "numero" },
          { grupo: "Contatos", rotulo: "Contatos (30 dias)", valor: n.d30, formato: "numero" },
          { grupo: "Contatos", rotulo: "Viraram cliente", valor: n.fechados, formato: "numero" },
          { grupo: "Contatos", rotulo: "Taxa de fechamento", valor: pct, formato: "porcento" }]
      });
    } catch (e) { next(e); }
  });

  // contatos para a caixa "Contatos do site" da central (mais novos primeiro)
  r.get("/contatos", async (req, res, next) => {
    try {
      const depois = Number(req.query.depois_de) || 0;
      const rows = (await q(`select id, criado_em, nome, whatsapp, tipo, ideia, origem, status, status_em, status_por, observacao
                             from contatos where id > $1 order by id desc limit 300`, [depois])).rows;
      res.json({ contatos: rows });
    } catch (e) { next(e); }
  });

  r.post("/contatos/:id", async (req, res, next) => {
    try {
      const d = z.object({ status: z.enum(["novo", "em_conversa", "fechado", "descartado"]), observacao: z.string().trim().max(500).optional(), quem: z.string().email().max(160) }).strict().parse(req.body || {});
      const u = await q("update contatos set status = $2, observacao = coalesce($3, observacao), status_em = now(), status_por = $4 where id = $1 returning id",
        [Number(req.params.id) || 0, d.status, d.observacao ?? null, d.quem.toLowerCase()]);
      if (!u.rowCount) return res.status(404).json({ erro: "Contato não encontrado." });
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  r.post("/manutencao", (_req, res) => res.json({ ok: true, manutencao: false, aviso: "O site fica sempre no ar." }));
  return r;
}

module.exports = { rotas, assinaturaOk };
