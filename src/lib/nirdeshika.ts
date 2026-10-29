/**
 * Nirdeshika-16 toolchain in the browser.
 *
 * A faithful port of the Boyon assembler (akkhar-labs/Boyon, src/lexer.c, src/parser.c,
 * src/symbols.c) and the Shimu simulator (akkhar-labs/Shimu, src/cpu.c, src/memory.c,
 * src/utils/formatting.c, src/main.c). Behaviour — including number parsing and the
 * simulation report text — matches the C tools byte for byte; this is checked by
 * scripts/verify-nirdeshika.mjs against binaries compiled from those repositories.
 *
 * One deliberate difference: the browser stops after `maxSteps` instructions, because the
 * C simulator loops forever on a program that never reaches থামো.
 */

const OPCODE_TABLE: Record<string, number> = {
  'শূণ্য': 0x0,
  'স্থানান্তর': 0x1,
  'আদান': 0x2,
  'প্রদান': 0x3,
  'সংযোজন': 0x4,
  'বিয়োজন': 0x5,
  'গুনন': 0x6,
  'বিভাজন': 0x7,
  'উভয়': 0x8,
  'অথবা': 0x9,
  'বিচিত্র': 0xa,
  'বিপরীত': 0xb,
  'প্রস্থান': 0xc,
  'সাম্য-প্রস্থান': 0xd,
  'প্রদর্শন': 0xe,
  'থামো': 0xf,
};
/** Mnemonics keyed in the form Boyon compares against: precomposed য় (U+09DF), as in lexer.c. */
export const OPCODES: Record<string, number> = Object.fromEntries(
  Object.entries(OPCODE_TABLE).map(([k, v]) => [k.replace(/\u09AF\u09BC/g, '\u09DF'), v]),
);

/** Report strings copied from the C sources with their exact code points (Shimu mixes both forms of য়). */
const T = {
  "header": "--- \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09bf\u0995\u09be-\u09e7\u09ec \u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u09b6\u09a8 \u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f ---\n",
  "architect": "\u0986\u09b0\u09cd\u0995\u09bf\u099f\u09c7\u0995\u09cd\u099f: \u09b0\u09be\u09b9\u09be\u09a4 \u09b9\u09be\u09b8\u09be\u09a8 | \u0985\u0995\u09cd\u09b7\u09b0 \u09b2\u09cd\u09af\u09be\u09ac\u09b8\n\n",
  "outA": "[\u0986\u0989\u099f\u09aa\u09c1\u099f] \u09b8\u09be\u09ae\u09af\u09bc\u09bf\u0995-",
  "outB": " \u098f\u09b0 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09ae\u09be\u09a8: ",
  "outC": " (\u09b7\u09cb\u09a1\u09bc\u09b6\u09bf\u0995: ",
  "halt": "\n\u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae: \u09aa\u09cd\u09b0\u09b8\u09c7\u09b8\u09b0 \u09a5\u09be\u09ae\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7 (\u09a5\u09be\u09ae\u09cb).\n",
  "div0": "\u09ad\u09c1\u09b2: \u09b6\u09c2\u09a8\u09cd\u09af \u09a6\u09bf\u09af\u09bc\u09c7 \u09ad\u09be\u0997 \u0995\u09b0\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be (Division by Zero)!\n",
  "done": "\n\u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae: \u098f\u0995\u09cd\u09b8\u09bf\u0995\u09bf\u0989\u09b6\u09a8 \u09b8\u09ab\u09b2\u09ad\u09be\u09ac\u09c7 \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09df\u09c7\u099b\u09c7\u0964\n",
  "dump": "\n--- \u09b0\u09c7\u099c\u09bf\u09b8\u09cd\u099f\u09be\u09b0 \u0985\u09ac\u09b8\u09cd\u09a5\u09be (\u099a\u09c2\u09a1\u09bc\u09be\u09a8\u09cd\u09a4 \u0985\u09ac\u09b8\u09cd\u09a5\u09be) ---\n",
  "reg": "\u09b8\u09be\u09ae\u09af\u09bc\u09bf\u0995-",
  "regSep": ": ",
  "gap": "   ",
  "rule": "---------------------------------------\n",
  "dupLabel": "\u09b8\u09a4\u09b0\u09cd\u0995\u09a4\u09be: \u09a1\u09c1\u09aa\u09cd\u09b2\u09bf\u0995\u09c7\u099f \u09b2\u09c7\u09ac\u09c7\u09b2 '%s' (\u09b2\u09be\u0987\u09a8 %d)\n",
  "unknownLabel": "\u09a4\u09cd\u09b0\u09c1\u099f\u09bf: \u0985\u099c\u09cd\u099e\u09be\u09a4 \u09b2\u09c7\u09ac\u09c7\u09b2 '%s' (\u09b2\u09be\u0987\u09a8 %d)\n"
} as const;

