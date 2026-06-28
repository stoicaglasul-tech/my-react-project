// E-commerce product illustrations — smooth material finishes, no FDM texture

const COLORS = {
  White:      ['#f5f3f0','#d8d5d0','#a8a5a0'],
  Black:      ['#585656','#323030','#1a1818'],
  Gold:       ['#f5d060','#d4a820','#8a6c08'],
  Silver:     ['#e8e8e8','#b8b8b8','#787878'],
  Gray:       ['#c8c6c2','#989490','#606060'],
  Orange:     ['#ff9850','#d87020','#903810'],
  Blue:       ['#58a0f8','#2068d0','#0e3c90'],
  Green:      ['#58c858','#289832','#105818'],
  Red:        ['#f85858','#c82828','#880808'],
  Teal:       ['#48c8b8','#189888','#085858'],
  Purple:     ['#a060e8','#6828b0','#400c68'],
  Brown:      ['#b88050','#7a5828','#4a3010'],
  'Rose Gold':['#f0b0a0','#d07858','#903838'],
};
function clr(n) { return COLORS[n] || ['#d89050','#b06020','#784010']; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function enc(svg) { return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`; }

function lbl(p) {
  const [L,M] = clr(p.color);
  return `<rect x="60" y="337" width="280" height="42" rx="6" fill="#0c0804" opacity="0.92"/>
<text x="200" y="357" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="${L}" text-anchor="middle">${esc(p.name)}</text>
<text x="200" y="373" font-family="system-ui,sans-serif" font-size="10" fill="${M}" text-anchor="middle">${esc(p.category)} · $${p.price.toFixed(2)}</text>`;
}

function wrap(p, content) {
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1c1008"/>${content}${lbl(p)}</svg>`);
}

// Smooth gradient defs (no layer lines)
function gdefs(id, L, M, D) {
  return `<linearGradient id="lg${id}" x1="18%" y1="5%" x2="82%" y2="95%">
<stop offset="0%" stop-color="${L}"/><stop offset="55%" stop-color="${M}"/><stop offset="100%" stop-color="${D}"/>
</linearGradient>
<radialGradient id="hi${id}" cx="28%" cy="25%" r="50%">
<stop offset="0%" stop-color="#fff" stop-opacity="0.55"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
</radialGradient>`;
}

// Strong ceramic glaze highlight
function ceramicDefs(id, L, M, D) {
  return `${gdefs(id,L,M,D)}
<radialGradient id="gz${id}" cx="25%" cy="20%" r="38%">
<stop offset="0%" stop-color="#fff" stop-opacity="0.8"/><stop offset="60%" stop-color="#fff" stop-opacity="0.1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
</radialGradient>`;
}

// Metallic sheen (sharp linear highlight)
function metalDefs(id, L, M, D) {
  return `<linearGradient id="lg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#fff" stop-opacity="0.9"/><stop offset="15%" stop-color="${L}"/>
<stop offset="50%" stop-color="${M}"/><stop offset="85%" stop-color="${D}"/><stop offset="100%" stop-color="#000" stop-opacity="0.3"/>
</linearGradient>
<radialGradient id="hi${id}" cx="20%" cy="18%" r="30%">
<stop offset="0%" stop-color="#fff" stop-opacity="0.7"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
</radialGradient>`;
}

// Smooth single-path render
function smoothPath(p, d, defsFn, extra='') {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const defs = (defsFn || gdefs)(id,L,M,D);
  return wrap(p, `<defs>${defs}</defs>
<ellipse cx="200" cy="320" rx="82" ry="11" fill="#000" opacity="0.35"/>
<path d="${d}" fill="url(#lg${id})"/>
<path d="${d}" fill="url(#hi${id})" opacity="0.85"/>
${extra}`);
}

// ── 1 · Ceramic Flower Vase ───────────────────────────────────────────────────
function drawVase(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Classic rounded ceramic vase — smooth curves, no facets
  const d = "M 180,308 Q 148,295 142,265 Q 136,238 148,210 Q 158,188 150,162 Q 144,138 155,112 Q 164,88 178,74 Q 190,62 200,60 Q 210,62 222,74 Q 236,88 245,112 Q 256,138 250,162 Q 242,188 252,210 Q 264,238 258,265 Q 252,295 220,308 Z";
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="82" ry="10" fill="#000" opacity="0.35"/>
<path d="${d}" fill="url(#lg${id})"/>
<path d="${d}" fill="url(#gz${id})" opacity="0.9"/>
<ellipse cx="200" cy="63" rx="22" ry="7" fill="${D}" opacity="0.6"/>
<ellipse cx="200" cy="61" rx="16" ry="4" fill="#1c1008" opacity="0.5"/>`);
}

// ── 2 · Luxury Scented Candle ─────────────────────────────────────────────────
function drawCandle(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Wide jar candle with label and decorative band
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="80" ry="10" fill="#000" opacity="0.35"/>
<rect x="130" y="160" width="140" height="148" rx="18" fill="url(#lg${id})"/>
<rect x="130" y="160" width="140" height="148" rx="18" fill="url(#gz${id})"/>
<ellipse cx="200" cy="160" rx="70" ry="18" fill="${L}"/>
<ellipse cx="200" cy="158" rx="58" ry="12" fill="#1c1008" opacity="0.15"/>
<rect x="145" y="220" width="110" height="52" rx="4" fill="#fff" opacity="0.18"/>
<rect x="145" y="220" width="110" height="52" rx="4" fill="none" stroke="${D}" stroke-width="1.5" opacity="0.5"/>
<text x="200" y="243" font-family="serif" font-size="10" font-style="italic" fill="${D}" text-anchor="middle" opacity="0.9">Luxury</text>
<text x="200" y="258" font-family="serif" font-size="9" fill="${D}" text-anchor="middle" opacity="0.7">Scented</text>
<line x1="200" y1="160" x2="200" y2="148" stroke="#666" stroke-width="1.5"/>
<ellipse cx="200" cy="140" rx="7" ry="11" fill="#ffb300" opacity="0.95"/>
<ellipse cx="200" cy="136" rx="4" ry="6" fill="#fff9c4" opacity="0.9"/>`);
}

