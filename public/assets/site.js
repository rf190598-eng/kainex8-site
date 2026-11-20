{
/* ---------- ícones ---------- */
const P={
 spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="4"/>',
 phone:'<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 18.5h4"/>',
 loop:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M20 4v5h-5M4 20v-5h5"/>',
 talk:'<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
 pen:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/>',
 code:'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 rocket:'<path d="M5 19c4-1 7-4 9-9l4-4-4 4c-5 2-8 5-9 9z"/><path d="M14 10l-4 4"/>',
 grow:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
 bot:'<rect x="4" y="5" width="16" height="12" rx="3"/><path d="M9 21h6M12 17v4M9 11h.01M15 11h.01"/>',
 star:'<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.6 5.2"/>',
 home:'<path d="M4 11l8-7 8 7v9H4z"/>',list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10.5c0-1.2 1.1-2 2.5-2s2.5.6 2.5 1.6c0 2.4-5 1.4-5 3.8 0 1 1.1 1.6 2.5 1.6s2.5-.8 2.5-2"/>',img:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'};
const ic=(k,s=22,w=2)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=ic(e.dataset.i));

/* ---------- telas dos celulares ---------- */
const sbar=c=>`<div class="sb" style="color:${c}"><span>9:41</span><span style="display:flex;gap:5px;align-items:center"><svg width="16" height="10" viewBox="0 0 16 10" fill="${c}"><rect x="0" y="7" width="3" height="3" rx=".6"/><rect x="4.3" y="5" width="3" height="5" rx=".6"/><rect x="8.6" y="2.6" width="3" height="7.4" rx=".6"/><rect x="12.9" y="0" width="3" height="10" rx=".6"/></svg><svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round"><path d="M1 3.5a9 9 0 0 1 12 0M3.2 6a5.6 5.6 0 0 1 7.6 0"/><circle cx="7" cy="8.6" r=".9" fill="${c}"/></svg><svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="3" fill="none" stroke="${c}" opacity=".5"/><rect x="2" y="2" width="15" height="7" rx="1.8" fill="${c}"/><rect x="21.5" y="3.5" width="1.6" height="4" rx=".8" fill="${c}" opacity=".5"/></svg></span></div>`;
const tabbar=(items,on,st)=>`<div class="tb" style="${st||''}">${items.map((t,i)=>`<span class="${i===on?'on':''}">${ic(t[0],17,1.9)}${t[1]}</span>`).join('')}</div>`;
const av=(t,a,b)=>`<div style="width:30px;height:30px;border-radius:50%;flex:none;display:grid;place-items:center;font:700 10px Inter,sans-serif;color:#fff;background:linear-gradient(135deg,${a},${b})">${t}</div>`;

const SCREENS={
rito:()=>`<div class="s" style="background:#0D0D0F;color:#F4EFE6;--tbb:#141416;--tbl:#232327;--tbc:#6E6A62;--tba:#D4AF6A">
 ${sbar('#F4EFE6')}
 <div style="padding:8px 16px 4px;display:flex;justify-content:space-between;align-items:center">
  <div><div style="font:600 9.5px Inter,sans-serif;color:#D4AF6A;letter-spacing:.02em">Navalha Club</div><div style="font:700 16px Sora,sans-serif">Boa tarde, Diego</div></div>
  ${av('D','#D4AF6A','#7A5A24')}
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 16px">
  <div style="background:linear-gradient(145deg,#2A2216,#17140F);border:1px solid #3A3022;border-radius:14px;padding:10px"><div style="font-size:9px;color:#B8A889">Atendimentos hoje</div><div style="font:800 22px Sora,sans-serif;color:#E8C984">18</div></div>
  <div style="background:#18181B;border:1px solid #26262A;border-radius:14px;padding:10px"><div style="font-size:9px;color:#9A968E">Na fila agora</div><div style="font:800 22px Sora,sans-serif">4</div></div>
 </div>
 <div style="padding:6px 16px 4px;font:700 11px Inter,sans-serif;display:flex;justify-content:space-between"><span>Fila</span><span style="color:#D4AF6A;font-weight:600">Ver todos</span></div>
 ${[['LM','Lucas Martins','Corte + barba · 14ª visita','Cadeira 1','#D4AF6A','#7A5A24',1],['RA','Rafael Alves','Degradê · cliente há 2 anos','~10 min','#64748B','#334155'],['GS','Gabriel Souza','Primeira visita','~25 min','#3B82F6','#1E3A8A']].map(r=>`<div style="display:flex;align-items:center;gap:9px;margin:0 12px 6px;padding:8px 9px;border-radius:12px;background:${r[6]?'#1C1912':'#151517'};border:1px solid ${r[6]?'#3A3022':'#202024'}">${av(r[0],r[4],r[5])}<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:11px">${r[1]}</div><div style="font-size:9px;color:#8F8B83">${r[2]}</div></div><span style="font:600 8.5px Inter,sans-serif;padding:3px 7px;border-radius:20px;background:${r[6]?'#D4AF6A':'#232327'};color:${r[6]?'#1A1408':'#B3AEA4'};white-space:nowrap">${r[3]}</span></div>`).join('')}
 <div style="margin:4px 12px 0;padding:10px;border-radius:14px;background:#141416;border:1px dashed #3A3022">
  <div style="font-size:9.5px;color:#B8A889">Lembrete</div><div style="font-weight:600;font-size:11px;margin:2px 0 7px">Pedro não vem há 41 dias</div>
  <div style="display:flex;gap:6px"><span style="flex:1;text-align:center;padding:6px;border-radius:9px;background:#1F9D55;color:#fff;font:600 9px Inter,sans-serif">Mandar mensagem</span><span style="padding:6px 9px;border-radius:9px;background:#232327;font:600 9px Inter,sans-serif;color:#B3AEA4">Depois</span></div>
 </div>
 <div style="position:absolute;right:14px;bottom:62px;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F3D99A,#B88A3C);display:grid;place-items:center;font:800 14px Sora,sans-serif;color:#1A1408;box-shadow:0 6px 16px rgba(212,175,106,.35)">V</div>
 ${tabbar([['list','Fila'],['users','Clientes'],['chat','Mensagens'],['gear','Ajustes']],0)}
</div>`,
raio:()=>{
 let b='';const sd=[3,7,11,19,23,29,31,37,41,43];let s=7;const rnd=()=>(s=s*16807%2147483647)/2147483647;
 for(let r=0;r<7;r++)for(let c=0;c<5;c++){const x=c*52-14,y=r*58+6,w=40,h=44;if((r===2&&c===3)||(r===4&&c===0))continue;
  const tall=rnd()>.62;b+= `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#E2E7EF"/>`;
  if(tall){const bx=x+6,by=y+6,bw=w-14,bh=h-16;b+=`<rect x="${bx+3}" y="${by+3}" width="${bw}" height="${bh}" rx="2" fill="#C9D1DD"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="2" fill="#F4F6FA" stroke="#D3DAE5"/>`}}
 return `<div class="s" style="background:#EDF1F6;color:#12151C">
 <div style="position:absolute;inset:0"><svg width="232" height="512" viewBox="0 0 232 512">
  <rect width="232" height="512" fill="#EDF1F6"/>${b}
  <rect x="142" y="122" width="40" height="44" rx="6" fill="#CDEBD3"/><circle cx="154" cy="136" r="5" fill="#9FD3AA"/><circle cx="168" cy="150" r="6" fill="#9FD3AA"/>
  <rect x="-14" y="238" width="40" height="44" rx="6" fill="#CDEBD3"/>
  <path d="M-10 168 L242 150" stroke="#fff" stroke-width="9"/><path d="M118 -10 L104 520" stroke="#fff" stroke-width="9"/>
  <path d="M-10 168 L242 150" stroke="#F9D27A" stroke-width="2"/>
  <defs><radialGradient id="hg"><stop offset="0" stop-color="#1D4ED8" stop-opacity=".35"/><stop offset="1" stop-color="#1D4ED8" stop-opacity="0"/></radialGradient></defs>
  <circle cx="112" cy="190" r="92" fill="url(#hg)"/><circle cx="112" cy="190" r="72" fill="none" stroke="#1D4ED8" stroke-width="1.2" stroke-dasharray="4 4"/>
  ${[[44,120],[186,236],[60,268]].map(p=>`<g transform="translate(${p[0]} ${p[1]})"><circle r="9" fill="#fff"/><circle r="6.5" fill="#E8452C"/><path d="M-2.5 -1h5v3h-5z" fill="#fff"/></g>`).join('')}
  ${[[168,92],[150,206],[78,214]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#F59E0B" stroke="#fff" stroke-width="2"/>`).join('')}
  <ellipse cx="112" cy="194" rx="10" ry="3.5" fill="#0B2A7A" opacity=".25"/>
  <path d="M112 152c-11 0-19 8-19 19 0 13 19 31 19 31s19-18 19-31c0-11-8-19-19-19z" fill="#1D4ED8" stroke="#fff" stroke-width="2.5"/><circle cx="112" cy="171" r="6.5" fill="#fff"/>
 </svg></div>
 <div style="position:relative">${sbar('#12151C')}</div>
 <div style="position:relative;margin:4px 12px;display:flex;gap:6px">
  <div style="flex:1;display:flex;align-items:center;gap:6px;background:#fff;border-radius:12px;padding:8px 10px;box-shadow:0 4px 12px rgba(16,24,40,.12);font-size:10px;color:#4A5568">${ic('search',13)}Centro · Rio Preto</div>
  <div style="width:34px;border-radius:12px;background:#fff;display:grid;place-items:center;box-shadow:0 4px 12px rgba(16,24,40,.12);color:#1D4ED8">${ic('map',15)}</div>
 </div>
 <div style="position:relative;margin:4px 12px;display:flex;gap:5px;font:600 8.5px Inter,sans-serif">
  <span style="background:#fff;padding:4px 8px;border-radius:20px;display:flex;gap:4px;align-items:center"><i style="width:7px;height:7px;border-radius:50%;background:#E8452C"></i>Concorrentes</span>
  <span style="background:#fff;padding:4px 8px;border-radius:20px;display:flex;gap:4px;align-items:center"><i style="width:7px;height:7px;border-radius:50%;background:#F59E0B"></i>Geradores de fluxo</span>
 </div>
 <div style="margin-top:auto;position:relative;background:#fff;border-radius:22px 22px 0 0;padding:8px 14px 16px;box-shadow:0 -10px 24px rgba(16,24,40,.12)">
  <div style="width:34px;height:4px;border-radius:4px;background:#D5DAE3;margin:0 auto 10px"></div>
  <div style="display:flex;gap:12px;align-items:center">
   <svg width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r="26" fill="none" stroke="#E6EAF2" stroke-width="6"/><circle cx="31" cy="31" r="26" fill="none" stroke="#1D4ED8" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(.82*163.4).toFixed(1)} 200" transform="rotate(-90 31 31)"/><text x="31" y="36" text-anchor="middle" font-family="Sora, sans-serif" font-weight="800" font-size="17" fill="#12151C">82</text></svg>
   <div><div style="font:700 13px Sora,sans-serif">Ótimo ponto</div><div style="font-size:9.5px;color:#4A5568">Lavanderia · raio de 1 km</div><div style="margin-top:4px;font:600 8.5px Inter,sans-serif;color:#0E7A43;background:#E7F7EE;display:inline-block;padding:2px 7px;border-radius:20px">Acima da média da cidade</div></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px">
   ${[['Moradores','18,2 mil'],['Concorrentes','3'],['Aluguel','46%']].map(m=>`<div style="background:#F4F6FA;border-radius:10px;padding:7px"><div style="font-size:8.5px;color:#6B7487">${m[0]}</div><div style="font:700 12px Sora,sans-serif">${m[1]}</div></div>`).join('')}
  </div>
  <div style="margin-top:10px;background:#1D4ED8;color:#fff;text-align:center;border-radius:11px;padding:8px;font:600 10px Inter,sans-serif">Ver relatório completo</div>
 </div>
