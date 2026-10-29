/**
 * Verified facts about Akkhar Labs' research, in English and Bengali.
 * Every value here is traceable to a public source (GitHub repository, Zenodo record, or the PDF itself).
 * Bengali text is a draft by Claude for review by Rahat Hasan.
 */
import type { Lang } from '../i18n/ui';

export type Bi = { en: string; bn: string };
export const tr = (lang: Lang, b: Bi) => b[lang];

/* ------------------------------------------------------------------ people */

export const rahat = {
  slug: 'rahat-hasan',
  name: { en: 'Rahat Hasan', bn: 'রাহাত হাসান' },
  role: { en: 'Founder and systems architect', bn: 'প্রতিষ্ঠাতা ও সিস্টেম স্থপতি' },
  orcid: '0009-0003-6184-5269',
  github: 'https://github.com/rahatarch',
};

/* ------------------------------------------------------------------ research areas */

export type AreaSlug = 'bengali-native-computing' | 'efficient-ai-infrastructure';
export const areas: Record<AreaSlug, { title: Bi; short: Bi; summary: Bi }> = {
  'bengali-native-computing': {
    title: { en: 'Bengali-native computing', bn: 'বাংলা-ভিত্তিক কম্পিউটিং' },
    short: { en: 'Project Ekushey', bn: 'প্রকল্প একুশে' },
    summary: {
      en: 'A computing stack designed in Bengali from the instruction set up: a 16-bit processor architecture, its assembler, simulator and toolchain, with an operating system, kernel, file system and programming language planned above them.',
      bn: 'নির্দেশনা-সেট থেকে শুরু করে বাংলায় নকশা করা একটি কম্পিউটিং স্ট্যাক: একটি ১৬-বিট প্রসেসর স্থাপত্য, এর অ্যাসেম্বলার, সিমুলেটর ও টুলচেইন, আর এর ওপরে পরিকল্পিত অপারেটিং সিস্টেম, কার্নেল, ফাইল সিস্টেম ও প্রোগ্রামিং ভাষা।',
    },
  },
  'efficient-ai-infrastructure': {
    title: { en: 'Efficient AI infrastructure', bn: 'দক্ষ এআই অবকাঠামো' },
    short: { en: 'Context and inference', bn: 'কনটেক্সট ও ইনফারেন্স' },
    summary: {
      en: 'Methods that stop AI coding agents from resending unchanged files on every turn, reducing prompt tokens, GPU key-value cache use and serving cost without changing the model.',
      bn: 'এমন পদ্ধতি, যা এআই কোডিং এজেন্টকে প্রতিটি ধাপে অপরিবর্তিত ফাইল বারবার পাঠানো থেকে বিরত রাখে; মডেল না বদলেই প্রম্পট টোকেন, জিপিইউ কি-ভ্যালু ক্যাশ ও সার্ভিং খরচ কমায়।',
    },
  },
};

/* ------------------------------------------------------------------ projects */

export type ProjectSlug = 'nirdeshika-16' | 'boyon' | 'shimu' | 'nirdeshika-sdk' | 'akkhar-hex' | 'zrcp' | 'hashedcontext';

export interface Project {
  slug: ProjectSlug;
  area: AreaSlug;
  name: Bi;
  kind: Bi;
  summary: Bi;
  status: Bi;
  repo?: string;
  license?: string;
  language?: string;
}

