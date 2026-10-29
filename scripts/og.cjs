// Renders a 1200×630 share image for every built page into public/og/<lang>/<path>.png.
// Run after `npm run build`: node scripts/og.cjs   (needs Playwright's Chromium)
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '..'); const dist = path.join(root, 'dist');
const fsrc = (p) => 'file://' + path.join(root, 'node_modules/@fontsource', p);
const logo = fs.readFileSync(path.join(root, 'public/logo.svg'), 'utf8');
const pages = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') pages.push(p); } })(dist);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
  let n = 0;
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    if (/name="robots" content="noindex/.test(html) && /specimen/.test(file)) continue;
    const lang = (html.match(/<html lang="(\w+)"/) || [])[1] || 'en';
    let title = (html.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
    title = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    const [main, site] = title.includes(' — ') ? title.split(' — ') : [title, ''];
    const rel = path.relative(dist, path.dirname(file)).replace(/\\/g, '/');
    const p = '/' + (rel.startsWith('bn') ? rel.slice(2).replace(/^\//, '') : rel);
    const out = path.join(root, 'public/og', lang, (p === '/' ? 'index' : p.replace(/^\//, '').replace(/\/$/, '')) + '.png');
    const isHome = p === '/';
    const heading = isHome ? site : main;
    const sub = isHome ? main : (lang === 'bn' ? 'অক্ষর ল্যাবস' : 'Akkhar Labs');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const tmp = path.join(root, 'node_modules/.og-tmp.html');
    fs.writeFileSync(tmp, `<!doctype html><html lang="${lang}"><head><style>
      @font-face{font-family:S;src:url(${fsrc('source-serif-4/files/source-serif-4-latin-600-normal.woff2')});font-weight:600}
      @font-face{font-family:S;src:url(${fsrc('noto-serif-bengali/files/noto-serif-bengali-bengali-600-normal.woff2')});font-weight:600;unicode-range:U+0980-09FF,U+200C-200D,U+25CC}
      @font-face{font-family:P;src:url(${fsrc('ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2')})}
      @font-face{font-family:P;src:url(${fsrc('noto-sans-bengali/files/noto-sans-bengali-bengali-400-normal.woff2')});unicode-range:U+0980-09FF,U+200C-200D,U+25CC}
      *{margin:0;box-sizing:border-box} body{width:1200px;height:630px;background:#F7F5F0;color:#1A1A18;border-top:12px solid #E81B2C;padding:64px 80px;display:flex;flex-direction:column;justify-content:space-between;font-family:P}
      .top{display:flex;align-items:center;gap:20px;font-size:26px;color:#55534E} .top svg{width:64px;height:64px}
      h1{font-family:S;font-weight:600;font-size:${heading.length > 70 ? 54 : 68}px;line-height:${lang === 'bn' ? 1.4 : 1.15};max-width:1000px}
      .foot{display:flex;justify-content:space-between;font-size:24px;color:#55534E;border-top:1px solid #1A1A18;padding-top:20px}
    </style></head><body><div class="top">${logo}<span>${esc(sub)}</span></div><h1>${esc(heading)}</h1><div class="foot"><span>akkharlabs.com${esc(lang === 'bn' ? '/bn' : '')}${esc(p)}</span><span>${lang === 'bn' ? 'Akkhar Labs' : 'অক্ষর ল্যাবস'}</span></div></body></html>`);
    await pg.goto('file://' + tmp);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: out }); n++;
  }
  await b.close(); console.log('share images:', n);
})();