</div>`},
mana:()=>`<div class="s" style="background:#FFF6F8;color:#2B1220;--tba:#BE185D;--tbb:#fff;--tbl:#F6E3EA">
 ${sbar('#2B1220')}
 <div style="padding:8px 16px 2px;display:flex;justify-content:space-between;align-items:center">
  <div><div style="font-size:9.5px;color:#9B6B80">Quinta, 21 de novembro</div><div style="font:700 16px Sora,sans-serif">Oi, Carla</div></div>
  ${av('C','#F472B6','#BE185D')}
 </div>
 <div style="margin:10px 14px;padding:12px;border-radius:16px;color:#fff;background:linear-gradient(135deg,#E11D74,#9D174D);position:relative;overflow:hidden">
  <div style="font-size:9px;opacity:.85">Faturamento da semana</div><div style="font:800 20px Sora,sans-serif">R$ 1.870</div>
  <div style="display:flex;gap:4px;align-items:flex-end;height:30px;margin-top:6px">${[40,62,48,80,70,96,30].map((h,i)=>`<i style="flex:1;height:${h}%;border-radius:3px;background:rgba(255,255,255,${i===5?.95:.45})"></i>`).join('')}</div>
 </div>
 <div style="padding:2px 16px 4px;font:700 11px Inter,sans-serif">Próximas clientes</div>
 ${[['10:30','Juliana','Pé e mão','R$ 70','#FCE7F3'],['13:00','Bruna','Alongamento em gel','R$ 150','#EDE9FE']].map(r=>`<div style="display:flex;gap:8px;align-items:center;margin:0 14px 6px"><span style="font:600 9.5px Inter,sans-serif;color:#9B6B80;width:30px">${r[0]}</span><div style="flex:1;background:${r[4]};border-radius:11px;padding:6px 9px;display:flex;justify-content:space-between"><span><b style="font-size:10.5px">${r[1]}</b><br><span style="font-size:9px;color:#7A5566">${r[2]}</span></span><b style="font-size:10px;align-self:center">${r[3]}</b></div></div>`).join('')}
 <div style="margin:6px 14px 0;background:#fff;border-radius:16px;padding:8px;box-shadow:0 6px 16px rgba(190,24,93,.10);display:flex;gap:9px;align-items:center">
  <svg width="74" height="74" viewBox="0 0 74 74" style="border-radius:11px;flex:none"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2C9AE"/><stop offset="1" stop-color="#DDA88A"/></linearGradient><linearGradient id="nl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF7AB0"/><stop offset="1" stop-color="#B0135A"/></linearGradient><linearGradient id="bgp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FDE2EC"/><stop offset="1" stop-color="#F9C6D9"/></linearGradient></defs>
   <rect width="74" height="74" fill="url(#bgp)"/>
   ${[[13,30,9,40],[25,20,10,50],[38,16,10,54],[51,22,10,48],[63,38,8,36]].map(f=>`<rect x="${f[0]-f[2]/2}" y="${f[1]}" width="${f[2]}" height="${f[3]+20}" rx="${f[2]/2}" fill="url(#sk)"/><path d="M${f[0]-f[2]/2+1.5} ${f[1]+12} q0 -11 ${f[2]/2-1.5} -11 q${f[2]/2-1.5} 0 ${f[2]/2-1.5} 11 v4 q-${f[2]/2-1.5} 3 -${f[2]-3} 0z" fill="url(#nl)"/><ellipse cx="${f[0]-1.5}" cy="${f[1]+5}" rx="1.1" ry="2.6" fill="#fff" opacity=".7"/>`).join('')}
  </svg>
  <div style="flex:1"><div style="font:600 8.5px Inter,sans-serif;color:#BE185D">Melhorada pela Mana</div><div style="font-weight:700;font-size:10.5px;margin:2px 0 6px">Post pronto para o Instagram</div><span style="display:inline-block;padding:5px 10px;border-radius:9px;background:#BE185D;color:#fff;font:600 9px Inter,sans-serif">Publicar</span></div>
 </div>
 ${tabbar([['cal','Agenda'],['coin','Finanças'],['img','Marketing'],['bot','Mana']],0)}