export const projects: Project[] = [
  {
    slug: 'nirdeshika-16', area: 'bengali-native-computing',
    name: { en: 'Nirdeshika-16', bn: 'নির্দেশিকা-১৬' },
    kind: { en: 'Instruction set architecture', bn: 'নির্দেশনা-সেট স্থাপত্য' },
    summary: {
      en: 'A 16-bit load–store instruction set whose instructions, registers and numbers are written in Bengali.',
      bn: 'একটি ১৬-বিট আদান-প্রদান ভিত্তিক নির্দেশনা-সেট, যার নির্দেশ, সাময়িক ও সংখ্যা বাংলায় লেখা।',
    },
    status: { en: 'Specification complete, version 1.0.0', bn: 'বিবরণী সম্পূর্ণ, সংস্করণ ১.০.০' },
    repo: 'https://github.com/akkhar-labs/Nirdeshika-16', license: 'CC BY-NC 4.0', language: 'Bengali',
  },
  {
    slug: 'boyon', area: 'bengali-native-computing',
    name: { en: 'Boyon', bn: 'বয়ন' },
    kind: { en: 'Assembler', bn: 'অ্যাসেম্বলার' },
    summary: {
      en: 'A two-pass assembler that turns Bengali assembly in .বয়ন files into Nirdeshika-16 machine code in .ব files.',
      bn: 'দুই ধাপের একটি অ্যাসেম্বলার, যা .বয়ন ফাইলের বাংলা অ্যাসেম্বলিকে .ব ফাইলের নির্দেশিকা-১৬ মেশিন কোডে রূপান্তর করে।',
    },
    status: { en: 'Working', bn: 'কার্যকর' },
    repo: 'https://github.com/akkhar-labs/Boyon', license: 'GPL-3.0', language: 'C',
  },
  {
    slug: 'shimu', area: 'bengali-native-computing',
    name: { en: 'Shimu', bn: 'শিমু' },
    kind: { en: 'Simulator', bn: 'সিমুলেটর' },
    summary: {
      en: 'A virtual CPU that loads .ব binaries into 64 KB of memory, runs them instruction by instruction and reports every result in Bengali.',
      bn: 'একটি ভার্চুয়াল সিপিইউ, যা .ব বাইনারি ৬৪ কিলোবাইট মেমরিতে লোড করে, একটির পর একটি নির্দেশ চালায় এবং প্রতিটি ফলাফল বাংলায় জানায়।',
    },
    status: { en: 'Working', bn: 'কার্যকর' },
    repo: 'https://github.com/akkhar-labs/Shimu', license: 'GPL-3.0', language: 'C',
  },
  {
    slug: 'nirdeshika-sdk', area: 'bengali-native-computing',
    name: { en: 'Nirdeshika SDK', bn: 'নির্দেশিকা এসডিকে' },
    kind: { en: 'Toolchain', bn: 'টুলচেইন' },
    summary: {
      en: 'One command, nirdeshika --compute, that assembles a Bengali program with Boyon, runs it on Shimu and opens the result.',
      bn: 'একটি মাত্র কমান্ড, nirdeshika --compute, যা বয়ন দিয়ে বাংলা প্রোগ্রাম অ্যাসেম্বল করে, শিমুতে চালায় এবং ফলাফল খুলে দেয়।',
    },
    status: { en: 'Released, version 1.0.0', bn: 'প্রকাশিত, সংস্করণ ১.০.০' },
    repo: 'https://github.com/akkhar-labs/nirdeshika-sdk', language: 'C',
  },
  {
    slug: 'akkhar-hex', area: 'bengali-native-computing',
    name: { en: 'Akkhar-Hex', bn: 'অক্ষর-হেক্স' },
    kind: { en: 'Number system', bn: 'সংখ্যা পদ্ধতি' },
    summary: {
      en: 'Hexadecimal written with Bengali digits ০–৯ and the consonants ক–চ for ten to fifteen, with Bengali prefixes for hexadecimal and binary.',
      bn: 'বাংলা অঙ্ক ০–৯ এবং দশ থেকে পনেরোর জন্য ক–চ ব্যঞ্জনবর্ণ দিয়ে লেখা ষোড়শিক পদ্ধতি; ষোড়শিক ও বাইনারির জন্য বাংলা উপসর্গসহ।',
    },
    status: { en: 'Defined and in use in Boyon and Shimu', bn: 'সংজ্ঞায়িত; বয়ন ও শিমুতে ব্যবহৃত' },
  },
  {
    slug: 'zrcp', area: 'efficient-ai-infrastructure',
    name: { en: 'ZRCP', bn: 'ZRCP' },
    kind: { en: 'Protocol', bn: 'প্রোটোকল' },
    summary: {
      en: 'Zero-Redundancy Context Protocol: four mechanisms that stop agentic coding tools from retransmitting unchanged files to a language model.',
      bn: 'জিরো-রিডানডেন্সি কনটেক্সট প্রোটোকল: চারটি কৌশল, যা এজেন্টিক কোডিং টুলকে ভাষা মডেলের কাছে অপরিবর্তিত ফাইল বারবার পাঠানো থেকে বিরত রাখে।',
    },
    status: { en: 'Specification published, version 1.0.0', bn: 'বিবরণী প্রকাশিত, সংস্করণ ১.০.০' },
    repo: 'https://github.com/rahatarch/zrcp', license: 'CC BY 4.0',
  },
  {
    slug: 'hashedcontext', area: 'efficient-ai-infrastructure',
    name: { en: 'HashedContext', bn: 'HashedContext' },
    kind: { en: 'Context architecture', bn: 'কনটেক্সট স্থাপত্য' },
    summary: {
      en: 'A content-addressed context architecture that keeps one live copy of each file in the prompt and replaces older copies with 35-token hash stubs.',
      bn: 'একটি কনটেন্ট-অ্যাড্রেসড কনটেক্সট স্থাপত্য, যা প্রম্পটে প্রতিটি ফাইলের একটি মাত্র সক্রিয় কপি রাখে এবং পুরোনো কপিগুলোকে ৩৫ টোকেনের হ্যাশ-স্টাব দিয়ে বদলে দেয়।',
    },
    status: { en: 'Preprint, version 0.2', bn: 'প্রিপ্রিন্ট, সংস্করণ ০.২' },
    repo: 'https://github.com/rahatarch/hashedcontext', license: 'CC BY 4.0',
  },
];
export const project = (slug: ProjectSlug) => projects.find((p) => p.slug === slug)!;