// ── 3 · Hexagonal Mirror Set ──────────────────────────────────────────────────
function drawMirrorSet(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  function hexMirror(cx, cy, r, angle=0) {
    const pts = Array.from({length:6}, (_,i) => {
      const a = (i*60+angle)*Math.PI/180;
      return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`;
    });
    const innerPts = Array.from({length:6}, (_,i) => {
      const a = (i*60+angle)*Math.PI/180;
      return `${(cx+(r-10)*Math.cos(a)).toFixed(1)},${(cy+(r-10)*Math.sin(a)).toFixed(1)}`;
    });
    return `<polygon points="${pts.join(' ')}" fill="${M}"/>
<polygon points="${innerPts.join(' ')}" fill="${L}" opacity="0.35"/>
<polygon points="${innerPts.join(' ')}" fill="url(#hi${id})" opacity="0.8"/>`;
  }
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="318" rx="120" ry="10" fill="#000" opacity="0.3"/>
${hexMirror(200,175,75,30)}
${hexMirror(128,242,52,30)}
${hexMirror(272,242,52,30)}`);
}

// ── 4 · Hand-Painted Bowl ─────────────────────────────────────────────────────
function drawBowl(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const bowlD = "M 78,202 Q 76,312 200,318 Q 324,312 322,202 Q 322,162 312,147 L 288,152 Q 298,172 298,202 Q 298,285 200,290 Q 102,285 102,202 Q 102,172 112,152 L 88,147 Q 78,162 78,202 Z";
  // Decorative painted stripes on interior
  const stripes = ['#e06060','#e09820','#48b0e0','#60c060'].map((c,i) =>
    `<ellipse cx="200" cy="${265+i*8}" rx="${55-i*5}" ry="${8-i}" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.6"/>`
  ).join('');
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="125" ry="10" fill="#000" opacity="0.35"/>
<path d="${bowlD}" fill="url(#lg${id})"/>
<path d="${bowlD}" fill="url(#gz${id})" opacity="0.7"/>
${stripes}`);
}

// ── 5 · Plush Dragon Toy ──────────────────────────────────────────────────────
function drawPlushDragon(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Cute round plush toy — soft shapes, big eyes
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="85" ry="10" fill="#000" opacity="0.35"/>
<ellipse cx="200" cy="230" rx="82" ry="75" fill="${M}"/>
<ellipse cx="200" cy="230" rx="78" ry="71" fill="url(#lg${id})"/>
<ellipse cx="175" cy="290" rx="30" ry="22" fill="${D}"/>
<ellipse cx="225" cy="290" rx="30" ry="22" fill="${D}"/>
<ellipse cx="175" cy="288" rx="25" ry="18" fill="${M}"/>
<ellipse cx="225" cy="288" rx="25" ry="18" fill="${M}"/>
<ellipse cx="200" cy="155" rx="55" ry="52" fill="${M}"/>
<ellipse cx="200" cy="155" rx="51" ry="48" fill="url(#lg${id})"/>
<ellipse cx="182" cy="148" rx="16" ry="18" fill="#1c1008"/>
<ellipse cx="218" cy="148" rx="16" ry="18" fill="#1c1008"/>
<ellipse cx="182" cy="148" rx="10" ry="12" fill="#fff"/>
<ellipse cx="218" cy="148" rx="10" ry="12" fill="#fff"/>
<circle cx="185" cy="145" r="5" fill="#1c1008"/>
<circle cx="221" cy="145" r="5" fill="#1c1008"/>
<circle cx="187" cy="143" r="2" fill="#fff"/>
<circle cx="223" cy="143" r="2" fill="#fff"/>
<ellipse cx="200" cy="172" rx="8" ry="6" fill="${D}"/>
<path d="M 188,185 Q 200,196 212,185" fill="none" stroke="${D}" stroke-width="3" stroke-linecap="round"/>
<polygon points="185,110 175,82 198,105" fill="${D}"/>
<polygon points="215,110 225,82 202,105" fill="${D}"/>
<polygon points="128,200 105,165 140,190" fill="${M}" opacity="0.8"/>
<polygon points="272,200 295,165 260,190" fill="${M}" opacity="0.8"/>
<path d="M 282,240 Q 310,220 305,195 Q 300,175 285,182" fill="none" stroke="${M}" stroke-width="14" stroke-linecap="round"/>
<path d="M 282,240 Q 310,220 305,195 Q 300,175 285,182" fill="none" stroke="${L}" stroke-width="7" stroke-linecap="round" opacity="0.5"/>
<ellipse cx="200" cy="155" rx="51" ry="48" fill="url(#hi${id})" opacity="0.6"/>
<ellipse cx="200" cy="230" rx="78" ry="71" fill="url(#hi${id})" opacity="0.4"/>`);
}

// ── 6 · Speed Puzzle Cube (Rubik's Cube) ──────────────────────────────────────
function drawPuzzleCube(p) {
  // Classic Rubik's cube — isometric 3 faces, each with 3×3 coloured tiles
  const id = p.id;
  const faceColors = {
    top:  [['#fff','#fff','#fff'],['#fff','#fff','#fff'],['#fff','#fff','#fff']],
    left: [['#ff5500','#0050ff','#ff5500'],['#0050ff','#0050ff','#ff0000'],['#ff0000','#0050ff','#ff5500']],
    right:[['#00aa00','#ffdd00','#00aa00'],['#ffdd00','#ff0000','#ffdd00'],['#00aa00','#ffdd00','#00aa00']],
  };
  // Isometric transform
  const iso = (gx,gy,gz) => [+(200+(gx-gy)*0.866).toFixed(1), +(245+(gx+gy)*0.5-gz).toFixed(1)];
  const S = 72; // cube half-size in grid units
  // Top face (9 tiles)
  let tiles = '';
  const tileColors = ['#ffdd00','#fff','#ff5500','#0050ff','#fff','#00aa00','#ff0000','#ffdd00','#0050ff'];
  for (let r=0;r<3;r++) for (let c=0;c<3;c++) {
    const x=-S+c*(S*2/3), y=-S+r*(S*2/3), ts=S*2/3-4;
    const [x1,y1]=iso(x,y,S), [x2,y2]=iso(x+ts,y,S), [x3,y3]=iso(x+ts,y+ts,S), [x4,y4]=iso(x,y+ts,S);
    tiles+=`<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="${tileColors[r*3+c]}" stroke="#222" stroke-width="1.2"/>`;
  }
  const leftColors=['#ff5500','#0050ff','#ff5500','#0050ff','#ff5500','#ff0000','#ff0000','#0050ff','#ff5500'];
  for (let r=0;r<3;r++) for (let c=0;c<3;c++) {
    const y=-S+c*(S*2/3), z=S-r*(S*2/3), ts=S*2/3-4;
    const [x1,y1]=iso(-S,y,z), [x2,y2]=iso(-S,y+ts,z), [x3,y3]=iso(-S,y+ts,z-ts), [x4,y4]=iso(-S,y,z-ts);
    tiles+=`<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="${leftColors[r*3+c]}" stroke="#222" stroke-width="1.2"/>`;
  }
  const rightColors=['#00aa00','#ffdd00','#00aa00','#ffdd00','#00aa00','#ffdd00','#00aa00','#ffdd00','#00aa00'];
  for (let r=0;r<3;r++) for (let c=0;c<3;c++) {
    const x=-S+c*(S*2/3), z=S-r*(S*2/3), ts=S*2/3-4;
    const [x1,y1]=iso(x,S,z), [x2,y2]=iso(x+ts,S,z), [x3,y3]=iso(x+ts,S,z-ts), [x4,y4]=iso(x,S,z-ts);
    tiles+=`<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="${rightColors[r*3+c]}" stroke="#222" stroke-width="1.2"/>`;
  }
  // Black frame edges
  const [tl,ty]=iso(-S,-S,S),[tr,ty2]=iso(S,-S,S),[tb,ty3]=iso(S,S,S),[tbb,ty4]=iso(-S,S,S);
  const [bl,by]=iso(-S,-S,-S),[br,by2]=iso(S,-S,-S);
  const [ll,ly]=iso(-S,S,S),[lb,ly2]=iso(-S,S,-S);
  const [rl,ry]=iso(S,-S,S),[rb,ry2]=iso(S,S,-S);
  return wrap(p, `<defs></defs>
<ellipse cx="200" cy="320" rx="88" ry="10" fill="#000" opacity="0.35"/>
${tiles}
<polygon points="${tl},${ty} ${tr},${ty2} ${tb},${ty3} ${tbb},${ty4}" fill="none" stroke="#111" stroke-width="2"/>
<polygon points="${tbb},${ty4} ${ll},${ly} ${lb},${ly2} 130,320" fill="none" stroke="#111" stroke-width="2"/>
<polygon points="${tb},${ty3} ${rl},${ry} ${rb},${ry2}" fill="none" stroke="#111" stroke-width="2"/>`);
}

// ── 7 · Jump Rope Set ────────────────────────────────────────────────────────
function drawJumpRope(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Two cylindrical handles + rope arc
  return wrap(p, `<defs>${gdefs(id,L,M,D)}
<linearGradient id="rp${id}" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="${L}"/><stop offset="100%" stop-color="${D}"/>
</linearGradient></defs>
<ellipse cx="200" cy="320" rx="120" ry="10" fill="#000" opacity="0.35"/>
<rect x="88" y="185" width="28" height="100" rx="14" fill="url(#lg${id})"/>
<rect x="88" y="185" width="28" height="100" rx="14" fill="url(#hi${id})" opacity="0.7"/>
<rect x="92" y="178" width="20" height="16" rx="4" fill="${D}"/>
<rect x="92" y="277" width="20" height="16" rx="4" fill="${D}"/>
<rect x="284" y="185" width="28" height="100" rx="14" fill="${M}"/>
<rect x="284" y="185" width="28" height="100" rx="14" fill="url(#hi${id})" opacity="0.6"/>
<rect x="288" y="178" width="20" height="16" rx="4" fill="${D}"/>
<rect x="288" y="277" width="20" height="16" rx="4" fill="${D}"/>
<path d="M 107,195 Q 200,100 293,195" fill="none" stroke="${L}" stroke-width="6" stroke-linecap="round"/>
<path d="M 107,195 Q 200,100 293,195" fill="none" stroke="${D}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
<path d="M 107,207 Q 200,112 293,207" fill="none" stroke="${M}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>`);
}

// ── 8 · Wooden Spinning Top ───────────────────────────────────────────────────
function drawWoodenTop(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const coneD  = "M 200,310 L 125,195 L 275,195 Z";
  const bodyD  = "M 128,188 A 72,16 0 0 1 272,188 L 260,122 A 60,13 0 0 1 140,122 Z";
  const handleD= "M 140,122 A 60,13 0 0 1 260,122 L 250,64 A 50,11 0 0 1 150,64 Z";
  const knobD  = "M 150,64 A 50,11 0 0 1 250,64 L 242,44 A 42,9 0 0 1 158,44 Z";
  // Wood grain lines (warm, sparse — different from FDM layer lines)
  const grain = [185,170,155,140,125,110,95,80,67,52].map(y =>
    `<line x1="125" y1="${y}" x2="275" y2="${y}" stroke="${D}" stroke-width="0.8" opacity="0.15" stroke-dasharray="8,6"/>`
  ).join('');
  // Decorative painted bands
  const bands = `<line x1="128" y1="175" x2="272" y2="175" stroke="${D}" stroke-width="3.5" opacity="0.6"/>
<line x1="133" y1="158" x2="267" y2="158" stroke="${L}" stroke-width="2.5" opacity="0.7"/>
<line x1="138" y1="142" x2="262" y2="142" stroke="${D}" stroke-width="2" opacity="0.5"/>`;
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="322" rx="52" ry="9" fill="#000" opacity="0.35"/>
<path d="${coneD}" fill="${D}"/>
<ellipse cx="200" cy="192" rx="74" ry="18" fill="${L}"/>
<path d="${bodyD}" fill="url(#lg${id})"/>
<path d="${handleD}" fill="${L}"/>
<path d="${knobD}" fill="${M}"/>
<ellipse cx="200" cy="44" rx="42" ry="9" fill="${L}"/>
${grain}${bands}
<path d="${bodyD}" fill="url(#hi${id})" opacity="0.45"/>`);
}

// ── 9 · Desktop Cable Box ────────────────────────────────────────────────────
function drawCableBox(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const boxD = "M 82,298 L 82,148 L 318,148 L 318,298 Z";
  // Vented lid on top
  const lidD = "M 78,135 L 322,135 L 322,152 L 78,152 Z";
  // Vent slots in lid
  const vents = Array.from({length:8}, (_,i) =>
    `<rect x="${100+i*26}" y="139" width="14" height="9" rx="3" fill="#1c1008" opacity="0.7"/>`
  ).join('');
  // Cables exiting from back
  const cables = ['#f97316','#3b82f6','#a855f7','#10b981'].map((c,i) =>
    `<path d="M ${118+i*28},298 Q ${118+i*28},315 ${130+i*28},322" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`
  ).join('');
  // Label
  const lbl2 = `<rect x="122" y="210" width="156" height="48" rx="6" fill="#fff" opacity="0.08"/>
<text x="200" y="230" font-family="system-ui" font-size="9" fill="${L}" text-anchor="middle" opacity="0.6">CABLE</text>
<text x="200" y="244" font-family="system-ui" font-size="9" fill="${L}" text-anchor="middle" opacity="0.6">MANAGER</text>`;
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="322" rx="140" ry="10" fill="#000" opacity="0.35"/>
${cables}
<path d="${boxD}" fill="url(#lg${id})"/>
<path d="${lidD}" fill="${M}"/>
${vents}${lbl2}
<path d="${boxD}" fill="url(#hi${id})" opacity="0.35"/>`);
}