const REG_PC = 12;
const REG_SP = 13;
const REG_FLAGS = 14;
const FLAG_ZERO = 0;
const FLAG_OVERFLOW = 1;
const MEMORY_SIZE = 65536;

const DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const HEX_ALPHA = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ'];

/* ---------------------------------------------------------------- Boyon: lexer */

type TokenType = 'INSTRUCTION' | 'REGISTER' | 'NUMBER' | 'LABEL' | 'IDENTIFIER' | 'COMMA' | 'NEWLINE' | 'EOF' | 'ERROR';
interface Token { type: TokenType; value: number; text: string; line: number }

/** Decomposed য় (U+09AF U+09BC) → precomposed য় (U+09DF), as normalize_ya() does. */
function normalizeYa(s: string): string {
  return s.replace(/য়/g, 'য়');
}

/** bengali_str_to_int(): Bengali digits, ASCII digits, 'এ' = 14, 'ক' = 10; anything else is skipped. */
function bengaliStrToInt(str: string, base: number): number {
  let result = 0;
  for (const ch of str) {
    const cp = ch.codePointAt(0)!;
    if (cp >= 0x09e6 && cp <= 0x09ef) result = result * base + (cp - 0x09e6);
    else if (ch === 'এ') result = result * base + 14;
    else if (ch === 'ক') result = result * base + 10;
    else if (ch >= '0' && ch <= '9') result = result * base + (cp - 48);
    // other characters are ignored, exactly as in the C implementation
    result = result | 0; // C long → int truncation on assignment to token.value
  }
  return result;
}

class Lexer {
  private cursor = 0;
  private line = 1;
  private source: string;
  constructor(source: string) { this.source = source; }

  private skipWhitespace() {
    while (' \t\r'.includes(this.source[this.cursor] ?? '\0') && this.cursor < this.source.length) this.cursor++;
  }
  private skipComment(): boolean {
    if (this.source[this.cursor] === '-' && this.source[this.cursor + 1] === '-') {
      while (this.cursor < this.source.length && this.source[this.cursor] !== '\n') this.cursor++;
      return true;
    }
    return false;
  }
  private readWord(): string {
    let out = '';
    while (this.cursor < this.source.length) {
      const c = this.source[this.cursor];
      if (c === ' ' || c === '\t' || c === '\r' || c === '\n' || c === ',') break;
      out += c;
      this.cursor++;
    }
    return out;
  }

  next(): Token {
    this.skipWhitespace();
    while (this.skipComment()) this.skipWhitespace();
    const token: Token = { type: 'ERROR', value: 0, text: '', line: this.line };
    if (this.cursor >= this.source.length) return { ...token, type: 'EOF' };
    const c = this.source[this.cursor];
    if (c === '\n') { this.cursor++; this.line++; return { ...token, type: 'NEWLINE', text: '\\n' }; }
    if (c === ',') { this.cursor++; return { ...token, type: 'COMMA', text: ',' }; }

    const word = normalizeYa(this.readWord());
    token.text = word;

    if (word.length > 0 && word.endsWith(':')) {
      const name = word.slice(0, -1);
      if (name === '') return { ...token, type: 'ERROR', text: ':' };
      return { ...token, type: 'LABEL', text: name };
    }
    if (word in OPCODES) return { ...token, type: 'INSTRUCTION', value: OPCODES[word] };
    // strstr(buffer, "সাময়িক-") with the precomposed য় (U+09DF), after normalizeYa().
    if (word.includes('সাময়িক-')) {
      const dash = word.indexOf('-');
      return { ...token, type: 'REGISTER', value: bengaliStrToInt(word.slice(dash + 1), 10) };
    }
    if (word === 'ন-নি') return { ...token, type: 'REGISTER', value: REG_PC };
    if (word === 'শ-নি') return { ...token, type: 'REGISTER', value: REG_SP };
    if (word === 'অ-সা') return { ...token, type: 'REGISTER', value: REG_FLAGS };
    const hex = word.indexOf('০ষ');
    if (hex >= 0) return { ...token, type: 'NUMBER', value: bengaliStrToInt(word.slice(hex + 2), 16) };
    const bin = word.indexOf('০ব');
    if (bin >= 0) return { ...token, type: 'NUMBER', value: bengaliStrToInt(word.slice(bin + 2), 2) };
    const first = word.codePointAt(0) ?? 0;
    // C checks the first two UTF-8 bytes are E0 A7, i.e. a code point in U+09C0–U+09FF.
    if (first >= 0x09c0 && first <= 0x09ff) return { ...token, type: 'NUMBER', value: bengaliStrToInt(word, 10) };
    if (word[0] >= '0' && word[0] <= '9') return { ...token, type: 'NUMBER', value: bengaliStrToInt(word, 10) };
    if (word !== '') return { ...token, type: 'IDENTIFIER' };
    return token;
  }
}

