# Kainex8 — site (manual do projeto)

## O que é
Site público da Kainex8 (K8), a empresa de apps do TreeTop Group (sócios Roberto e Daniel). Mostra o que a K8 faz, os apps próprios e recebe ideias de clientes pelo formulário. Os contatos chegam na K8 Central (caixa "Contatos do site") e por e-mail.

## Stack
Node 20 + Express 4, Postgres (pg), zod, helmet, compression, express-rate-limit. Frontend estático em `public/` (HTML + `assets/site.css` + `assets/site.js`, sem framework). Testes com `node:test` + supertest.

## Onde fica cada coisa
- `server/index.js` — servidor, segurança (CSP), sitemap/robots, 404, limpeza LGPD diária.
- `server/contato.js` — POST /api/contato (validação, antispam com campo escondido, sem duplicar em 2 min).
- `server/ponte.js` — ponte com a K8 Central (/api/treetop/resumo, /contatos, /contatos/:id), assinatura Ed25519.
- `server/esquema.sql` — tabela `contatos` (roda sozinha na subida).
- `public/` — páginas (`index.html`, `privacidade.html`, `404.html`), `assets/`, `fonts/`, `icons/`.
- `docs/licoes.md` — lições aprendidas.

## Comandos
- rodar: `npm start` (precisa de `DATABASE_URL`)
- testar: `TEST_DATABASE_URL=... npm test`
- conferir sintaxe: `npm run check`

## Serviços
- Railway: projeto `kainex8-site` (serviço do site + Postgres). Deploy automático a cada push na `main`.
- Domínio `k8.vinculoapp.com.br`: CNAME no DNS do Registro.br apontando para o Railway.
- K8 Central (repositório treetop-central) busca os contatos pela ponte e manda o e-mail.
- Variáveis em `.env.example` (sem segredos no código).

## Regras e convenções
- Textos para o visitante em português simples; código em português como nos outros apps do grupo.
- Nada de recurso externo (fontes, scripts, imagens de terceiros): a CSP só permite o próprio site.
- Contato é dado pessoal: só nome, WhatsApp e a ideia. IP nunca é guardado (só um resumo para antispam).
- Os nomes técnicos "treetop" da ponte (cabeçalhos x-treetop-*, variáveis TREETOP_*) ficam assim por compatibilidade com a central.

## Não faça
- Não colocar Google Fonts, Analytics ou pixel sem atualizar a política de privacidade e a CSP.
- Não remover o campo escondido `site` do formulário (é a armadilha de robôs).
- Não mudar o domínio sem atualizar `SITE_URL`, a tag canonical e o og:url no `index.html`.