// ── 10 · Aluminium Phone Stand ───────────────────────────────────────────────
function drawPhoneStand(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const backD  = "M 118,298 L 118,108 L 165,92 L 165,282 Z";
  const baseD  = "M 98,298 L 98,278 L 312,278 L 312,298 Z";
  const strutD = "M 155,282 L 155,262 L 302,212 L 302,232 Z";
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="205" cy="320" rx="120" ry="10" fill="#000" opacity="0.35"/>
<rect x="170" y="94" width="112" height="186" rx="10" fill="#1a2a3a"/>
<rect x="178" y="102" width="96" height="168" rx="7" fill="#243450" opacity="0.8"/>
<circle cx="222" cy="272" r="5" fill="#333" opacity="0.8"/>
<path d="${strutD}" fill="${M}"/>
<path d="${backD}" fill="url(#lg${id})"/>
<path d="${backD}" fill="url(#hi${id})" opacity="0.6"/>
<path d="${baseD}" fill="${M}"/>
<path d="${baseD}" fill="url(#hi${id})" opacity="0.4"/>`);
}

// ── 11 · Canvas Tool Roll ────────────────────────────────────────────────────
function drawToolRoll(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Rolled canvas — cylinder shape when rolled
  const rollD = "M 145,298 A 55,16 0 0 1 255,298 L 255,195 A 55,16 0 0 1 145,195 Z";
  // Tool handles poking out top
  const tools = [
    {x:160,h:80,col:'#c0a000',w:10,tip:'flat'},
    {x:182,h:110,col:'#888',w:8,tip:'cross'},
    {x:200,h:95,col:'#c05020',w:10,tip:'flat'},
    {x:218,h:105,col:'#408020',w:8,tip:'flat'},
    {x:238,h:85,col:'#888',w:10,tip:'cross'},
  ];
  const handles = tools.map(({x,h,col,w}) =>
    `<rect x="${x-w/2}" y="${195-h}" width="${w}" height="${h}" rx="${w/2}" fill="${col}"/>
<ellipse cx="${x}" cy="${195-h}" rx="${w/2}" ry="${w*.35}" fill="${col}"/>`
  ).join('');
  // Canvas texture lines (stitching)
  const stitch = Array.from({length:5}, (_,i) =>
    `<line x1="148" y1="${210+i*18}" x2="252" y2="${210+i*18}" stroke="${D}" stroke-width="0.8" opacity="0.25" stroke-dasharray="5,4"/>`
  ).join('');
  // Tie strap
  const strap = `<rect x="192" y="192" width="16" height="110" rx="4" fill="${D}" opacity="0.5"/>
<rect x="190" y="235" width="20" height="24" rx="4" fill="${D}" opacity="0.7"/>`;
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="78" ry="10" fill="#000" opacity="0.35"/>
${handles}
<path d="${rollD}" fill="url(#lg${id})"/>
<ellipse cx="200" cy="195" rx="55" ry="16" fill="${L}"/>
${stitch}${strap}
<path d="${rollD}" fill="url(#hi${id})" opacity="0.4"/>`);
}