/* ---------------------------------------------------------------- Boyon: assembler */

export interface AssembleResult {
  /** Machine code as 16-bit words. */
  words: number[];
  /** The .ব file: words in little-endian byte order. */
  bytes: Uint8Array;
  labels: { name: string; address: number }[];
  /** Messages Boyon prints (duplicate labels, unknown labels), in Bengali, as Boyon prints them. */
  messages: string[];
  /** Per-instruction listing: source line, mnemonic, register, value, machine word. */
  listing: { line: number; mnemonic: string; reg: number; value: number; word: number }[];
}

export function assemble(source: string): AssembleResult {
  const messages: string[] = [];
  const labels: { name: string; address: number }[] = [];
  const find = (name: string) => labels.find((l) => l.name === name)?.address ?? -1;

  // First pass: collect labels.
  let lexer = new Lexer(source);
  let tok = lexer.next();
  let address = 0;
  while (tok.type !== 'EOF') {
    if (tok.type === 'LABEL') {
      if (find(tok.text) >= 0 || labels.length >= 256) {
        messages.push(T.dupLabel.replace('%s', tok.text).replace('%d', String(tok.line)).trim());
      } else {
        labels.push({ name: tok.text, address: address & 0xffff });
      }
    } else if (tok.type === 'INSTRUCTION') {
      address += 2;
    }
    tok = lexer.next();
  }

  // Second pass: code generation.
  lexer = new Lexer(source);
  tok = lexer.next();
  const advance = () => { tok = lexer.next(); };
  // `tok` changes inside advance(); read it through cur() so TypeScript does not over-narrow.
  const cur = (): Token => tok;
  const words: number[] = [];
  const listing: AssembleResult['listing'] = [];
  while (tok.type !== 'EOF') {
    if (tok.type === 'INSTRUCTION') {
      const opcode = tok.value;
      const mnemonic = tok.text;
      const line = tok.line;
      let reg = 0;
      let val = 0;
      advance();
      if (cur().type === 'REGISTER') { reg = cur().value; advance(); }
      if (cur().type === 'COMMA') advance();
      if (cur().type === 'NUMBER' || cur().type === 'REGISTER') {
        val = cur().value; advance();
      } else if (cur().type === 'IDENTIFIER') {
        const addr = find(cur().text);
        if (addr < 0) messages.push(T.unknownLabel.replace('%s', cur().text).replace('%d', String(cur().line)).trim());
        else val = addr;
        advance();
      }
      const word = (((opcode & 0xf) << 12) | ((reg & 0xf) << 8) | (val & 0xff)) & 0xffff;
      words.push(word);
      listing.push({ line, mnemonic, reg: reg & 0xf, value: val & 0xff, word });
    } else {
      advance();
    }
  }

  const bytes = new Uint8Array(words.length * 2);
  words.forEach((w, i) => { bytes[i * 2] = w & 0xff; bytes[i * 2 + 1] = (w >> 8) & 0xff; });
  return { words, bytes, labels, messages, listing };
}

/* ---------------------------------------------------------------- Shimu: formatting */

export function bengaliInt(value: number): string {
  if (value === 0) return DIGITS[0];
  let s = '';
  if (value < 0) { s = '-'; value = -value; }
  return s + String(value).replace(/\d/g, (d) => DIGITS[Number(d)]);
}

/** fprint_bengali_hex(): '০ষ' + Akkhar-Hex digits without leading zeros. */
export function akkharHex(value: number): string {
  const nibbles = [(value >> 12) & 0xf, (value >> 8) & 0xf, (value >> 4) & 0xf, value & 0xf];
  let out = '০ষ';
  let started = false;
  nibbles.forEach((n, i) => {
    if (!started && n === 0 && i < 3) return;
    started = true;
    out += n < 10 ? DIGITS[n] : HEX_ALPHA[n - 10];
  });
  return out;
}