</div>`};

/* tela genérica bonita para os demais apps */
const gen=a=>{const g=a.scr;return `<div class="s" style="background:${g.bg||'#fff'};color:${g.ink||'#12151C'};--tba:${a.c};--tbb:${g.bg||'#fff'};--tbl:${g.tl||'#EEF0F4'};--tbc:${g.tc||'#8A93A6'}">
 ${sbar(g.ink||'#12151C')}
 <div style="padding:8px 16px 2px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:9.5px;opacity:.6">${g.k}</div><div style="font:700 16px Sora,sans-serif">${a.n}</div></div>${av(a.l,a.c,a.c2)}</div>
 <div style="margin:10px 14px;padding:14px;border-radius:18px;color:#fff;background:linear-gradient(140deg,${a.c},${a.c2});position:relative;overflow:hidden">
  <svg width="120" height="120" viewBox="0 0 120 120" style="position:absolute;right:-30px;top:-30px;opacity:.18"><circle cx="60" cy="60" r="58" fill="none" stroke="#fff" stroke-width="14"/></svg>
  <div style="font-size:9px;opacity:.85">${g.t}</div><div style="font:800 17px Sora,sans-serif;margin:3px 0">${g.v}</div><div style="font-size:9.5px;opacity:.85">${g.s}</div>
  ${g.btn?`<div style="margin-top:9px;display:inline-block;background:#fff;color:${a.c2};font:600 9px Inter,sans-serif;padding:5px 10px;border-radius:9px">${g.btn}</div>`:''}
 </div>
 <div style="padding:2px 16px 6px;font:700 11px Inter,sans-serif">${g.h}</div>
 ${g.rows.map(r=>`<div style="display:flex;align-items:center;gap:9px;margin:0 14px 7px;padding:9px;border-radius:13px;background:${g.rb||'#F5F7FB'}"><div style="width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,${a.c} 16%,transparent);color:${a.c}">${ic(r[3]||'star',14)}</div><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:10.5px">${r[0]}</div><div style="font-size:9px;opacity:.6">${r[1]}</div></div><span style="font:600 8.5px Inter,sans-serif;padding:3px 7px;border-radius:20px;background:color-mix(in srgb,${a.c} 14%,transparent);color:${g.tg||a.c};white-space:nowrap">${r[2]}</span></div>`).join('')}
 ${tabbar(g.tabs,0)}