// ── 12 · Mechanical Gear Clock ───────────────────────────────────────────────
function drawGearClock(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  function gearPath(cx, cy, oR, iR, teeth) {
    const pts = [];
    for (let i=0;i<teeth;i++){
      const base=(i/teeth)*Math.PI*2-Math.PI/2, w=Math.PI/teeth;
      pts.push([cx+iR*Math.cos(base-w*.55),cy+iR*Math.sin(base-w*.55)]);
      pts.push([cx+oR*Math.cos(base-w*.25),cy+oR*Math.sin(base-w*.25)]);
      pts.push([cx+oR*Math.cos(base+w*.25),cy+oR*Math.sin(base+w*.25)]);
      pts.push([cx+iR*Math.cos(base+w*.55),cy+iR*Math.sin(base+w*.55)]);
    }
    return 'M '+pts.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' L ')+' Z';
  }
  const g1 = gearPath(200,195,95,75,16);
  // Clock face inside
  const marks = Array.from({length:12}, (_,i) => {
    const a=i*30*Math.PI/180-Math.PI/2;
    const r1=60, r2=i%3===0?52:56;
    return `<line x1="${(200+r1*Math.cos(a)).toFixed(1)}" y1="${(195+r1*Math.sin(a)).toFixed(1)}" x2="${(200+r2*Math.cos(a)).toFixed(1)}" y2="${(195+r2*Math.sin(a)).toFixed(1)}" stroke="${D}" stroke-width="${i%3===0?2.5:1.5}" opacity="0.7"/>`;
  }).join('');
  // Hands (showing ~10:10)
  const hourA = -60*Math.PI/180, minA = 60*Math.PI/180;
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="105" ry="10" fill="#000" opacity="0.35"/>
<path d="${g1}" fill="url(#lg${id})"/>
<circle cx="200" cy="195" r="72" fill="${M}" opacity="0.85"/>
<circle cx="200" cy="195" r="68" fill="${L}" opacity="0.5"/>
${marks}
<line x1="200" y1="195" x2="${(200+38*Math.cos(hourA)).toFixed(1)}" y2="${(195+38*Math.sin(hourA)).toFixed(1)}" stroke="${D}" stroke-width="4" stroke-linecap="round"/>
<line x1="200" y1="195" x2="${(200+54*Math.cos(minA)).toFixed(1)}" y2="${(195+54*Math.sin(minA)).toFixed(1)}" stroke="${D}" stroke-width="3" stroke-linecap="round"/>
<circle cx="200" cy="195" r="6" fill="${D}"/>
<circle cx="200" cy="195" r="3" fill="${L}"/>
<path d="${g1}" fill="url(#hi${id})" opacity="0.4"/>`);
}

// ── 13 · Crystal Glass Vase ───────────────────────────────────────────────────
function drawCrystalVase(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const d = "M 180,310 Q 148,295 142,265 Q 136,238 148,210 Q 158,188 150,162 Q 144,138 155,112 Q 164,88 178,74 Q 190,62 200,60 Q 210,62 222,74 Q 236,88 245,112 Q 256,138 250,162 Q 242,188 252,210 Q 264,238 258,265 Q 252,295 220,310 Z";
  // Crystal refraction highlights (multiple bright streaks)
  const refractions = `
<path d="${d}" fill="#c8e8ff" opacity="0.25"/>
<line x1="165" y1="90" x2="175" y2="295" stroke="#fff" stroke-width="6" opacity="0.35"/>
<line x1="215" y1="80" x2="225" y2="288" stroke="#fff" stroke-width="3" opacity="0.2"/>
<ellipse cx="168" cy="130" rx="8" ry="28" fill="#fff" opacity="0.4" transform="rotate(-8,168,130)"/>`;
  return wrap(p, `<defs>
<linearGradient id="lg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#e8f4ff"/><stop offset="40%" stop-color="#c0ddf8" stop-opacity="0.5"/>
<stop offset="70%" stop-color="#90c0f0" stop-opacity="0.6"/><stop offset="100%" stop-color="#4888c8"/>
</linearGradient>
<radialGradient id="hi${id}" cx="25%" cy="20%" r="45%">
<stop offset="0%" stop-color="#fff" stop-opacity="0.9"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
</radialGradient></defs>
<ellipse cx="200" cy="320" rx="82" ry="10" fill="#000" opacity="0.35"/>
<path d="${d}" fill="url(#lg${id})"/>
${refractions}
<path d="${d}" fill="url(#hi${id})" opacity="0.8"/>
<ellipse cx="200" cy="63" rx="22" ry="7" fill="#90b8e0" opacity="0.5"/>
<ellipse cx="200" cy="61" rx="14" ry="3" fill="#1c1008" opacity="0.4"/>`);
}

// ── 14 · Ceramic Owl Figurine ────────────────────────────────────────────────
function drawOwl(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const bodyD = "M 200,308 L 118,265 L 118,165 L 200,120 L 282,165 L 282,265 Z";
  const headD = "M 200,128 L 148,155 L 148,215 L 200,235 L 252,215 L 252,155 Z";
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}
<clipPath id="cpb${id}"><path d="${bodyD}"/></clipPath>
<clipPath id="cph${id}"><path d="${headD}"/></clipPath></defs>
<ellipse cx="200" cy="320" rx="90" ry="10" fill="#000" opacity="0.35"/>
<path d="${bodyD}" fill="url(#lg${id})"/>
<path d="${headD}" fill="${M}"/>
<polygon points="155,158 148,118 170,148" fill="${D}"/>
<polygon points="245,158 252,118 230,148" fill="${D}"/>
<circle cx="175" cy="185" r="28" fill="#1c1008"/>
<circle cx="225" cy="185" r="28" fill="#1c1008"/>
<circle cx="175" cy="185" r="22" fill="${L}"/>
<circle cx="225" cy="185" r="22" fill="${L}"/>
<circle cx="175" cy="185" r="13" fill="#1c1008"/>
<circle cx="225" cy="185" r="13" fill="#1c1008"/>
<circle cx="178" cy="182" r="5" fill="#fff" opacity="0.9"/>
<circle cx="228" cy="182" r="5" fill="#fff" opacity="0.9"/>
<polygon points="200,200 190,218 210,218" fill="${D}" opacity="0.9"/>
<ellipse cx="200" cy="262" rx="45" ry="35" fill="${M}" opacity="0.55"/>
<path d="${bodyD}" fill="url(#gz${id})" opacity="0.7"/>
<path d="${headD}" fill="url(#gz${id})" opacity="0.6"/>`);
}

