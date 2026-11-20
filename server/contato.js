// Formulário "Conte sua ideia": valida, barra spam e guarda o contato. A K8 Central busca pela ponte e avisa por e-mail.
const crypto = require("crypto");
const express = require("express");
const { z } = require("zod");
const { q } = require("./db");

const limpo = (max) => z.string().trim().max(max).transform(s => s.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ""));
const CONTATO = z.object({
  nome: limpo(80).pipe(z.string().min(2, "Escreva seu nome.")),
  whatsapp: limpo(30).refine(v => { const d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 13; }, "Confira o WhatsApp com DDD."),
  tipo: limpo(80).optional().default(""),
  ideia: limpo(2000).optional().default(""),
  origem: limpo(60).optional().default(""),
  site: z.string().max(200).optional().default(""),       // armadilha para robôs: campo escondido, gente de verdade deixa vazio
  aceite: z.literal(true, { errorMap: () => ({ message: "Marque que leu a política de privacidade." }) })
});

// número só com dígitos, sempre com 55 na frente (para abrir conversa no WhatsApp)
const normalizarZap = (v) => { let d = v.replace(/\D/g, ""); if (d.length <= 11) d = "55" + d; return d; };
const resumoIp = (ip) => crypto.createHash("sha256").update(String(process.env.SAL_IP || "k8") + "|" + String(ip || "")).digest("hex").slice(0, 16);

function rotas(limite){
  const r = express.Router();
  r.post("/contato", limite(10, 5), async (req, res, next) => {
    try {
      const d = CONTATO.parse(req.body || {});
      if (d.site) return res.json({ ok: true });   // robô: finge que deu certo e não guarda
      const ip = resumoIp(req.ip);
      // mesma pessoa mandando de novo em 2 minutos: não duplica
      const dup = (await q("select id from contatos where ip_hash = $1 and whatsapp = $2 and criado_em > now() - interval '2 minutes'", [ip, normalizarZap(d.whatsapp)])).rows[0];
      if (!dup) await q("insert into contatos (nome, whatsapp, tipo, ideia, origem, ip_hash) values ($1,$2,$3,$4,$5,$6)",
        [d.nome, normalizarZap(d.whatsapp), d.tipo, d.ideia, d.origem, ip]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  return r;
}

module.exports = { rotas, normalizarZap, CONTATO };