/** Layers of the Bengali stack that are planned or in design. Statuses from the org profile and Project Ekushey READMEs. */
export const plannedLayers: { name: Bi; layer: Bi; status: Bi; text: Bi }[] = [
  {
    name: { en: 'Kotha', bn: 'কথা' }, layer: { en: 'Programming language', bn: 'প্রোগ্রামিং ভাষা' },
    status: { en: 'Language design and compiler research', bn: 'ভাষার নকশা ও কম্পাইলার গবেষণা চলছে' },
    text: { en: 'A high-level language in which programs are written as Bengali sentences and compiled to Nirdeshika machine code.', bn: 'একটি উচ্চস্তরের ভাষা, যেখানে প্রোগ্রাম বাংলা বাক্যে লেখা হবে এবং নির্দেশিকা মেশিন কোডে কম্পাইল হবে।' },
  },
  {
    name: { en: 'Matrika OS', bn: 'মাতৃকা ওএস' }, layer: { en: 'Operating system', bn: 'অপারেটিং সিস্টেম' },
    status: { en: 'Research and early architecture design', bn: 'গবেষণা ও প্রাথমিক স্থাপত্য নকশা' },
    text: { en: 'An operating system for language-native computing, built on BAPS and Nirdeshika.', bn: 'ভাষা-ভিত্তিক কম্পিউটিংয়ের জন্য একটি অপারেটিং সিস্টেম, যা বিএপিএস ও নির্দেশিকার ওপর তৈরি হবে।' },
  },
  {
    name: { en: 'BAPS', bn: 'বিএপিএস (BAPS)' }, layer: { en: 'Kernel', bn: 'কার্নেল' },
    status: { en: 'Early architecture design', bn: 'প্রাথমিক স্থাপত্য নকশা' },
    text: { en: 'A lightweight kernel layer connecting the hardware to software execution, designed for minimal overhead.', bn: 'হার্ডওয়্যার ও সফটওয়্যার নির্বাহের মধ্যে সংযোগকারী একটি হালকা কার্নেল স্তর, ন্যূনতম বাড়তি খরচের জন্য নকশা করা।' },
  },
  {
    name: { en: 'AKFS', bn: 'একেএফএস (AKFS)' }, layer: { en: 'File system', bn: 'ফাইল সিস্টেম' },
    status: { en: 'Planned', bn: 'পরিকল্পিত' },
    text: { en: 'The Akkhar File System, a file system designed in Bengali.', bn: 'অক্ষর ফাইল সিস্টেম, বাংলায় নকশা করা একটি ফাইল সিস্টেম।' },
  },
  {
    name: { en: 'Akkhar-Lipi 7/8', bn: 'অক্ষর-লিপি ৭/৮' }, layer: { en: 'Character encoding', bn: 'অক্ষর এনকোডিং' },
    status: { en: 'Planned for full implementation', bn: 'পূর্ণ বাস্তবায়ন পরিকল্পিত' },
    text: { en: 'Character encodings for Bengali text. The Nirdeshika-16 specification names Akkhar-Lipi 8 as its data-encoding standard.', bn: 'বাংলা লেখার জন্য অক্ষর এনকোডিং। নির্দেশিকা-১৬ বিবরণী অক্ষর-লিপি ৮-কে এর উপাত্ত এনকোডিং মানদণ্ড হিসেবে উল্লেখ করে।' },
  },
  {
    name: { en: 'Nirdeshika-16-EE and Nirdeshika-32/64', bn: 'নির্দেশিকা-১৬-ইই ও নির্দেশিকা-৩২/৬৪' }, layer: { en: 'Future instruction sets', bn: 'ভবিষ্যৎ নির্দেশনা-সেট' },
    status: { en: 'Planned', bn: 'পরিকল্পিত' },
    text: { en: 'An extended edition of the 16-bit instruction set, followed by 32-bit and 64-bit architectures, still entirely in Bengali.', bn: '১৬-বিট নির্দেশনা-সেটের একটি বর্ধিত সংস্করণ, এরপর ৩২-বিট ও ৬৪-বিট স্থাপত্য; সবই বাংলায়।' },
  },
];