// ── 15 · Eiffel Tower Replica ────────────────────────────────────────────────
function drawEiffelTower(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Eiffel Tower silhouette built from paths
  const towerD = "M 200,62 L 210,112 L 232,130 L 240,152 L 258,168 L 268,188 L 275,205 L 270,215 L 248,215 L 248,232 L 268,232 L 275,248 L 275,268 L 248,268 L 248,295 L 215,308 L 185,308 L 152,295 L 152,268 L 125,268 L 125,248 L 132,232 L 152,232 L 152,215 L 130,215 L 125,205 L 132,188 L 142,168 L 160,152 L 168,130 L 190,112 Z";
  // Arch at first floor
  const arch1 = `<path d="M 152,268 Q 200,235 248,268" fill="none" stroke="${L}" stroke-width="4" opacity="0.7"/>`;
  const arch2 = `<path d="M 152,215 Q 200,185 248,215" fill="none" stroke="${L}" stroke-width="3" opacity="0.6"/>`;
  // Lattice lines (diagonal criss-cross on legs)
  const lattice = `
<line x1="152" y1="268" x2="248" y2="215" stroke="${D}" stroke-width="1.5" opacity="0.3"/>
<line x1="248" y1="268" x2="152" y2="215" stroke="${D}" stroke-width="1.5" opacity="0.3"/>
<line x1="152" y1="215" x2="210" y2="168" stroke="${D}" stroke-width="1.2" opacity="0.25"/>
<line x1="248" y1="215" x2="190" y2="168" stroke="${D}" stroke-width="1.2" opacity="0.25"/>`;
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}<clipPath id="cp${id}"><path d="${towerD}"/></clipPath></defs>
<ellipse cx="200" cy="320" rx="80" ry="10" fill="#000" opacity="0.35"/>
<path d="${towerD}" fill="url(#lg${id})"/>
${arch1}${arch2}${lattice}
<path d="${towerD}" fill="url(#hi${id})" opacity="0.5"/>`);
}

// ── 16 · Classical Marble Bust ───────────────────────────────────────────────
function drawBust(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const pedD = "M 148,308 L 142,290 L 258,290 L 252,308 Z";
  const pedTopD = "M 135,292 L 265,292 L 260,278 L 140,278 Z";
  const shouldersD = "M 100,290 Q 100,240 145,228 L 158,205 L 200,200 L 242,205 L 255,228 Q 300,240 300,290 Z";
  const headD = "M 160,200 Q 155,148 200,138 Q 245,148 240,200 Q 245,225 200,232 Q 155,225 160,200 Z";
  const hairD = "M 160,180 Q 158,138 200,130 Q 242,138 240,180 Q 230,155 200,150 Q 170,155 160,180 Z";
  // Marble veining
  const veins = `<path d="M 168,155 Q 188,170 180,195 Q 175,210 185,225" fill="none" stroke="${D}" stroke-width="1" opacity="0.2"/>
<path d="M 215,148 Q 225,168 218,188 Q 212,205 220,222" fill="none" stroke="${D}" stroke-width="0.8" opacity="0.15"/>`;
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="110" ry="10" fill="#000" opacity="0.35"/>
<path d="${pedD}" fill="${D}"/>
<path d="${pedTopD}" fill="${M}"/>
<path d="${shouldersD}" fill="url(#lg${id})"/>
<path d="${headD}" fill="url(#lg${id})"/>
<path d="${hairD}" fill="${D}" opacity="0.6"/>
${veins}
<ellipse cx="182" cy="178" rx="10" ry="12" fill="#1c1008" opacity="0.4"/>
<ellipse cx="218" cy="178" rx="10" ry="12" fill="#1c1008" opacity="0.4"/>
<path d="M 188,198 Q 200,207 212,198" fill="none" stroke="${D}" stroke-width="2" opacity="0.4"/>
<path d="${headD}" fill="url(#gz${id})" opacity="0.6"/>
<path d="${shouldersD}" fill="url(#gz${id})" opacity="0.4"/>`);
}

// ── 17 · Faceted Gold Ring ───────────────────────────────────────────────────
function drawRing(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const cx=200,cy=210,oR=95,iR=62,vO=38,vI=24,segs=12;
  let facets='';
  for(let i=0;i<segs;i++){
    const a1=(i/segs)*Math.PI*2-Math.PI/2, a2=((i+1)/segs)*Math.PI*2-Math.PI/2;
    const x1=cx+oR*Math.cos(a1),y1=cy+vO*Math.sin(a1),x2=cx+oR*Math.cos(a2),y2=cy+vO*Math.sin(a2);
    const x3=cx+iR*Math.cos(a2),y3=cy+vI*Math.sin(a2),x4=cx+iR*Math.cos(a1),y4=cy+vI*Math.sin(a1);
    const shade=i<3||i>9?L:i<6?M:D;
    facets+=`<polygon points="${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)} ${x4.toFixed(1)},${y4.toFixed(1)}" fill="${shade}"/>`;
    if(i===1||i===5||i===9) facets+=`<line x1="${((x1+x2)/2).toFixed(1)}" y1="${((y1+y2)/2).toFixed(1)}" x2="${((x3+x4)/2).toFixed(1)}" y2="${((y3+y4)/2).toFixed(1)}" stroke="#fff" stroke-width="0.8" opacity="0.5"/>`;
  }
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="${cx}" cy="315" rx="${oR}" ry="10" fill="#000" opacity="0.35"/>
${facets}
<ellipse cx="${cx}" cy="${cy}" rx="${iR}" ry="${vI}" fill="#1c1008"/>
<polygon points="200,172 218,184 218,204 200,212 182,204 182,184" fill="${L}" opacity="0.95"/>
<polygon points="200,172 218,184 200,188" fill="#fff" opacity="0.7"/>
<polygon points="200,172 182,184 200,188" fill="${M}" opacity="0.5"/>`);
}

// ── 18 · Crescent Moon Earrings ──────────────────────────────────────────────
function drawMoonEarrings(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const lo="M 100,262 A 55,55 0 1 1 155,207 A 55,55 0 0 0 100,262 Z";
  const ro="M 245,262 A 55,55 0 1 1 300,207 A 55,55 0 0 0 245,262 Z";
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="105" ry="9" fill="#000" opacity="0.3"/>
<path d="${lo}" fill="url(#lg${id})"/>
<path d="${lo}" fill="url(#hi${id})" opacity="0.7"/>
<path d="${ro}" fill="${M}"/>
<path d="${ro}" fill="url(#hi${id})" opacity="0.6"/>
<path d="M 127,152 Q 127,132 137,122 Q 147,112 147,122" fill="none" stroke="${M}" stroke-width="3" stroke-linecap="round"/>
<path d="M 272,152 Q 272,132 282,122 Q 292,112 292,122" fill="none" stroke="${M}" stroke-width="3" stroke-linecap="round"/>`);
}