/** Akkhar-Hex digit for one nibble. */
export function akkharNibble(n: number): string {
  return n < 10 ? DIGITS[n] : HEX_ALPHA[n - 10];
}

/* ---------------------------------------------------------------- Shimu: simulator */

export interface SimulationResult {
  /** The text Shimu writes to সিমুলেটর_ফলাফল.txt. */
  report: string;
  /** Values printed by প্রদর্শন, in order. */
  outputs: { reg: number; value: number }[];
  registers: number[];
  halted: boolean;
  steps: number;
  stoppedAtLimit: boolean;
}

export function simulate(bytes: Uint8Array, maxSteps = 100_000): SimulationResult {
  const ram = new Uint8Array(MEMORY_SIZE);
  ram.set(bytes.subarray(0, MEMORY_SIZE));
  const regs = new Uint16Array(16);
  let pc = 0;
  let halted = false;
  let out = T.header + T.architect;
  const outputs: SimulationResult['outputs'] = [];

  // memory_read_word(65535) in Shimu reads one byte past the end of its RAM array (undefined
  // behaviour in C; in practice it reads 0). Match that rather than wrapping to address 0.
  const readWord = (a: number) => ram[a & 0xffff] | ((a & 0xffff) === 0xffff ? 0 : ram[(a + 1) & 0xffff] << 8);
  const writeWord = (a: number, v: number) => { ram[a & 0xffff] = v & 0xff; ram[(a + 1) & 0xffff] = (v >> 8) & 0xff; };
  const setFlag = (bit: number, on: boolean) => {
    if (on) regs[REG_FLAGS] |= 1 << bit; else regs[REG_FLAGS] &= ~(1 << bit);
  };
  const getFlag = (bit: number) => (regs[REG_FLAGS] >> bit) & 1;

  let steps = 0;
  while (!halted) {
    if (steps >= maxSteps) break;
    steps++;
    const instr = readWord(pc);
    const op = (instr >> 12) & 0xf;
    const r = (instr >> 8) & 0xf;
    const v = instr & 0xff;
    let pcUpdated = false;
    switch (op) {
      case 0x0: break;
      case 0x1: if (r !== 0) regs[r] = v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0x2: if (r !== 0) regs[r] = v; break;
      case 0x3: writeWord(v, regs[r]); break;
      case 0x4: if (r !== 0) regs[r] = regs[r] + v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0x5: if (r !== 0) regs[r] = regs[r] - v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0x6: {
        const result = regs[r] * v;
        if (r !== 0) regs[r] = result & 0xffff;
        setFlag(FLAG_ZERO, regs[r] === 0);
        setFlag(FLAG_OVERFLOW, result > 0xffff);
        break;
      }
      case 0x7:
        if (v === 0) { out += T.div0; halted = true; }
        else { if (r !== 0) regs[r] = Math.floor(regs[r] / v); setFlag(FLAG_ZERO, regs[r] === 0); }
        break;
      case 0x8: if (r !== 0) regs[r] &= v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0x9: if (r !== 0) regs[r] |= v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0xa: if (r !== 0) regs[r] ^= v; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0xb: if (r !== 0) regs[r] = ~regs[r]; setFlag(FLAG_ZERO, regs[r] === 0); break;
      case 0xc: pc = v; regs[REG_PC] = pc; pcUpdated = true; break;
      case 0xd: if (getFlag(FLAG_ZERO)) { pc = v; regs[REG_PC] = pc; pcUpdated = true; } break;
      case 0xe:
        out += `${T.outA}${bengaliInt(r)}${T.outB}${bengaliInt(regs[r])}${T.outC}${akkharHex(regs[r])})\n`;
        outputs.push({ reg: r, value: regs[r] });
        break;
      case 0xf: halted = true; out += T.halt; break;
    }
    if (!halted && !pcUpdated) { pc = (pc + 2) & 0xffff; regs[REG_PC] = pc; }
  }

  const stoppedAtLimit = !halted;
  if (stoppedAtLimit) out += `\n[ওয়েব] ${bengaliInt(maxSteps)}টি নির্দেশের পর চালানো থামানো হয়েছে; প্রোগ্রামে থামো পৌঁছায়নি।\n`;
  out += T.done;
  out += T.dump;
  for (let i = 0; i < 16; i++) {
    out += `${T.reg}${bengaliInt(i)}${T.regSep}${akkharHex(regs[i])}${T.gap}`;
    if ((i + 1) % 4 === 0) out += '\n';
  }
  out += T.rule;

  return { report: out, outputs, registers: Array.from(regs), halted, steps, stoppedAtLimit };
}
