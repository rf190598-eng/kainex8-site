-- Contatos que chegam pelo formulário "Conte sua ideia". Dado pessoal (nome e WhatsApp): só para responder o contato.
create table if not exists contatos (
  id          bigserial primary key,
  criado_em   timestamptz not null default now(),
  nome        text not null,
  whatsapp    text not null,
  tipo        text not null default '',
  ideia       text not null default '',
  origem      text not null default '',            -- de qual página veio (ex.: #contato, #app/raio)
  status      text not null default 'novo' check (status in ('novo', 'em_conversa', 'fechado', 'descartado')),
  status_em   timestamptz,
  status_por  text not null default '',
  observacao  text not null default '',
  ip_hash     text not null default ''              -- só um resumo do IP (para barrar spam), nunca o IP
);
create index if not exists contatos_criado on contatos (criado_em desc);