// ── 19 · Star Map Pendant ────────────────────────────────────────────────────
function drawPendant(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const cx=200,cy=212,R=90;
  const stars=[[0,-60],[40,-38],[55,10],[25,55],[-25,55],[-55,10],[-40,-38],[0,0],[20,-20],[-20,-20],[30,25],[-30,25]];
  const conLines=[[0,8],[1,8],[2,3],[3,4],[4,5],[5,6],[6,1],[8,9],[8,10],[9,11]];
  const starDots=stars.map(([dx,dy])=>`<circle cx="${cx+dx}" cy="${cy+dy}" r="4.5" fill="${L}"/>`).join('');
  const conPaths=conLines.map(([a,b])=>{const[ax,ay]=stars[a],[bx,by]=stars[b];return`<line x1="${cx+ax}" y1="${cy+ay}" x2="${cx+bx}" y2="${cy+by}" stroke="${M}" stroke-width="1.5" opacity="0.7"/>`;}).join('');
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="${cx}" cy="322" rx="${R}" ry="11" fill="#000" opacity="0.35"/>
<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#lg${id})"/>
<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#hi${id})" opacity="0.6"/>
<circle cx="${cx}" cy="${cy}" r="${R-8}" fill="none" stroke="${D}" stroke-width="2" opacity="0.4"/>
${conPaths}${starDots}
<rect x="193" y="${cy-R-18}" width="14" height="18" rx="7" fill="none" stroke="${M}" stroke-width="2.5"/>
<line x1="200" y1="${cy-R-18}" x2="200" y2="${cy-R-40}" stroke="${M}" stroke-width="2"/>
<path d="M 193,${cy-R-40} Q 200,${cy-R-50} 207,${cy-R-40}" fill="none" stroke="${M}" stroke-width="2"/>`);
}

// ── 20 · Filigree Bangle ─────────────────────────────────────────────────────
function drawBangle(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const cx=200,cy=210,oR=95,iR=58,vO=28,vI=17,segs=16;
  let band='',cutouts='';
  for(let i=0;i<segs;i++){
    const a1=(i/segs)*Math.PI*2-Math.PI/2,a2=((i+1)/segs)*Math.PI*2-Math.PI/2;
    const x1=cx+oR*Math.cos(a1),y1=cy+vO*Math.sin(a1),x2=cx+oR*Math.cos(a2),y2=cy+vO*Math.sin(a2);
    const x3=cx+iR*Math.cos(a2),y3=cy+vI*Math.sin(a2),x4=cx+iR*Math.cos(a1),y4=cy+vI*Math.sin(a1);
    const shade=i<4||i>12?L:i<8?M:D;
    band+=`<polygon points="${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)} ${x4.toFixed(1)},${y4.toFixed(1)}" fill="${shade}"/>`;
    if(i%2===1){const mx=(x1+x2+x3+x4)/4,my=(y1+y2+y3+y4)/4;cutouts+=`<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="7" ry="5" fill="#1c1008" opacity="0.75"/>`;}
    if(i%2===0){const mx=(x1+x2)/2,my=(y1+y2)/2;band+=`<line x1="${mx.toFixed(1)}" y1="${my.toFixed(1)}" x2="${((x3+x4)/2).toFixed(1)}" y2="${((y3+y4)/2).toFixed(1)}" stroke="#fff" stroke-width="0.8" opacity="0.4"/>`;}
  }
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="${cx}" cy="320" rx="${oR}" ry="10" fill="#000" opacity="0.35"/>
${band}${cutouts}<ellipse cx="${cx}" cy="${cy}" rx="${iR}" ry="${vI}" fill="#1c1008"/>`);
}

// ── 21 · Floating Wall Shelf ─────────────────────────────────────────────────
function drawShelf(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  // Shelf plank
  const shelfD = "M 80,235 L 320,235 L 320,262 L 80,262 Z";
  // Under-shelf bracket (hidden mount)
  const mountD = "M 155,262 L 155,295 L 165,295 L 165,262 Z M 235,262 L 235,295 L 245,295 L 245,262 Z";
  // Wood grain
  const grain = [240,247,254].map(y =>
    `<line x1="82" y1="${y}" x2="318" y2="${y}" stroke="${D}" stroke-width="0.7" opacity="0.2" stroke-dasharray="12,8"/>`
  ).join('');
  // Items on shelf
  const items = `
<rect x="100" y="182" width="22" height="53" rx="3" fill="#c05030" opacity="0.9"/>
<rect x="124" y="188" width="18" height="47" rx="3" fill="#305090" opacity="0.9"/>
<rect x="144" y="185" width="20" height="50" rx="3" fill="#228844" opacity="0.9"/>
<ellipse cx="240" cy="215" rx="22" ry="22" fill="#d8b060" opacity="0.85"/>
<ellipse cx="240" cy="215" rx="16" ry="16" fill="#c09040" opacity="0.7"/>
<rect x="270" y="195" width="12" height="40" rx="6" fill="${M}" opacity="0.9"/>
<ellipse cx="276" cy="193" rx="8" ry="5" fill="${M}" opacity="0.8"/>`;
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="308" rx="140" ry="9" fill="#000" opacity="0.35"/>
${items}
<path d="${shelfD}" fill="url(#lg${id})"/>
${grain}
<path d="${shelfD}" fill="url(#hi${id})" opacity="0.4"/>
<path d="${mountD}" fill="${D}"/>`);
}

// ── 22 · Silicone Cable Clips ────────────────────────────────────────────────
function drawCableClips(p) {
  const [L,M,D] = clr(p.color);
  function clip(cx, cy, r=28, w=10) {
    return `<path d="M ${cx+r*.4},${cy-r} A ${r},${r} 0 1 0 ${cx+r*.4},${cy+r}" fill="none" stroke="${L}" stroke-width="${w}" stroke-linecap="round"/>
<path d="M ${cx+r*.4},${cy-r} A ${r},${r} 0 1 0 ${cx+r*.4},${cy+r}" fill="none" stroke="#fff" stroke-width="${w*.3}" stroke-linecap="round" opacity="0.3"/>`;
  }
  return wrap(p, `<defs>${gdefs(p.id,L,L,D)}</defs>
<ellipse cx="200" cy="320" rx="110" ry="10" fill="#000" opacity="0.3"/>
${clip(148,160,32,14)}${clip(252,155,28,12)}${clip(148,245,32,14)}
${clip(252,242,28,12)}${clip(200,200,30,13)}${clip(200,295,22,10)}
<circle cx="200" cy="200" r="12" fill="#3b82f6" opacity="0.85"/>
<circle cx="200" cy="200" r="6" fill="#fff" opacity="0.5"/>`);
}

// ── 23 · Coat Hook Rail ──────────────────────────────────────────────────────
function drawHookRail(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const railD = "M 85,162 L 315,162 L 315,186 L 85,186 Z";
  function jHook(x) {
    return `<path d="M ${x-6},186 L ${x-6},272 Q ${x-6},297 ${x+16},297 Q ${x+38},297 ${x+38},274 L ${x+38},257" fill="none" stroke="${L}" stroke-width="14" stroke-linecap="round"/>
<path d="M ${x-6},186 L ${x-6},272 Q ${x-6},297 ${x+16},297 Q ${x+38},297 ${x+38},274 L ${x+38},257" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.25"/>`;
  }
  const screws=[110,160,210,260,290].map(x=>
    `<circle cx="${x}" cy="174" r="6" fill="${D}"/><circle cx="${x}" cy="174" r="2.5" fill="${L}" opacity="0.8"/>`
  ).join('');
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="130" ry="9" fill="#000" opacity="0.3"/>
${jHook(125)}${jHook(195)}${jHook(265)}
<path d="${railD}" fill="url(#lg${id})"/>
<path d="${railD}" fill="url(#hi${id})" opacity="0.6"/>
${screws}`);
}

// ── 24 · Corner Shelf Bracket ────────────────────────────────────────────────
function drawCornerBracket(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  function brace(ox, oy) {
    const arm=`M ${ox},${oy} L ${ox+90},${oy} L ${ox+90},${oy+16} L ${ox+16},${oy+16} L ${ox+16},${oy+90} L ${ox},${oy+90} Z`;
    const tri=`M ${ox+16},${oy+16} L ${ox+90},${oy+16} L ${ox+16},${oy+90} Z`;
    const holes=`<circle cx="${ox+55}" cy="${oy+8}" r="5" fill="#1c1008"/><circle cx="${ox+75}" cy="${oy+8}" r="5" fill="#1c1008"/>