</div>`};

/* ---------- dados dos apps ---------- */
const apps=[
 {id:'vinculom',n:'Vinculom',l:'V',c:'#E11D48',c2:'#9F1239',g:'pessoas',s:'Relacionamentos com segurança',
  d:'App de encontros pensado para a segurança das mulheres. Toda conta passa por verificação de identidade com selfie.',
  p:'mulheres e homens que querem conhecer pessoas novas com mais segurança.',
  f:[['Verificação por selfie','A selfie é comparada com as fotos do perfil antes de a conta ser liberada.'],['Botão de pânico','Envia a localização real por GPS para contatos de confiança.'],['Check-in de encontro','Avisa automaticamente se a pessoa não confirmar que está bem no horário combinado.'],['Avaliação pós-encontro','Cada encontro pode ser avaliado, deixando a comunidade mais segura.'],['Modo Dupla','Para sair em dupla com uma amiga, com conversa em grupo.'],['Assistente Vic','Tira dúvidas sobre o app e sobre segurança a qualquer hora.']],
  scr:{k:'Bem-vinda de volta',t:'Perfil verificado',v:'Ana, 27',s:'Selfie conferida · a 3 km',btn:'Ver perfil',h:'Sua segurança',rows:[['Check-in de encontro','Volta prevista às 22:00','Ativo','shield'],['Botão de pânico','GPS pronto para enviar','Pronto','map'],['Novo match','Lucas curtiu você','Agora','star']],tabs:[['home','Início'],['star','Matches'],['chat','Conversas'],['user','Perfil']]}},
 {id:'rito',n:'Rito',l:'R',c:'#B7791F',c2:'#7A4E0E',g:'negocios',s:'Barbearias',custom:'rito',
  d:'Gestão de clientes para barbearias, por ordem de chegada ou hora marcada. Cada barbearia entra com a própria marca.',
  p:'donos de barbearia e barbeiros que querem conhecer e trazer de volta os seus clientes.',
  f:[['Fila ou hora marcada','Cada barbearia escolhe o próprio jeito de atender e os seus serviços.'],['Histórico de cada cliente','Quantas vezes cortou, há quanto tempo é cliente e há quanto tempo não aparece.'],['Mensagens prontas','Agradecimento, convite para voltar e parabéns no aniversário, enviados pelo número da barbearia.'],['Assistente Vicky','Entende o barbeiro por voz e responde por escrito, em todas as telas.'],['A marca da barbearia','Logo, nome e cores da barbearia dentro do app.'],['Totem ou QR Code','O próprio cliente entra na fila pelo tablet da barbearia ou pelo celular.']]},
 {id:'mana',n:'Mana',l:'M',c:'#C026D3',c2:'#86198F',g:'negocios',s:'Manicure e pedicure',custom:'mana',
  d:'Agenda, finanças e uma agência de marketing com IA que melhora a foto da unha e monta posts e stories para a profissional.',
  p:'manicures e pedicures que querem organizar a rotina e crescer no Instagram.',
  f:[['Agenda e lembretes','Horários organizados e lembretes para as clientes.'],['Finanças','Quanto entrou, quanto saiu e quanto sobrou na semana.'],['Fotos com IA','A foto da unha tirada no celular fica com qualidade de estúdio.'],['Agência de marketing','Bio, posts, stories e mensagens personalizados a partir de perguntas simples.'],['Mentora Mana','Conversa, dá ideias de conteúdo e ensina técnica como um curso dentro do app.'],['Publicação direta','O que o app cria vai para o Instagram sem copiar e colar.']]},
 {id:'raio',n:'Raio',l:'R',c:'#F59E0B',c2:'#B45309',g:'negocios',s:'Análise de ponto comercial',custom:'raio',badge:'Usado pela Lav.me',
  d:'Mostra onde vale a pena abrir um negócio ou franquia, com dados públicos reais de população, empresas e concorrência.',
  p:'empreendedores e redes de franquia que precisam escolher bem onde abrir a próxima unidade.',
  f:[['Nota do ponto','Uma nota de 0 a 100 para o endereço escolhido, com os motivos por trás dela.'],['Dados do Brasil inteiro','População, domicílios e perfil da região a partir de bases públicas como o IBGE.'],['Concorrência no mapa','Quem já está por perto, quem abriu e quem fechou.'],['Explorar bairro','Para quem ainda não escolheu o ramo: o que existe por perto e quem mora ali.'],['Mapa 3D','A região vista de perto, quadra por quadra.'],['Só dado real','Nenhum número inventado. O que é estimativa aparece com esse nome.']]},
 {id:'agrointel',n:'AGROINTEL',l:'A',c:'#3F7D3A',c2:'#1F4D1C',g:'negocios',s:'Agronegócio',
  d:'Plataforma para o agrônomo consultor: mapas de vigor por satélite e drone, solo, relatórios de visita e versão para cooperativas.',
  p:'agrônomos consultores e cooperativas que atendem produtores rurais.',
  f:[['Satélite','Mapas de vigor da lavoura (NDVI) para acompanhar cada talhão.'],['Drone','Planejamento do voo no app e montagem das fotos na nuvem.'],['Solo e visitas','Análises de solo e relatórios de visita organizados por fazenda.'],['Mentor Seu João','Recebe foto, vídeo e áudio do campo e responde na hora.'],['Escritório com IA','Contratos, documentos, gestão da consultoria e assistente fiscal.'],['Versão para cooperativas','Cada cooperativa com a sua marca e perfis para gerente, diretor e vendedor.']],
  scr:{bg:'#FBFAF4',rb:'#F1EFE3',k:'Fazenda Santa Luzia',t:'Talhão 7 · Soja',v:'Vigor 0,78',s:'Satélite de 18 de novembro',btn:'Abrir mapa',h:'Hoje no campo',rows:[['Voo de drone','Amanhã às 7h','Drone','map'],['Análise de solo','Resultado disponível','Pronta','list'],['Seu João','Respondeu sua foto da folha','Novo','chat']],tabs:[['map','Mapas'],['list','Visitas'],['chat','Seu João'],['pen','Escritório']]}},
 {id:'lance-gov',n:'Lance Gov',l:'L',c:'#0F766E',c2:'#134E4A',g:'negocios',s:'Licitações públicas',
  d:'Análise de editais com IA para empresas e advogados. O Auditor do edital aponta erros antes da disputa.',
  p:'empresas que disputam licitações e advogados que as assessoram.',
  f:[['Auditor do edital','Aponta erros, exigências fora do comum e pontos de atenção no edital.'],['Análise com IA','Resume o edital e mostra o que importa para a sua empresa.'],['Prazos em dia','Datas de impugnação, esclarecimento e sessão em um só lugar.']],
  scr:{k:'Pregão eletrônico 041/2026',t:'Auditor do edital',v:'3 pontos de atenção',s:'Leitura concluída',btn:'Ver relatório',h:'O que revisar',rows:[['Prazo de impugnação','Faltam 4 dias','Atenção','cal'],['Exigência de atestado','Possível restrição','Revisar','shield'],['Documentos','12 de 14 prontos','Em dia','list']],tabs:[['search','Editais'],['shield','Auditor'],['cal','Prazos'],['user','Conta']]}},
 {id:'rastroon',n:'rastroon',l:'r',c:'#7C3AED',c2:'#4C1D95',g:'pessoas',s:'Família',
  d:'Localização e segurança da família em tempo real, no celular dos pais e dos filhos, com mapa 3D.',
  p:'famílias que querem saber que todos chegaram bem.',
  f:[['Localização ao vivo','Veja onde cada pessoa da família está, no mapa.'],['Mapa 3D','A cidade vista de perto, com ruas e lugares.'],['Android e iPhone','Funciona no celular dos pais e no dos filhos.']],
  scr:{k:'Família Oliveira',t:'Agora',v:'Todos seguros',s:'Atualizado há 1 minuto',btn:'Abrir mapa',h:'Onde estão',rows:[['Miguel','Chegou na escola · 7:12','Escola','home'],['Sofia','Em casa','Casa','home'],['Paulo','A caminho do trabalho','No trajeto','map']],tg:'#5B21B6',tabs:[['map','Mapa'],['users','Família'],['shield','Alertas'],['gear','Ajustes']]}},
 {id:'caminho',n:'Caminho',l:'C',c:'#0284C7',c2:'#0C4A6E',g:'fe',s:'Fé',
  d:'Conselheiro diário com IA baseado na Bíblia, para conversar e desabafar por voz e terminar cada conversa em oração.',
  p:'quem quer uma vida com Deus mais próxima, com conversa e oração todos os dias.',
  f:[['Conversa por voz','Fale e ouça com voz natural, ou converse por texto.'],['Lembra de você','O Conselheiro lembra das conversas e pergunta como você está.'],['Oração no final','Cada conversa termina com uma oração sobre o assunto.'],['Heróis da Fé','Converse com personagens da Bíblia em palavras simples.'],['Bíblia no app','Leitura e versículos sempre à mão.'],['Gratuito','Sem limite de conversas por dia.']],
  scr:{bg:'#F5F9FD',rb:'#EAF2FA',k:'Boa noite',t:'Conversa de hoje',v:'Como foi o seu dia, Ana?',s:'Toque para falar',btn:'Conversar',h:'Para você',rows:[['Oração da noite','Salmo 4','Ouvir','chat'],['Heróis da Fé','Converse com Davi','Novo','users'],['Bíblia','Continue em João 14','Ler','list']],tabs:[['chat','Conversa'],['list','Bíblia'],['users','Heróis'],['user','Perfil']]}},
 {id:'aurea',n:'Áurea',l:'Á',c:'#A16207',c2:'#713F12',g:'fe',s:'Mentoria com IA',
  d:'Onze mentores de IA, um para cada área da vida: negócios, finanças, casamento, espiritualidade, pais e filhos e mais.',
  p:'quem quer orientação prática em várias áreas da vida, a qualquer hora.',
  f:[['Onze mentores','Um mentor para cada área da vida, escolhido por abas.'],['Conversa por texto','Converse quando quiser, no seu ritmo.'],['Planos práticos','Cada conversa termina com passos claros para seguir.']],
  scr:{bg:'#0F0D0A',ink:'#F5EEDF',rb:'#1A1712',tl:'#26221B',tc:'#7D7464',tg:'#E8C26A',k:'Seus mentores',t:'Mentor de Finanças',v:'Vamos montar seu plano?',s:'11 mentores disponíveis',btn:'Começar',h:'Áreas',rows:[['Negócios','Estratégia e vendas','Abrir','grow'],['Casamento','Conversa e convivência','Abrir','users'],['Pais e filhos','Educação em casa','Abrir','home']],tabs:[['users','Mentores'],['chat','Conversas'],['star','Planos'],['user','Perfil']]}}
];
const screen=a=>a.custom?SCREENS[a.custom]():gen(a);
document.querySelectorAll('[data-screen]').forEach(el=>el.outerHTML=SCREENS[el.dataset.screen]());

/* ---------- cards ---------- */
const card=a=>`<a class="app" href="#app-${a.id}" data-g="${a.g}"><div class="top"><div class="logo" style="background:linear-gradient(140deg,${a.c},${a.c2})">${a.l}</div><div><h3>${a.n}</h3><div class="seg">${a.s}</div></div></div><p>${a.d}</p><div class="more"><span>Ver o app</span>${a.badge?`<span class="badge">${a.badge}</span>`:''}</div></a>`;
document.getElementById('homeGrid').innerHTML=apps.map(card).join('');
const ag=document.getElementById('appsGrid');ag.innerHTML=apps.map(card).join('');
const cats=[['todos','Todos'],['negocios','Negócios'],['pessoas','Pessoas e família'],['fe','Fé e desenvolvimento']];
const chips=document.getElementById('chips');
chips.innerHTML=cats.map((c,i)=>`<button type="button" class="chip" data-c="${c[0]}" aria-pressed="${i===0}">${c[1]}</button>`).join('');
chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;
 chips.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));
 ag.querySelectorAll('.app').forEach(el=>{el.hidden=!(b.dataset.c==='todos'||el.dataset.g===b.dataset.c)})});

/* ---------- como trabalhamos ---------- */
const steps=[
 ['talk','Reuniões com você','Começamos conversando: o seu negócio, o seu público e o que o app precisa resolver. Tudo é personalizado.'],
 ['pen','Protótipo','Você vê cores, telas e caminhos em um demo clicável antes do desenvolvimento.'],
 ['code','Desenvolvimento','Código próprio, banco de dados dedicado e infraestrutura em nuvem, com reuniões de acompanhamento.'],
 ['shield','Testes e segurança','Todos os apps são testados e revisados pela nossa equipe de desenvolvedores sênior antes do lançamento.'],
 ['rocket','Lançamento','Publicação na web, na Play Store e na App Store, com a sua marca na frente.'],
 ['grow','Evolução','Se você quiser, o app continua evoluindo conforme o uso e o feedback dos seus clientes.']];
document.getElementById('proc').innerHTML=steps.map(s=>`<div class="step"><div class="dot">${ic(s[0])}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('');
const diffs=[
 ['talk','Tudo personalizado','Nada de pacote pronto. Cada projeto nasce de reuniões com o cliente e segue o jeito do seu negócio.'],
 ['bot','Inteligência artificial de verdade','Assistentes que conversam, orientam e trabalham pelo usuário, como a Vicky no Rito, a Mana na Mana e o Seu João no AGROINTEL.'],
 ['star','A sua marca, não a nossa','Em apps como Rito e AGROINTEL, cada cliente entra com logo, nome e cores próprios.'],
 ['shield','Segurança desde o primeiro dia','Revisão da nossa equipe de desenvolvedores sênior, verificação de identidade onde faz sentido e dados de cada cliente protegidos e separados.']];
