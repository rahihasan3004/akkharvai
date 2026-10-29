/**
 * Abstracts. English text is verbatim from each publication. Bengali text is a translation
 * drafted by Claude for review, and is labelled as a translation on the page.
 */
import type { Publication } from './lab';

export const abstracts: Record<Publication['slug'], { en: string[]; bn: string[]; enIsVerbatim: boolean }> = {
  'hashedcontext-2026': {
    enIsVerbatim: true,
    en: [
      'Autonomous agentic coding systems routinely transmit source files to Large Language Models (LLMs) across multi-turn software development workflows. In conventional architectures, unchanged files are re-read from storage and redundantly re-serialized into append-only conversation histories on every interaction step. This produces an asymptotic token growth of O(M×N×P), which severely exacerbates the GPU High-Bandwidth Memory (HBM) “memory wall” by saturating key-value (KV) cache allocations and degrading multi-tenant serving concurrency.',
      'We introduce HashedContext, a content-addressed context architecture that eliminates redundant file transmission and optimizes physical KV-cache utilization across multi-turn agent sessions. HashedContext couples four complementary mechanisms: (1) SHA-256 hash-gated file state tracking, (2) historical conversation deduplication via compact references ([HASH STUB]), (3) attention-anchored authoritative tail rebasing, and (4) on-demand historical state resolution from a local content-addressed vault, and supports a bimodal deployment topology operable either edge-natively within client editors or transparently at server-side inference gateways.',
      'Empirical evaluations on production inference endpoints (DeepSeek V4) demonstrate an immediate 57.7% to 67.2% reduction in active prompt tokens on basic 4-to-5 turn workflows, with asymptotic savings mathematically bounded to 90%–97% on extended multi-file refactoring sessions. We observe no detectable degradation in model reasoning accuracy or diff resolution fidelity. By restricting full file materialization to a single authoritative prompt tail, HashedContext transforms context accumulation from an unbounded quadratic trajectory into a bounded linear footprint. This reduction directly relieves GPU high-bandwidth memory (HBM) saturation and expands concurrent serving capacity for agent workloads.',
    ],
    bn: [
      'স্বয়ংক্রিয় এজেন্টিক কোডিং ব্যবস্থাগুলো বহু-ধাপের সফটওয়্যার উন্নয়ন প্রক্রিয়ায় নিয়মিতভাবে সোর্স ফাইল বৃহৎ ভাষা মডেলের (এলএলএম) কাছে পাঠায়। প্রচলিত স্থাপত্যে প্রতিটি ধাপে অপরিবর্তিত ফাইলও আবার পড়া হয় এবং কেবল-যোগ করা যায় এমন কথোপকথন-ইতিহাসে বারবার জুড়ে দেওয়া হয়। এতে টোকেন বাড়ে O(M×N×P) হারে, যা কি-ভ্যালু (কেভি) ক্যাশ পূর্ণ করে জিপিইউর উচ্চ-ব্যান্ডউইথ মেমরির “মেমরি দেয়াল” সমস্যা তীব্র করে এবং একসঙ্গে বহু ব্যবহারকারীকে সেবা দেওয়ার সক্ষমতা কমায়।',
      'আমরা উপস্থাপন করছি HashedContext: একটি কনটেন্ট-অ্যাড্রেসড কনটেক্সট স্থাপত্য, যা ফাইলের অপ্রয়োজনীয় পুনঃপ্রেরণ বন্ধ করে এবং বহু-ধাপের এজেন্ট সেশনে কেভি-ক্যাশের ব্যবহার উন্নত করে। এতে চারটি পরিপূরক কৌশল একসঙ্গে কাজ করে: (১) এসএইচএ-২৫৬ হ্যাশ-যাচাইকৃত ফাইল-অবস্থা অনুসরণ, (২) সংক্ষিপ্ত উল্লেখের ([HASH STUB]) মাধ্যমে কথোপকথনের ইতিহাস থেকে পুনরাবৃত্তি বাদ, (৩) মনোযোগ-নোঙর প্রামাণ্য শেষাংশ পুনর্বিন্যাস, এবং (৪) স্থানীয় কনটেন্ট-অ্যাড্রেসড ভল্ট থেকে চাহিদামতো পুরোনো অবস্থা পুনরুদ্ধার। এটি ক্লায়েন্ট এডিটরের ভেতরে প্রান্তে, অথবা সার্ভারের ইনফারেন্স গেটওয়েতে অদৃশ্যভাবে, দুই উপায়েই চালানো যায়।',
      'প্রোডাকশন ইনফারেন্স এন্ডপয়েন্টে (ডিপসিক ভি৪) পরীক্ষায় সাধারণ ৪–৫ ধাপের কাজে সক্রিয় প্রম্পট টোকেন সঙ্গে সঙ্গে ৫৭.৭% থেকে ৬৭.২% কমেছে; বহু-ফাইলের দীর্ঘ রিফ্যাক্টরিং সেশনে গাণিতিকভাবে সাশ্রয়ের সীমা ৯০%–৯৭%। মডেলের যুক্তির নির্ভুলতা বা পরিবর্তন-শনাক্তকরণে কোনো অবনতি দেখা যায়নি। পূর্ণ ফাইলকে প্রম্পটের একটি মাত্র প্রামাণ্য শেষাংশে সীমিত রেখে HashedContext কনটেক্সটের সীমাহীন দ্বিঘাত বৃদ্ধিকে সীমাবদ্ধ রৈখিক পরিসরে নিয়ে আসে। এতে সরাসরি জিপিইউ মেমরির চাপ কমে এবং এজেন্টের কাজে একসঙ্গে সেবা দেওয়ার সক্ষমতা বাড়ে।',
    ],
  },
  'zrcp-2026': {
    enIsVerbatim: true,
    en: [
      'Agentic coding tools routinely transmit file contents to Large Language Models (LLMs) during iterative software-development workflows. In existing systems, unchanged files are frequently re-read from storage and re-transmitted across multiple prompt iterations, producing redundant token consumption and inefficient use of context-window capacity.',
      'The Zero-Redundancy Context Protocol (ZRCP) addresses this inefficiency through four complementary mechanisms: hash-gated file transmission using SHA-256 content hashing, conversation-history file deduplication, hash stub replacement of unchanged file content, and attention-anchored authoritative rebasing, which appends current file state near the end of the prompt. Together, these mechanisms reduce redundant context transmission while preserving correctness and model awareness of current project state.',
      'ZRCP provides no savings on the very first prompt (cold start), as the hash cache must be populated before stub replacement is possible. However, in long-running sessions with many turns and sparse file modifications, savings compound dramatically, approaching 85–98% reduction in file-related token usage.',
      'A reference implementation was integrated into the Sover agentic coding platform and evaluated using an end-to-end coding workflow. The evaluation indicates substantial reductions in file-related token usage relative to an estimated baseline derived from source-code audits of representative open-source systems. The protocol operates without additional LLM API calls and is independent of specific model providers.',
      'ZRCP represents a content-addressed approach to context management for agentic coding systems and provides a foundation for further research into token-efficient prompt architectures.',
    ],
    bn: [
      'এজেন্টিক কোডিং টুল পুনরাবৃত্ত সফটওয়্যার উন্নয়ন প্রক্রিয়ায় নিয়মিতভাবে ফাইলের বিষয়বস্তু বৃহৎ ভাষা মডেলের (এলএলএম) কাছে পাঠায়। বিদ্যমান ব্যবস্থায় অপরিবর্তিত ফাইলও প্রায়ই আবার পড়া হয় এবং একাধিক প্রম্পটে বারবার পাঠানো হয়; এতে অপ্রয়োজনীয় টোকেন খরচ হয় এবং কনটেক্সট উইন্ডোর অদক্ষ ব্যবহার ঘটে।',
      'জিরো-রিডানডেন্সি কনটেক্সট প্রোটোকল (ZRCP) চারটি পরিপূরক কৌশলের মাধ্যমে এই অদক্ষতা দূর করে: এসএইচএ-২৫৬ কনটেন্ট হ্যাশ দিয়ে হ্যাশ-যাচাইকৃত ফাইল প্রেরণ, কথোপকথনের ইতিহাস থেকে ফাইলের পুনরাবৃত্তি বাদ, অপরিবর্তিত বিষয়বস্তুর জায়গায় হ্যাশ-স্টাব, এবং মনোযোগ-নোঙর প্রামাণ্য পুনর্বিন্যাস, যা ফাইলের বর্তমান অবস্থা প্রম্পটের শেষের দিকে যুক্ত করে। একসঙ্গে এরা নির্ভুলতা ও প্রকল্পের বর্তমান অবস্থা সম্পর্কে মডেলের সচেতনতা বজায় রেখে অপ্রয়োজনীয় কনটেক্সট প্রেরণ কমায়।',
      'প্রথম প্রম্পটে (শীতল সূচনা) ZRCP কোনো সাশ্রয় দেয় না, কারণ স্টাব ব্যবহারের আগে হ্যাশ-ক্যাশ পূর্ণ হতে হয়। তবে বহু ধাপের, অল্প পরিবর্তনের দীর্ঘ সেশনে সাশ্রয় দ্রুত বাড়ে এবং ফাইল-সংশ্লিষ্ট টোকেন ব্যবহারে ৮৫–৯৮% হ্রাসের কাছাকাছি পৌঁছায়।',
      'Sover এজেন্টিক কোডিং প্ল্যাটফর্মে একটি রেফারেন্স বাস্তবায়ন যুক্ত করে পূর্ণাঙ্গ কোডিং কাজের মাধ্যমে মূল্যায়ন করা হয়েছে। প্রতিনিধিত্বশীল ওপেন-সোর্স ব্যবস্থার সোর্স কোড নিরীক্ষা থেকে অনুমিত ভিত্তির তুলনায় ফাইল-সংশ্লিষ্ট টোকেন ব্যবহারে উল্লেখযোগ্য হ্রাস দেখা গেছে। প্রোটোকলটির জন্য বাড়তি কোনো এলএলএম এপিআই কল লাগে না এবং এটি নির্দিষ্ট কোনো মডেল-সরবরাহকারীর ওপর নির্ভরশীল নয়।',
      'ZRCP এজেন্টিক কোডিং ব্যবস্থায় কনটেক্সট ব্যবস্থাপনার একটি কনটেন্ট-অ্যাড্রেসড পদ্ধতি এবং টোকেন-সাশ্রয়ী প্রম্পট স্থাপত্য নিয়ে ভবিষ্যৎ গবেষণার ভিত্তি।',
    ],
  },
  'nirdeshika-16-specification': {
    enIsVerbatim: false,
    en: [
      'The authoritative specification of the Nirdeshika-16 instruction set architecture, written in Bengali. It defines the 16-bit load–store design, number notation (০ব binary, ০ষ hexadecimal) and right-to-left bit numbering; the Akkhar-Lipi 8 data encoding; the nineteen registers and their conventional roles; the 4-4-8 instruction format and the three instruction kinds; each of the sixteen instructions with bit layout, syntax, example, binary form, pseudocode and timing; and four addressing modes, one reserved for a future version.',
      'It also introduces Bengali technical terms for core computing concepts, such as সাময়িক for register, স্মৃতি for memory, সড়ক for bus and বিন্যাসক for assembler.',
    ],
    bn: [
      'নির্দেশিকা-১৬ নির্দেশনা-সেট স্থাপত্যের প্রামাণ্য বিবরণী, বাংলায় লেখা। এতে সংজ্ঞায়িত হয়েছে ১৬-বিট আদান-প্রদান ভিত্তিক নকশা, সংখ্যা লেখার রীতি (বাইনারির জন্য ০ব, ষোড়শিকের জন্য ০ষ) ও ডান থেকে বাঁয়ে বিট গণনা; অক্ষর-লিপি ৮ উপাত্ত এনকোডিং; উনিশটি সাময়িক ও তাদের প্রথাগত ভূমিকা; ৪-৪-৮ নির্দেশ-বিন্যাস ও তিন ধরনের নির্দেশ; ষোলোটি নির্দেশের প্রতিটির বিট-বিন্যাস, ব্যবহারের রীতি, উদাহরণ, বাইনারি রূপ, ছদ্মকোড ও কার্যকাল; এবং চারটি ঠিকানা পদ্ধতি, যার একটি ভবিষ্যৎ সংস্করণের জন্য সংরক্ষিত।',
      'এতে মৌলিক কম্পিউটিং ধারণার জন্য নতুন বাংলা পরিভাষাও প্রস্তাব করা হয়েছে, যেমন রেজিস্টারের জন্য সাময়িক, মেমরির জন্য স্মৃতি, বাসের জন্য সড়ক এবং অ্যাসেম্বলারের জন্য বিন্যাসক।',
    ],
  },
};