<circle cx="${ox+8}" cy="${oy+55}" r="5" fill="#1c1008"/><circle cx="${ox+8}" cy="${oy+75}" r="5" fill="#1c1008"/>`;
    return {arm,tri,holes};
  }
  const b1=brace(90,108),b2=brace(195,192);
  return wrap(p, `<defs>${metalDefs(id,L,M,D)}</defs>
<ellipse cx="210" cy="318" rx="130" ry="10" fill="#000" opacity="0.35"/>
<path d="${b1.arm}" fill="url(#lg${id})"/>
<path d="${b1.arm}" fill="url(#hi${id})" opacity="0.5"/>
<path d="${b1.tri}" fill="${M}" opacity="0.6"/>
${b1.holes}
<path d="${b2.arm}" fill="${M}"/>
<path d="${b2.tri}" fill="${D}" opacity="0.6"/>
${b2.holes}`);
}

// ── Shared collectible figure base ───────────────────────────────────────────
function figureBase(p, accessories) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="78" ry="9" fill="#000" opacity="0.38"/>
<ellipse cx="200" cy="308" rx="72" ry="18" fill="${D}"/>
<ellipse cx="200" cy="305" rx="70" ry="16" fill="${M}"/>
<rect x="176" y="268" width="20" height="38" rx="5" fill="${D}"/>
<rect x="204" y="268" width="20" height="38" rx="5" fill="${D}"/>
<rect x="178" y="225" width="18" height="48" rx="6" fill="${M}"/>
<rect x="204" y="225" width="18" height="48" rx="6" fill="${M}"/>
<rect x="168" y="175" width="64" height="55" rx="8" fill="${L}"/>
<rect x="145" y="178" width="20" height="44" rx="8" fill="${M}"/>
<rect x="235" y="178" width="20" height="44" rx="8" fill="${M}"/>
<ellipse cx="200" cy="158" rx="28" ry="30" fill="${L}"/>
<path d="${`M 168,175 L 232,175`}" fill="none"/>
${accessories(L,M,D)}`);
}

// ── 25 · Fantasy Wizard Figurine ─────────────────────────────────────────────
function drawWizard(p) {
  return figureBase(p, (L,M,D) => `
<path d="M 162,230 L 156,308 L 244,308 L 238,230 Z" fill="${M}" opacity="0.9"/>
<polygon points="200,82 175,132 225,132" fill="${D}"/>
<rect x="168" y="130" width="64" height="14" rx="4" fill="${D}" opacity="0.9"/>
<path d="M 182,168 Q 180,195 188,218 Q 200,230 212,218 Q 220,195 218,168 Q 210,178 200,178 Q 190,178 182,168 Z" fill="#e8e0d0" opacity="0.85"/>
<line x1="140" y1="120" x2="148" y2="308" stroke="#8b6914" stroke-width="6" stroke-linecap="round"/>
<circle cx="140" cy="118" r="11" fill="${L}" opacity="0.9"/>
<circle cx="140" cy="118" r="6" fill="#fff" opacity="0.7"/>`);
}

// ── 26 · Knight Armor Figurine ───────────────────────────────────────────────
function drawKnight(p) {
  return figureBase(p, (L,M,D) => `
<ellipse cx="152" cy="188" rx="28" ry="20" fill="${M}"/>
<ellipse cx="248" cy="188" rx="28" ry="20" fill="${M}"/>
<rect x="178" y="132" width="44" height="48" rx="10" fill="${D}"/>
<rect x="184" y="145" width="32" height="10" rx="3" fill="#444" opacity="0.9"/>
<line x1="252" y1="178" x2="285" y2="140" stroke="${M}" stroke-width="8" stroke-linecap="round"/>
<polygon points="280,132 295,145 288,165 272,162" fill="${L}"/>
<ellipse cx="200" cy="197" rx="12" ry="10" fill="${D}" opacity="0.8"/>
<path d="M 175,182 Q 155,230 160,308 L 145,308 Q 138,238 155,178 Z" fill="${D}" opacity="0.6"/>`);
}

// ── 27 · Archer Figurine ─────────────────────────────────────────────────────
function drawArcher(p) {
  return figureBase(p, (L,M,D) => `
<path d="M 168,182 Q 148,248 155,308 L 135,308 Q 128,248 148,178 Z" fill="${D}" opacity="0.7"/>
<path d="M 138,148 Q 105,188 138,228" fill="none" stroke="#8b6914" stroke-width="6" stroke-linecap="round"/>
<line x1="138" y1="148" x2="138" y2="228" stroke="#c8a870" stroke-width="1.5" opacity="0.9"/>
<line x1="138" y1="188" x2="225" y2="188" stroke="#c8a870" stroke-width="2.5"/>
<polygon points="225,188 215,184 215,192" fill="#c8a870"/>
<rect x="244" y="155" width="14" height="55" rx="7" fill="${D}"/>
<line x1="248" y1="155" x2="248" y2="125" stroke="#c8a870" stroke-width="2"/>
<line x1="252" y1="155" x2="252" y2="120" stroke="#c8a870" stroke-width="2"/>
<polygon points="172,138 158,118 168,145" fill="${L}"/>
<polygon points="228,138 242,118 232,145" fill="${L}"/>`);
}

