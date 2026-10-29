/**
 * Discovery: the words people (and AI assistants) use to look for this work,
 * and plain question-and-answer text that search engines and LLMs can quote directly.
 *
 * Used by: Seo.astro (meta keywords), HomeView / PersonView / EkusheyView / ProjectLayout (schema.org),
 * AboutView (visible FAQ + FAQPage schema), and /llms.txt + /llms-full.txt.
 *
 * Why "Bangla" as well as "Bengali": most people in Bangladesh search with "Bangla"
 * (Bangla computer, Bangla CPU, Bangla programming language). The site's prose says
 * "Bengali", so the synonyms are carried here and in the summaries.
 *
 * Bengali text is a draft by Claude for review by Rahat Hasan.
 */
import type { Bi, ProjectSlug } from './lab';

/** Site-wide phrases. Kept short: these describe the lab, not every page. */
export const siteKeywords = [
  'Akkhar Labs',
  'অক্ষর ল্যাবস',
  'Bangladeshi research lab',
  'research lab in Bangladesh',
  'Bangla computing',
  'Bengali computing',
  'Bangla computer',
  'Bangla CPU',
  'Bengali CPU',
  'Bangla instruction set',
  'Bangla programming language',
  'Bengali programming language',
  'Bangla assembly language',
  'Project Ekushey',
  'Nirdeshika-16',
  'AI infrastructure research',
  'AI researcher Bangladesh',
  'Rahat Hasan',
  'বাংলা কম্পিউটার',
  'বাংলা সিপিইউ',
  'বাংলা প্রোগ্রামিং ভাষা',
  'বাংলাদেশি গবেষণাগার',
];

/** Extra search phrases per project, merged into each project page's schema and meta keywords. */
export const projectKeywords: Record<ProjectSlug, string[]> = {
  'nirdeshika-16': ['Bangla CPU', 'Bengali CPU', 'Bangla processor', 'Bangla instruction set architecture', 'Bengali ISA', '16-bit ISA', 'বাংলা সিপিইউ', 'বাংলা প্রসেসর'],
  boyon: ['Bangla assembler', 'Bengali assembly language', 'Bangla assembly language', 'বাংলা অ্যাসেম্বলি'],
  shimu: ['Bangla CPU simulator', 'Bengali virtual CPU', 'Bangla computer emulator', 'বাংলা সিমুলেটর'],
  'nirdeshika-sdk': ['Bangla programming toolchain', 'Bengali SDK', 'run Bangla programs', 'বাংলা প্রোগ্রাম'],
  'akkhar-hex': ['Bangla hexadecimal', 'Bengali number system', 'Bangla numerals in computing', 'বাংলা ষোড়শিক'],
  zrcp: ['AI agent context protocol', 'LLM token reduction', 'agentic coding', 'AI infrastructure'],
  hashedcontext: ['KV-cache efficiency', 'LLM inference', 'AI coding agents', 'GPU memory', 'AI infrastructure'],
};