document.getElementById('diff').innerHTML=diffs.map(d=>`<div class="box"><div class="ic">${ic(d[0])}</div><div><h3 style="margin-bottom:8px">${d[1]}</h3><p>${d[2]}</p></div></div>`).join('');

/* ---------- contato ---------- */
const sel=document.getElementById('tipo');
sel.innerHTML=['Criar um app sob medida',...apps.map(a=>'Conhecer o '+a.n),'Parceria ou revenda'].map(o=>`<option>${o}</option>`).join('');
const f=document.getElementById('f'),out=document.getElementById('out'),err=document.getElementById('err');
let zaps=[];
const fmtZap=n=>{const d=n.replace(/^55/,'');return d.length===11?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d};
const linkZap=(n,txt)=>`https://wa.me/${n}?text=${encodeURIComponent(txt)}`;
f.addEventListener('submit',async e=>{e.preventDefault();const v=n=>(f.elements[n].value||'').trim();
 const erro=m=>{err.textContent=m;err.hidden=false;out.hidden=true};
 if(!v('nome')||!v('zap'))return erro('Preencha seu nome e WhatsApp.');
 if(v('zap').replace(/\D/g,'').length<10)return erro('Confira o WhatsApp com DDD.');
 if(!f.elements.aceite.checked)return erro('Marque que leu a política de privacidade.');
 err.hidden=true;const bt=document.getElementById('enviar');bt.disabled=true;bt.textContent='Enviando…';
 try{
  const r=await fetch('/api/contato',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({nome:v('nome'),whatsapp:v('zap'),tipo:v('tipo'),ideia:v('ideia'),origem:location.hash||'#inicio',site:v('site'),aceite:true})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(j.erro||'Não deu para enviar agora.');
  const nome=v('nome').split(' ')[0];
  out.innerHTML='';const t=document.createElement('p');t.style.margin='0';t.textContent=`Recebemos sua ideia, ${nome}! A gente vai te chamar no WhatsApp ${fmtZap((d=>d.length<=11?'55'+d:d)(v('zap').replace(/\D/g,'')))} para marcar a conversa.`;out.appendChild(t);
  if(zaps.length){const a=document.createElement('a');a.className='btn pri';a.style.marginTop='12px';a.target='_blank';a.rel='noopener';a.href=linkZap(zaps[0],`Olá! Sou ${v('nome')} e acabei de mandar minha ideia pelo site da Kainex8: ${v('tipo')}.`);a.textContent='Quero falar agora no WhatsApp';out.appendChild(a)}
  out.hidden=false;f.reset();
 }catch(x){erro(x.message+' Se preferir, chame no WhatsApp.')}
 finally{bt.disabled=false;bt.textContent='Enviar ideia'}
});
/* ---------- WhatsApp (números vêm da configuração do servidor) ---------- */
fetch('/api/config').then(r=>r.json()).then(c=>{zaps=c.whatsapp||[];if(!zaps.length)return;
 const box=document.getElementById('zap-box'),btn=document.getElementById('zap-btn'),pn=document.getElementById('zap-painel'),lista=document.getElementById('zap-lista');
 lista.innerHTML='';zaps.forEach(n=>{const a=document.createElement('a');a.href=linkZap(n,'Olá! Vim pelo site da Kainex8 e quero falar sobre um app.');a.target='_blank';a.rel='noopener';a.innerHTML='<span>Comercial</span><b></b>';a.querySelector('b').textContent=fmtZap(n);lista.appendChild(a)});
 box.hidden=false;
 btn.addEventListener('click',()=>{pn.hidden=!pn.hidden;btn.setAttribute('aria-expanded',String(!pn.hidden))});
 document.addEventListener('click',e=>{if(!box.contains(e.target)){pn.hidden=true;btn.setAttribute('aria-expanded','false')}});
}).catch(()=>{});
document.getElementById('fnav').innerHTML=[['inicio','Início'],['apps','Apps'],['como-trabalhamos','Como trabalhamos'],['sobre','Sobre'],['contato','Contato']].map(x=>`<a href="#${x[0]}">${x[1]}</a>`).join('');

/* ---------- página de cada app ---------- */
const lavme=`<div class="proof"><div class="lv"><svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2"><rect x="4" y="2.5" width="16" height="19" rx="2.5"/><circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2.4"/><path d="M7 5.5h2"/></svg><span>Na prática</span><b>Lav.me</b><span>Rede de lavanderias autosserviço</span></div>
 <div class="tx"><h3 style="font-size:24px">O Raio ajudou a Lav.me a escolher onde crescer</h3><p>A rede usa o Raio para comparar regiões, enxergar a concorrência e decidir com dados onde abrir as próximas unidades. O app nasceu desse trabalho e hoje atende qualquer segmento.</p></div></div>`;
const appView=document.getElementById('v-app');
function renderApp(a){
 appView.innerHTML=`<section class="band ahero" style="background:radial-gradient(800px 480px at 80% 40%,color-mix(in srgb,${a.c} 45%,transparent),transparent 65%),linear-gradient(180deg,var(--night),#0B1020)">
  <div class="wrap"><div class="txt">
   <a class="back" href="#apps">${ic('list',18)} Todos os apps</a>
   <div class="id"><div class="logo" style="background:linear-gradient(140deg,${a.c},${a.c2})">${a.l}</div><div><h1>${a.n}</h1><div class="seg">${a.s}</div></div></div>
   <p class="lead" style="font-size:18px">${a.d}</p>
   <p class="for"><b>Para quem é:</b> ${a.p}</p>
   <div class="ctas"><a class="btn pri" href="#contato" data-want="${a.n}">Quero conhecer o ${a.n}</a></div>
   <p class="note">Tela ilustrativa.</p>
  </div>
  <div class="stage" data-w="300" data-h="560" aria-hidden="true"><div class="rig" style="width:300px;height:560px"><div class="ph" style="left:25px;bottom:-30px"><div class="island"></div>${screen(a)}</div></div></div>
 </div></section>
 <section class="band"><div class="wrap">
  <h2>O que o ${a.n} faz</h2>
  <div class="feats">${a.f.map(x=>`<div class="feat"><i style="background:${a.c}"></i><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
  ${a.id==='raio'?lavme:''}
 </div></section>
 <section class="band" style="padding-top:0"><div class="wrap"><h3>Outros apps da Kainex8</h3>
  <div class="others">${apps.filter(o=>o!==a).map(o=>`<a href="#app-${o.id}"><span class="logo" style="background:linear-gradient(140deg,${o.c},${o.c2})">${o.l}</span>${o.n}</a>`).join('')}</div>
 </div></section>`;
 appView.querySelector('[data-want]').addEventListener('click',()=>{const o=[...sel.options].find(x=>x.text==='Conhecer o '+a.n);if(o)sel.value=o.text});
 fit();
}

/* ---------- escala dos celulares ---------- */
function fit(){document.querySelectorAll('.view:not([hidden]) .stage').forEach(st=>{
 const W=+st.dataset.w,H=+st.dataset.h,max=window.innerWidth<600?.82:1;
 const k=Math.min(max,st.clientWidth/W);const rig=st.querySelector('.rig');
 rig.style.transform=`translateX(-50%) scale(${k})`;st.style.height=Math.round((H-30)*k)+'px'})}
const ro=new ResizeObserver(fit);ro.observe(document.body);

/* ---------- abas ---------- */
const tabs=[...document.querySelectorAll('.tabs a')];
function route(){
 const h=(location.hash||'#inicio').slice(1);let view=h,tab=h;
 if(h.startsWith('app-')){const a=apps.find(x=>'app-'+x.id===h);if(a){renderApp(a);view='app';tab='apps';document.title=a.n+' · Kainex8'}else{view='inicio';tab='inicio'}}
 else document.title='Kainex8 Soluções em Apps';
 if(!document.getElementById('v-'+view)){view='inicio';tab='inicio'}
 document.querySelectorAll('.view').forEach(v=>v.hidden=v.id!=='v-'+view);
 tabs.forEach(t=>{if(t.dataset.tab===tab)t.setAttribute('aria-current','page');else t.removeAttribute('aria-current')});
 const at=tabs.find(t=>t.dataset.tab===tab);if(at){const nav=at.parentElement;nav.scrollTo({left:at.offsetLeft-(nav.clientWidth-at.offsetWidth)/2,behavior:'smooth'})}
 window.scrollTo(0,0);fit();
}
window.addEventListener('hashchange',route);route();
}