// ── 28 · Viking Warrior Figurine ─────────────────────────────────────────────
function drawViking(p) {
  return figureBase(p, (L,M,D) => `
<path d="M 165,180 Q 140,240 148,308 L 128,308 Q 118,240 145,175 Z" fill="#a07040" opacity="0.75"/>
<rect x="176" y="130" width="48" height="42" rx="8" fill="${D}"/>
<polygon points="178,145 160,110 172,148" fill="${D}"/>
<polygon points="222,145 240,110 228,148" fill="${D}"/>
<rect x="182" y="145" width="36" height="10" rx="2" fill="#1c1008" opacity="0.7"/>
<line x1="250" y1="120" x2="262" y2="222" stroke="#8b6914" stroke-width="7" stroke-linecap="round"/>
<path d="M 246,125 Q 278,108 280,140 Q 282,158 260,155 Z" fill="${M}"/>
<ellipse cx="155" cy="215" rx="24" ry="30" fill="${M}"/>
<ellipse cx="155" cy="215" rx="18" ry="23" fill="${L}" opacity="0.6"/>
<circle cx="155" cy="215" r="6" fill="${D}"/>`);
}

// ── 29 · Ceramic Fox Figurine ────────────────────────────────────────────────
function drawFox(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const bodyD = "M 200,308 L 118,285 L 125,210 L 155,178 L 200,165 L 245,178 L 275,210 L 282,285 Z";
  const headD = "M 200,168 L 165,148 L 158,115 L 178,90 L 200,82 L 222,90 L 242,115 L 235,148 Z";
  const tailD = "M 282,285 Q 318,240 308,185 Q 298,148 272,158 Q 260,165 265,195 Q 268,218 258,245 Z";
  return wrap(p, `<defs>${ceramicDefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="95" ry="10" fill="#000" opacity="0.35"/>
<path d="${tailD}" fill="${M}"/>
<ellipse cx="290" cy="165" rx="18" ry="14" fill="#f5f0e8" transform="rotate(-30,290,165)" opacity="0.88"/>
<path d="${bodyD}" fill="url(#lg${id})"/>
<path d="${bodyD}" fill="url(#gz${id})" opacity="0.65"/>
<ellipse cx="162" cy="305" rx="22" ry="10" fill="${D}"/>
<ellipse cx="238" cy="305" rx="22" ry="10" fill="${D}"/>
<line x1="118" y1="285" x2="155" y2="178" stroke="${D}" stroke-width="1.2" opacity="0.3"/>
<line x1="282" y1="285" x2="245" y2="178" stroke="${D}" stroke-width="1.2" opacity="0.3"/>
<path d="${headD}" fill="url(#lg${id})"/>
<path d="${headD}" fill="url(#gz${id})" opacity="0.65"/>
<polygon points="165,148 158,115 145,142" fill="${D}"/>
<polygon points="235,148 242,115 255,142" fill="${D}"/>
<polygon points="200,168 178,155 182,132 200,128 218,132 222,155" fill="#f5f0e8" opacity="0.82"/>
<ellipse cx="182" cy="118" rx="7" ry="8" fill="#1c1008"/><circle cx="184" cy="116" r="2.5" fill="#fff" opacity="0.8"/>
<ellipse cx="218" cy="118" rx="7" ry="8" fill="#1c1008"/><circle cx="220" cy="116" r="2.5" fill="#fff" opacity="0.8"/>
<ellipse cx="200" cy="138" rx="5" ry="4" fill="#1c1008"/>`);
}

// ── 30 · Plush Octopus Toy ───────────────────────────────────────────────────
function drawPlushOctopus(p) {
  const [L,M,D] = clr(p.color);
  const id = p.id;
  const bodyD = "M 148,200 Q 148,132 200,120 Q 252,132 252,200 Q 252,232 200,240 Q 148,232 148,200 Z";
  const tentacles = [
    {cx:162,cy:234,dx:-52,dy:68,bend:-15},
    {cx:178,cy:238,dx:-20,dy:78,bend:-6},
    {cx:194,cy:240,dx:6,dy:80,bend:5},
    {cx:210,cy:240,dx:28,dy:78,bend:12},
    {cx:226,cy:237,dx:50,dy:70,bend:18},
    {cx:240,cy:230,dx:65,dy:55,bend:22},
    {cx:148,cy:225,dx:-68,dy:52,bend:-25},
    {cx:252,cy:222,dy:48,dx:70,bend:28},
  ];
  let tentSvg='';
  tentacles.forEach(({cx,cy,dx,dy,bend},i)=>{
    const ex=cx+dx,ey=cy+dy,cpx=cx+dx*.5+bend,cpy=cy+dy*.4;
    for(let s=0;s<5;s++){
      const t=(s+.5)/5;
      const qx=(1-t)*(1-t)*cx+2*(1-t)*t*cpx+t*t*ex;
      const qy=(1-t)*(1-t)*cy+2*(1-t)*t*cpy+t*t*ey;
      const r=Math.max(5,Math.round(12*(1-t*.55)));
      tentSvg+=`<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="${r+2}" fill="${D}"/>`;
      tentSvg+=`<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="${r}" fill="${i%2===0?M:L}"/>`;
      if(s>0) tentSvg+=`<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="${Math.max(2,r*.35)}" fill="#1c1008" opacity="0.4"/>`;
    }
  });
  return wrap(p, `<defs>${gdefs(id,L,M,D)}</defs>
<ellipse cx="200" cy="320" rx="100" ry="10" fill="#000" opacity="0.35"/>
${tentSvg}
<path d="${bodyD}" fill="url(#lg${id})"/>
<path d="${bodyD}" fill="url(#hi${id})" opacity="0.6"/>
<ellipse cx="182" cy="182" rx="16" ry="18" fill="#1c1008"/>
<ellipse cx="218" cy="182" rx="16" ry="18" fill="#1c1008"/>
<ellipse cx="182" cy="182" rx="10" ry="12" fill="#fff"/>
<ellipse cx="218" cy="182" rx="10" ry="12" fill="#fff"/>
<circle cx="185" cy="179" r="5" fill="#1c1008"/>
<circle cx="221" cy="179" r="5" fill="#1c1008"/>
<circle cx="187" cy="177" r="2" fill="#fff"/>
<circle cx="223" cy="177" r="2" fill="#fff"/>
<path d="M 188,202 Q 200,213 212,202" fill="none" stroke="${D}" stroke-width="3" stroke-linecap="round"/>`);
}

// ── Product map ──────────────────────────────────────────────────────────────
const SHAPES = {
   1:drawVase,      2:drawCandle,       3:drawMirrorSet,  4:drawBowl,
   5:drawPlushDragon,6:drawPuzzleCube,  7:drawJumpRope,   8:drawWoodenTop,
   9:drawCableBox,  10:drawPhoneStand,  11:drawToolRoll,  12:drawGearClock,
  13:drawCrystalVase,14:drawOwl,        15:drawEiffelTower,16:drawBust,
  17:drawRing,     18:drawMoonEarrings, 19:drawPendant,   20:drawBangle,
  21:drawShelf,    22:drawCableClips,   23:drawHookRail,  24:drawCornerBracket,
  25:drawWizard,   26:drawKnight,       27:drawArcher,    28:drawViking,
  29:drawFox,      30:drawPlushOctopus,
};

export function productPlaceholder(product) {
  return (SHAPES[product.id] || drawVase)(product);
}