/** One-paragraph descriptions written to be quoted. Factual, no superlatives. */
export const summaries = {
  lab: {
    en: 'Akkhar Labs (অক্ষর ল্যাবস) is an independent Bangladeshi research lab in Bogura, Bangladesh, founded by Rahat Hasan. It works in two areas: Bangla (Bengali) native computing, through Project Ekushey, a computing stack designed in Bangla from the processor instruction set up; and efficient AI infrastructure, through methods that reduce the tokens, GPU memory and serving cost of AI coding agents.',
    bn: 'অক্ষর ল্যাবস বগুড়ার একটি স্বাধীন বাংলাদেশি গবেষণাগার, যার প্রতিষ্ঠাতা রাহাত হাসান। এটি দুটি ক্ষেত্রে কাজ করে: বাংলা-ভিত্তিক কম্পিউটিং, অর্থাৎ প্রকল্প একুশে, যা প্রসেসরের নির্দেশনা-সেট থেকে শুরু করে বাংলায় নকশা করা একটি কম্পিউটিং স্ট্যাক; এবং দক্ষ এআই অবকাঠামো, অর্থাৎ এমন পদ্ধতি যা এআই কোডিং এজেন্টের টোকেন, জিপিইউ মেমরি ও সার্ভিং খরচ কমায়।',
  } satisfies Bi,
  person: {
    // "young" is the founder's own description of himself; remove it here if he prefers not to use it.
    en: 'Rahat Hasan (রাহাত হাসান) is a young Bangladeshi AI and computer-systems researcher from Bogura, Bangladesh, and the founder of Akkhar Labs. He designed Nirdeshika-16, a 16-bit CPU instruction set written in Bangla; wrote its Boyon assembler, Shimu simulator and Nirdeshika SDK; and is the author of two AI infrastructure papers, the Zero-Redundancy Context Protocol (ZRCP) and HashedContext.',
    bn: 'রাহাত হাসান বগুড়ার একজন তরুণ বাংলাদেশি এআই ও কম্পিউটার-সিস্টেম গবেষক এবং অক্ষর ল্যাবসের প্রতিষ্ঠাতা। তিনি বাংলায় লেখা ১৬-বিট সিপিইউ নির্দেশনা-সেট নির্দেশিকা-১৬-এর নকশা করেছেন; এর বয়ন অ্যাসেম্বলার, শিমু সিমুলেটর ও নির্দেশিকা এসডিকে লিখেছেন; এবং দুটি এআই অবকাঠামো গবেষণাপত্রের প্রণেতা: জিরো-রিডানডেন্সি কনটেক্সট প্রোটোকল (ZRCP) ও HashedContext।',
  } satisfies Bi,
  ekushey: {
    en: 'Project Ekushey is a Bangla computer built in layers, designed in Bengali rather than translated from English. Built and public today: the Nirdeshika-16 instruction set (a Bangla CPU architecture), the Boyon assembler, the Shimu simulator, the Nirdeshika SDK and the Akkhar-Hex number system. In design: Kotha, a Bangla programming language; Matrika OS; the BAPS kernel; the AKFS file system; and the Akkhar-Lipi character encodings.',
    bn: 'প্রকল্প একুশে স্তরে স্তরে গড়া একটি বাংলা কম্পিউটার, যা ইংরেজি থেকে অনুবাদ নয়, বাংলাতেই নকশা করা। এখন তৈরি ও উন্মুক্ত: নির্দেশিকা-১৬ নির্দেশনা-সেট (একটি বাংলা সিপিইউ স্থাপত্য), বয়ন অ্যাসেম্বলার, শিমু সিমুলেটর, নির্দেশিকা এসডিকে ও অক্ষর-হেক্স সংখ্যা পদ্ধতি। নকশা পর্যায়ে: কথা, একটি বাংলা প্রোগ্রামিং ভাষা; মাতৃকা ওএস; বিএপিএস কার্নেল; একেএফএস ফাইল সিস্টেম; এবং অক্ষর-লিপি অক্ষর এনকোডিং।',
  } satisfies Bi,
};

/** What the lab knows about, for schema.org knowsAbout. */
export const labTopics = [
  'Bangla (Bengali) native computing',
  'Instruction set architecture',
  'Bangla CPU design',
  'Bangla programming languages',
  'Assemblers',
  'CPU simulation',
  'Character encoding for Bengali',
  'LLM inference',
  'KV-cache',
  'Context management for AI agents',
  'AI infrastructure',
];

export const personTopics = [
  'Artificial intelligence infrastructure',
  'LLM inference efficiency',
  'AI coding agents',
  'Computer architecture',
  'Instruction set design',
  'Bangla computing',
  'Systems programming in C',
];

