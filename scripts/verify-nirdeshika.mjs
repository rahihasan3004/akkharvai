// Compares the browser port (src/lib/nirdeshika.ts) with Boyon and Shimu compiled from C.
// Usage: node --experimental-strip-types scripts/verify-nirdeshika.mjs <boyon-bin> <shimu-bin> <examples-dir> [count]
import { assemble, simulate } from '../src/lib/nirdeshika.ts';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const [boyon, shimu, examplesDir, countArg] = process.argv.slice(2);
const count = Number(countArg ?? 500);

function runC(source) {
  const dir = mkdtempSync(join(tmpdir(), 'nir-'));
  writeFileSync(join(dir, 'p.বয়ন'), source);
  execFileSync(boyon, ['p.বয়ন'], { cwd: dir, stdio: 'pipe' });
  const bytes = new Uint8Array(readFileSync(join(dir, 'p.ব')));
  let report = null;
  try {
    execFileSync(shimu, ['p.ব'], { cwd: dir, stdio: 'pipe', timeout: 400 });
    report = readFileSync(join(dir, 'সিমুলেটর_ফলাফল.txt'), 'utf8');
  } catch { report = null; } // never halts: C loops forever
  rmSync(dir, { recursive: true, force: true });
  return { bytes, report };
}

function compare(name, source) {
  const c = runC(source);
  const js = assemble(source);
  const sameBytes = Buffer.compare(Buffer.from(c.bytes), Buffer.from(js.bytes)) === 0;
  let sameReport = null;
  if (c.report !== null) {
    const sim = simulate(js.bytes);
    sameReport = sim.halted && sim.report === c.report;
    if (!sameReport) return { name, ok: false, why: 'report', source, c: c.report, js: sim.report };
  }
  if (!sameBytes) return { name, ok: false, why: 'bytes', source, c: [...c.bytes], js: [...js.bytes] };
  return { name, ok: true, simulated: c.report !== null };
}

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const bn = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
const mnemonics = ['শূণ্য','স্থানান্তর','আদান','প্রদান','সংযোজন','বিয়োজন','গুনন','বিভাজন','উভয়','অথবা','বিচিত্র','বিপরীত','প্রস্থান','সাম্য-প্রস্থান','প্রদর্শন'];
const decompose = (s) => (Math.random() < 0.5 ? s.replace(/য়/g, 'য়') : s);
function operand(labels) {
  const n = Math.floor(Math.random() * 300);
  return pick([
    () => bn(n),
    () => String(n),
    () => '০ষ' + pick(['', '১', '২', '৯']) + pick(['ক', 'এ', '০', '৫', 'খ', 'চ']),
    () => '০ব' + [...Array(1 + Math.floor(Math.random() * 8))].map(() => pick(['০', '১'])).join(''),
    () => (labels.length ? pick(labels) : bn(n)),
    () => 'অজানা',
  ])();
}
function randomProgram() {
  const labels = ['শুরু', 'শেষ', 'লুপ'].slice(0, 1 + Math.floor(Math.random() * 3));
  const lines = [];
  const len = 3 + Math.floor(Math.random() * 14);
  for (let i = 0; i < len; i++) {
    if (Math.random() < 0.15) lines.push(pick(labels) + ':');
    if (Math.random() < 0.1) lines.push('-- মন্তব্য ' + i);
    const m = decompose(pick(mnemonics));
    const parts = [m];
    if (Math.random() < 0.8) parts.push(decompose(pick(['সাময়িক-' + bn(Math.floor(Math.random() * 17)), 'সাময়িক-' + Math.floor(Math.random() * 16), 'ন-নি', 'অ-সা'])));
    if (Math.random() < 0.3) parts[parts.length - 1] += ',';
    if (Math.random() < 0.8) parts.push(operand(labels));
    if (Math.random() < 0.1) parts.push('-- টীকা');
    lines.push(parts.join(pick([' ', '  ', '\t'])));
  }
  lines.push('থামো');
  return lines.join(pick(['\n', '\r\n']));
}

const results = [];
for (const f of readdirSync(examplesDir).filter((f) => f.endsWith('.বয়ন'))) {
  results.push(compare(f, readFileSync(join(examplesDir, f), 'utf8')));
}
for (let i = 0; i < count; i++) results.push(compare('random-' + i, randomProgram()));

const failed = results.filter((r) => !r.ok);
const simulated = results.filter((r) => r.ok && r.simulated).length;
console.log(`programs: ${results.length}, identical: ${results.length - failed.length}, simulated to halt and compared: ${simulated}, failed: ${failed.length}`);
for (const f of failed.slice(0, 5)) console.log('FAIL', f.name, f.why, JSON.stringify(f.source));
process.exit(failed.length ? 1 : 0);
