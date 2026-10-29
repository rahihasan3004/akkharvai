// Tell Bing, Yandex, Seznam and Naver (via IndexNow) that pages changed, so they are re-crawled within hours.
// Bing's index is what ChatGPT search and Microsoft Copilot read from.
// Run after each deploy:  npm run indexnow            (submits every URL in dist/sitemap-0.xml)
//                         npm run indexnow -- /about/ (submits only the paths given)
import { readFileSync, readdirSync } from 'node:fs';

const host = 'akkharlabs.com';
const key = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace('.txt', '');
if (!key) throw new Error('No IndexNow key file (32 hex characters + .txt) found in public/.');

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => new URL(p, `https://${host}`).href);
} else {
  const files = readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f));
  if (!files.length) throw new Error('Run "npm run build" first: no dist/sitemap-*.xml found.');
  urls = files.flatMap((f) => [...readFileSync(`dist/${f}`, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  urls.push(`https://${host}/llms.txt`, `https://${host}/llms-full.txt`);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URL(s), response ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exitCode = 1;