/* ------------------------------------------------------------------ publications */

export interface Publication {
  slug: 'hashedcontext-2026' | 'zrcp-2026' | 'nirdeshika-16-specification';
  title: string;
  titleBn?: string;
  authors: { name: string; orcid?: string }[];
  date: string; // ISO date of this version
  year: number;
  type: Bi;
  peerReviewed: boolean;
  version: string;
  doi?: string;
  conceptDoi?: string;
  versions?: { version: string; date: string; doi: string }[];
  license: string;
  licenseUrl: string;
  language: 'en' | 'bn';
  pdf: { href: string; local: boolean; bytes?: number; pages?: number };
  record?: string;
  repo?: string;
  project: ProjectSlug;
  area: AreaSlug;
  keywords: string[];
  publisher: string;
}

export const publications: Publication[] = [
  {
    slug: 'hashedcontext-2026',
    title: 'Scaling GPU KV-Cache Efficiency and Inference Concurrency for Autonomous Agents with HashedContext',
    authors: [{ name: 'Rahat Hasan', orcid: '0009-0003-6184-5269' }],
    date: '2026-10-27', year: 2026,
    type: { en: 'Preprint', bn: 'প্রিপ্রিন্ট' }, peerReviewed: false,
    version: 'v0.2',
    doi: '10.5281/zenodo.23698048', conceptDoi: '10.5281/zenodo.23668957',
    versions: [
      { version: 'v0.2', date: '2026-10-27', doi: '10.5281/zenodo.23698048' },
      { version: 'v0.1', date: '2026-10-26', doi: '10.5281/zenodo.23668958' },
    ],
    license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    language: 'en',
    pdf: { href: '/papers/hashedcontext-v0.2.pdf', local: true, bytes: 500224, pages: 20 },
    record: 'https://zenodo.org/records/23698048',
    repo: 'https://github.com/rahatarch/hashedcontext',
    project: 'hashedcontext', area: 'efficient-ai-infrastructure',
    keywords: ['LLM inference', 'KV-cache', 'autonomous agents', 'content-addressed storage', 'context deduplication', 'GPU memory', 'prefix caching', 'RadixAttention'],
    publisher: 'Zenodo',
  },
  {
    slug: 'zrcp-2026',
    title: 'Zero-Redundancy Context Protocol (ZRCP): A Hash-Based Protocol for Reducing Redundant Context Transmission in Agentic Coding Systems',
    authors: [{ name: 'Rahat Hasan', orcid: '0009-0003-6184-5269' }],
    date: '2026-08-15', year: 2026,
    type: { en: 'Protocol specification', bn: 'প্রোটোকল বিবরণী' }, peerReviewed: false,
    version: '1.0.0',
    doi: '10.5281/zenodo.21955969',
    license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    language: 'en',
    pdf: { href: 'https://zenodo.org/records/21955969/files/zrcp.pdf', local: false },
    record: 'https://zenodo.org/records/21955969',
    repo: 'https://github.com/rahatarch/zrcp',
    project: 'zrcp', area: 'efficient-ai-infrastructure',
    keywords: ['protocol', 'agentic coding', 'token reduction', 'context compression', 'hash-based deduplication', 'LLM', 'AI agents'],
    publisher: 'Zenodo',
  },
  {
    slug: 'nirdeshika-16-specification',
    title: 'Nirdeshika-16 Instruction Set Architecture Specification, version 1.0.0',
    titleBn: 'নির্দেশিকা-১৬ স্থাপত্য বিবরণী, সংস্করণ ১.০.০',
    authors: [{ name: 'Rahat Hasan', orcid: '0009-0003-6184-5269' }],
    date: '2026-10-13', year: 2026,
    type: { en: 'Technical specification (in Bengali)', bn: 'কারিগরি বিবরণী (বাংলায়)' }, peerReviewed: false,
    version: '1.0.0',
    license: 'CC BY-NC 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
    language: 'bn',
    pdf: { href: '/papers/nirdeshika-16-specification-v1.0.0.pdf', local: true, bytes: 1074655, pages: 33 },
    repo: 'https://github.com/akkhar-labs/Nirdeshika-16',
    project: 'nirdeshika-16', area: 'bengali-native-computing',
    keywords: ['instruction set architecture', 'Bengali computing', '16-bit RISC', 'Akkhar-Hex', 'Nirdeshika-16'],
    publisher: 'Akkhar Labs',
  },
];
export const publication = (slug: Publication['slug']) => publications.find((p) => p.slug === slug)!;