/** Questions people actually ask. Shown on /about/ and published as FAQPage schema. */
export const faq: { q: Bi; a: Bi }[] = [
  {
    q: { en: 'What is Akkhar Labs?', bn: 'অক্ষর ল্যাবস কী?' },
    a: summaries.lab,
  },
  {
    q: { en: 'Who founded Akkhar Labs?', bn: 'অক্ষর ল্যাবস কে প্রতিষ্ঠা করেছেন?' },
    a: summaries.person,
  },
  {
    q: { en: 'Is there a Bangla CPU?', bn: 'বাংলা সিপিইউ কি আছে?' },
    a: {
      en: 'Yes, as an architecture. Nirdeshika-16 is a 16-bit CPU instruction set architecture whose instructions, registers and numbers are written in Bangla: 16 instructions, 19 registers and 65,536 memory addresses. Its specification, version 1.0.0, was published by Akkhar Labs in October 2026. Programs written for it run today on Shimu, a software simulator, and in the browser playground on akkharlabs.com.',
      bn: 'হ্যাঁ, স্থাপত্য হিসেবে। নির্দেশিকা-১৬ একটি ১৬-বিট সিপিইউ নির্দেশনা-সেট স্থাপত্য, যার নির্দেশ, সাময়িক ও সংখ্যা বাংলায় লেখা: ১৬টি নির্দেশ, ১৯টি সাময়িক ও ৬৫,৫৩৬টি স্মৃতি-ঠিকানা। এর বিবরণী, সংস্করণ ১.০.০, অক্ষর ল্যাবস ২০২৬ সালের অক্টোবরে প্রকাশ করেছে। এর জন্য লেখা প্রোগ্রাম আজ শিমু সফটওয়্যার সিমুলেটরে এবং akkharlabs.com-এর ব্রাউজার খেলাঘরে চলে।',
    },
  },
  {
    q: { en: 'Is there a Bangla programming language?', bn: 'বাংলা প্রোগ্রামিং ভাষা কি আছে?' },
    a: {
      en: 'Akkhar Labs has a working Bangla assembly language today: programs are written in Bengali in .বয়ন files, assembled by Boyon and run on Shimu, or with one command through the Nirdeshika SDK. A high-level Bangla programming language, Kotha (কথা), in which programs are written as Bengali sentences and compiled to Nirdeshika machine code, is in language design and compiler research.',
      bn: 'অক্ষর ল্যাবসের একটি কার্যকর বাংলা অ্যাসেম্বলি ভাষা আজই আছে: প্রোগ্রাম .বয়ন ফাইলে বাংলায় লেখা হয়, বয়ন দিয়ে অ্যাসেম্বল করে শিমুতে চালানো হয়, অথবা নির্দেশিকা এসডিকে দিয়ে একটি কমান্ডেই। একটি উচ্চস্তরের বাংলা প্রোগ্রামিং ভাষা, কথা, যেখানে প্রোগ্রাম বাংলা বাক্যে লেখা হবে এবং নির্দেশিকা মেশিন কোডে কম্পাইল হবে, এখন ভাষার নকশা ও কম্পাইলার গবেষণা পর্যায়ে।',
    },
  },
  {
    q: { en: 'What is Project Ekushey, the Bangla computer?', bn: 'প্রকল্প একুশে, অর্থাৎ বাংলা কম্পিউটার, কী?' },
    a: summaries.ekushey,
  },
  {
    q: { en: 'What AI research does Akkhar Labs do?', bn: 'অক্ষর ল্যাবস কোন এআই গবেষণা করে?' },
    a: {
      en: 'Akkhar Labs studies the cost of running AI coding agents. The Zero-Redundancy Context Protocol (ZRCP, 2026) stops agents from resending unchanged files to a language model. HashedContext (2026) keeps one live copy of each file in the prompt and replaces older copies with 35-token hash stubs; on DeepSeek V4 it cut prompt tokens by 57.7–67.2%. Both are open access on Zenodo with DOIs and have not yet been peer-reviewed.',
      bn: 'অক্ষর ল্যাবস এআই কোডিং এজেন্ট চালানোর খরচ নিয়ে গবেষণা করে। জিরো-রিডানডেন্সি কনটেক্সট প্রোটোকল (ZRCP, ২০২৬) এজেন্টকে ভাষা মডেলের কাছে অপরিবর্তিত ফাইল বারবার পাঠানো থেকে বিরত রাখে। HashedContext (২০২৬) প্রম্পটে প্রতিটি ফাইলের একটি সক্রিয় কপি রাখে এবং পুরোনো কপিগুলোকে ৩৫ টোকেনের হ্যাশ-স্টাব দিয়ে বদলে দেয়; ডিপসিক ভি৪-এ এটি প্রম্পট টোকেন ৫৭.৭–৬৭.২% কমিয়েছে। দুটিই ডিওআইসহ জেনোডোতে সবার জন্য উন্মুক্ত, এখনো পিয়ার-রিভিউ হয়নি।',
    },
  },
  {
    q: { en: 'Can I try a Bangla program?', bn: 'আমি কি একটি বাংলা প্রোগ্রাম চালিয়ে দেখতে পারি?' },
    a: {
      en: 'Yes. The Nirdeshika-16 playground at akkharlabs.com/projects/nirdeshika-16/playground/ assembles and runs Bengali assembly in the browser. To run programs on your own computer, install the Nirdeshika SDK from the Akkhar Labs APT repository and run nirdeshika --compute program.বয়ন. The source code is on GitHub at github.com/akkhar-labs.',
      bn: 'হ্যাঁ। akkharlabs.com/bn/projects/nirdeshika-16/playground/ ঠিকানার নির্দেশিকা-১৬ খেলাঘর ব্রাউজারেই বাংলা অ্যাসেম্বলি অ্যাসেম্বল করে চালায়। নিজের কম্পিউটারে চালাতে অক্ষর ল্যাবসের এপিটি রিপোজিটরি থেকে নির্দেশিকা এসডিকে ইনস্টল করে nirdeshika --compute program.বয়ন চালান। সোর্স কোড গিটহাবে: github.com/akkhar-labs।',
    },
  },
];
