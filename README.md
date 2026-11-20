# Kainex8 — site

Site institucional da Kainex8 (K8) · Soluções em apps, empresa de apps do TreeTop Group.
No ar em **https://k8.vinculoapp.com.br** (Railway).

## O que tem
- Página pública (início, apps, como trabalhamos, sobre, contato) com fontes e imagens servidas pelo próprio site.
- Formulário "Conte sua ideia" que **grava o contato** no Postgres (com antispam e aceite de privacidade).
- Botão de WhatsApp com os números da variável `WHATSAPP_K8`.
- Ponte assinada com a **K8 Central**: a central busca os contatos novos, mostra na caixa "Contatos do site" e avisa por e-mail.
- SEO: descrição, imagem de compartilhamento, `sitemap.xml`, `robots.txt`, dados da empresa (JSON-LD).
- Página `/privacidade` (LGPD) e página 404.

## Rodar local
```bash
npm install
cp .env.example .env   # ajuste DATABASE_URL
DATABASE_URL=postgresql://... npm start   # http://localhost:3000
```

## Testes
```bash
TEST_DATABASE_URL=postgresql://postgres@127.0.0.1:5433/k8site_teste npm test
```

## Deploy
Railway, projeto **kainex8-site**: serviço `kainex8-site` (este repositório, branch `main`) + Postgres.
Cada push na `main` publica sozinho. Variáveis: veja `.env.example`.