/* ------------------------------------------------------------------ news (dated, newest first) */

export const news: { date: string; precision: 'day' | 'month'; text: Bi; href?: string }[] = [
  { date: '2026-10-27', precision: 'day', text: { en: 'HashedContext preprint version 0.2 archived on Zenodo, adding a system overview and five analytical figures.', bn: 'HashedContext প্রিপ্রিন্টের সংস্করণ ০.২ জেনোডোতে সংরক্ষিত; যুক্ত হয়েছে সিস্টেমের সারচিত্র ও পাঁচটি বিশ্লেষণী চিত্র।' }, href: '/publications/hashedcontext-2026/' },
  { date: '2026-10-26', precision: 'day', text: { en: 'HashedContext preprint version 0.1 archived on Zenodo.', bn: 'HashedContext প্রিপ্রিন্টের সংস্করণ ০.১ জেনোডোতে সংরক্ষিত।' }, href: '/publications/hashedcontext-2026/' },
  { date: '2026-10-13', precision: 'month', text: { en: 'Nirdeshika-16 specification version 1.0.0 published, and Nirdeshika SDK 1.0.0 made available from the Akkhar Labs APT repository.', bn: 'নির্দেশিকা-১৬ বিবরণীর সংস্করণ ১.০.০ প্রকাশিত, এবং অক্ষর ল্যাবসের এপিটি রিপোজিটরি থেকে নির্দেশিকা এসডিকে ১.০.০ পাওয়া যাচ্ছে।' }, href: '/projects/nirdeshika-16/' },
  { date: '2026-08-17', precision: 'month', text: { en: 'Boyon, Shimu, the Nirdeshika SDK and Project Ekushey published on GitHub.', bn: 'বয়ন, শিমু, নির্দেশিকা এসডিকে ও প্রকল্প একুশে গিটহাবে প্রকাশিত।' }, href: '/ekushey/' },
  { date: '2026-08-15', precision: 'day', text: { en: 'ZRCP specification archived on Zenodo with a DOI.', bn: 'ZRCP বিবরণী ডিওআইসহ জেনোডোতে সংরক্ষিত।' }, href: '/publications/zrcp-2026/' },
  { date: '2026-06-25', precision: 'day', text: { en: 'ZRCP version 1.0.0 released as an open specification.', bn: 'ZRCP সংস্করণ ১.০.০ উন্মুক্ত বিবরণী হিসেবে প্রকাশিত।' }, href: '/projects/zrcp/' },
];
