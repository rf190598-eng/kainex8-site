// Site da Kainex8 (K8): página pública + formulário de contato + ponte com a K8 Central.
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { ZodError } = require("zod");
const db = require("./db");

const PUB = path.join(__dirname, "..", "public");
const DOMINIO = (process.env.SITE_URL || "https://k8.vinculoapp.com.br").replace(/\/+$/, "");

function criarApp(){
  const app = express();
  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(helmet({
    contentSecurityPolicy: { directives: {
      defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'"], imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'"], connectSrc: ["'self'"], frameAncestors: ["'none'"], formAction: ["'self'"], objectSrc: ["'none'"], baseUri: ["'self'"]
    } },
    crossOriginEmbedderPolicy: false,
    strictTransportSecurity: { maxAge: 31536000, includeSubDomains: false }
  }));
  app.use(compression());
  app.use(express.json({ limit: "20kb" }));

  const limite = (min, max) => process.env.NODE_ENV === "test" && !process.env.TESTAR_LIMITE ? (_q, _r, n) => n()
    : rateLimit({ windowMs: min * 60000, max, standardHeaders: true, legacyHeaders: false, message: { erro: "Muitos envios seguidos. Espere alguns minutos ou fale pelo WhatsApp." } });

  app.use("/api", (_req, res, next) => { res.set("Cache-Control", "no-store"); res.set("X-Robots-Tag", "noindex"); next(); });
  app.use("/api", require("./contato").rotas(limite));
  app.use("/api/treetop", require("./ponte").rotas());
  app.get("/saude", async (_req, res) => { try { await db.q("select 1"); res.json({ ok: true }); } catch (_) { res.status(503).json({ ok: false }); } });
  // números de WhatsApp vêm da configuração (WHATSAPP_K8="5517981702726,5517981022684")
  app.get("/api/config", (_req, res) => res.json({ whatsapp: String(process.env.WHATSAPP_K8 || "").split(",").map(s => s.replace(/\D/g, "")).map(d => d.length === 10 || d.length === 11 ? "55" + d : d).filter(d => d.length >= 12 && d.length <= 13) }));

  app.get("/sitemap.xml", (_req, res) => res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMINIO}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${DOMINIO}/privacidade</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>`));
  app.get("/robots.txt", (_req, res) => res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${DOMINIO}/sitemap.xml\n`));
  app.get("/privacidade", (_req, res) => res.sendFile(path.join(PUB, "privacidade.html"), { headers: { "Cache-Control": "no-cache" } }));

  // arquivos: html sempre conferido (pega versão nova na hora); css/js/imagens/fontes guardados 7 dias
  app.use(express.static(PUB, { index: "index.html", maxAge: "7d", setHeaders: (res, f) => { if (/\.(html|json|webmanifest)$/.test(f)) res.set("Cache-Control", "no-cache"); } }));
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).json({ erro: "Rota não encontrada." });
    res.status(404).sendFile(path.join(PUB, "404.html"));
  });

  app.use((e, _req, res, _next) => {
    if (e instanceof ZodError) return res.status(400).json({ erro: e.issues[0] ? e.issues[0].message : "Dados inválidos." });
    if (e && e.type === "entity.parse.failed") return res.status(400).json({ erro: "Dados inválidos." });
    if (e && e.type === "entity.too.large") return res.status(413).json({ erro: "Texto grande demais." });
    console.error("[erro]", e && e.message);
    res.status(500).json({ erro: "Não deu para enviar agora. Tente de novo ou chame no WhatsApp." });
  });
  return app;
}

// LGPD: contato descartado some depois de 6 meses; qualquer contato some depois de 24 meses
async function limparAntigos(){
  await db.q("delete from contatos where (status = 'descartado' and coalesce(status_em, criado_em) < now() - interval '6 months') or criado_em < now() - interval '24 months'");
}

if (require.main === module) {
  (async () => {
    if (!process.env.DATABASE_URL) { console.error("Configure DATABASE_URL."); process.exit(1); }
    await db.preparar();
    await limparAntigos().catch(e => console.error("[limpeza]", e.message));
    setInterval(() => limparAntigos().catch(e => console.error("[limpeza]", e.message)), 24 * 3600e3).unref();
    const porta = Number(process.env.PORT || 3000);
    criarApp().listen(porta, () => console.log(`Site K8 no ar na porta ${porta}`));
  })().catch(e => { console.error(e); process.exit(1); });
}

module.exports = { criarApp, limparAntigos };
