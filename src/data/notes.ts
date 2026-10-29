/**
 * Lab notes. Both are drafts adapted from Rahat Hasan's own writing in the Project Ekushey,
 * Nirdeshika-16 and Boyon READMEs and the Nirdeshika-16 specification. They carry a visible
 * "draft for review" label until he approves them (set draft: false).
 */
import type { Bi } from './lab';

export interface Note {
  slug: string;
  date: string;
  draft: boolean;
  title: Bi;
  summary: Bi;
  body: { en: string[]; bn: string[] };
  sources: { label: string; href: string }[];
}

export const notes: Note[] = [
  {
    slug: 'not-a-translation-layer',
    date: '2026-10-29',
    draft: true,
    title: { en: 'Not a translation layer', bn: 'অনুবাদের স্তর নয়' },
    summary: {
      en: 'Why Bengali computing at Akkhar Labs starts at the instruction set rather than at the programming language.',
      bn: 'অক্ষর ল্যাবসে বাংলা কম্পিউটিং কেন প্রোগ্রামিং ভাষা থেকে নয়, নির্দেশনা-সেট থেকে শুরু।',
    },
    body: {
      en: [
        'The obvious way to make a Bengali programming language is to take an existing language and translate its keywords. If becomes যদি, while becomes যতক্ষণ, print becomes দেখাও. It works for a while. Then a program fails, and the error message is in English. The numbers the machine prints are written with Latin letters. The tools that build the program, the assembler underneath them and the instruction set underneath that all assume English. The Bengali is a coat of paint.',
        'Project Ekushey began with exactly that plan, and with the feeling that it was wrong. A Bengali language deserved more than a translation layer. So instead of starting at the top, the work started at the bottom: below the compiler, below the assembler, at the instruction set, the level where a machine first gives names to what it can do.',
        'Nirdeshika-16 is the result. Its sixteen instructions have Bengali names: আদান to load, প্রদান to store, সংযোজন to add, প্রস্থান to jump, থামো to halt. Its registers are সাময়িক, its memory is স্মৃতি, its bus is সড়ক. Its hexadecimal digits after nine are ক খ গ ঘ ঙ চ. None of this is a rename of an English original; each name was chosen when the architecture was designed.',
        'Starting at the bottom is slower. A Bengali programmer cannot yet write a web application in Kotha, because Kotha is still being designed. But everything that has been built is Bengali all the way down. When Shimu runs a program, it reports the result as ৪০, not 40, and its register dump reads ০ষ২৮, not 0x28. Nothing underneath asks for English.',
        'The aim is not to make English computing accessible to Bengali speakers. It is to make Bengali computing exist.',
      ],
      bn: [
        'বাংলা প্রোগ্রামিং ভাষা বানানোর সহজ পথ হলো একটি প্রচলিত ভাষা নিয়ে তার শব্দগুলো অনুবাদ করা। if হয়ে যায় যদি, while হয় যতক্ষণ, print হয় দেখাও। কিছুদিন কাজ চলে। তারপর একটি প্রোগ্রাম ব্যর্থ হয়, আর ত্রুটিবার্তা আসে ইংরেজিতে। যন্ত্র যে সংখ্যা দেখায়, তা লাতিন অক্ষরে লেখা। যে টুল প্রোগ্রামটি তৈরি করে, তার নিচের অ্যাসেম্বলার, তারও নিচের নির্দেশনা-সেট, সবই ইংরেজি ধরে নেয়। বাংলাটুকু কেবল ওপরের রঙ।',
        'প্রকল্প একুশে শুরু হয়েছিল ঠিক এই পরিকল্পনা নিয়েই, আর এই অনুভূতি নিয়ে যে এটি ঠিক নয়। একটি বাংলা ভাষা অনুবাদের স্তরের চেয়ে বেশি কিছুর দাবিদার। তাই কাজ ওপর থেকে নয়, শুরু হলো নিচ থেকে: কম্পাইলারের নিচে, অ্যাসেম্বলারের নিচে, নির্দেশনা-সেটে, যেখানে একটি যন্ত্র প্রথম তার সামর্থ্যের নাম দেয়।',
        'তার ফল নির্দেশিকা-১৬। এর ষোলোটি নির্দেশের নাম বাংলায়: আনার জন্য আদান, রাখার জন্য প্রদান, যোগের জন্য সংযোজন, লাফের জন্য প্রস্থান, থামার জন্য থামো। এর রেজিস্টার হলো সাময়িক, মেমরি স্মৃতি, বাস সড়ক। নয়ের পরের ষোড়শিক অঙ্ক ক খ গ ঘ ঙ চ। এর কোনোটিই ইংরেজি মূলের নাম বদল নয়; স্থাপত্য নকশার সময়েই প্রতিটি নাম বেছে নেওয়া হয়েছে।',
        'নিচ থেকে শুরু করা ধীর। একজন বাংলা প্রোগ্রামার এখনো কথা ভাষায় ওয়েব অ্যাপ্লিকেশন লিখতে পারেন না, কারণ কথা এখনো নকশা পর্যায়ে। কিন্তু যা তৈরি হয়েছে, তা আগাগোড়া বাংলা। শিমু যখন প্রোগ্রাম চালায়, ফলাফল দেখায় ৪০, 40 নয়; আর সাময়িকের অবস্থায় লেখা থাকে ০ষ২৮, 0x28 নয়। নিচের কোনো স্তর ইংরেজি চায় না।',
        'লক্ষ্য ইংরেজি কম্পিউটিংকে বাংলাভাষীদের নাগালে আনা নয়। লক্ষ্য বাংলা কম্পিউটিংকে অস্তিত্বে আনা।',
      ],
    },
    sources: [
      { label: 'Project Ekushey README', href: 'https://github.com/akkhar-labs/project-ekushey' },
      { label: 'Nirdeshika-16 specification 1.0.0', href: 'https://github.com/akkhar-labs/Nirdeshika-16' },
    ],
  },
  {
    slug: 'counting-in-akkhar-hex',
    date: '2026-10-29',
    draft: true,
    title: { en: 'Counting past nine: the design of Akkhar-Hex', bn: 'নয়ের পরে গোনা: অক্ষর-হেক্সের নকশা' },
    summary: {
      en: 'Hexadecimal needs sixteen digits. Bengali has ten. How Nirdeshika-16 writes the other six, and the prefixes it uses for binary and hexadecimal.',
      bn: 'ষোড়শিকের জন্য ষোলোটি অঙ্ক লাগে, বাংলায় আছে দশটি। বাকি ছয়টি নির্দেশিকা-১৬ কীভাবে লেখে, আর বাইনারি ও ষোড়শিকের জন্য কোন উপসর্গ ব্যবহার করে।',
    },
    body: {
      en: [
        'Anyone who works close to the hardware reads hexadecimal all day. Four bits make one hex digit, so a 16-bit instruction is exactly four of them, and a memory dump is a wall of them. Conventionally the digits after nine are the Latin letters A to F. For a Bengali reader that means the most technical part of computing is also the most English.',
        'Bengali has its own digits for zero to nine: ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯. Akkhar-Hex keeps them and continues with the first six consonants of the Bengali alphabet: ক for ten, খ for eleven, গ for twelve, ঘ for thirteen, ঙ for fourteen and চ for fifteen. The order is the order every Bengali reader already knows, just as A to F follows the Latin alphabet.',
        'Numbers need a prefix so a reader and an assembler can tell bases apart. The familiar ones are 0x and 0b. Nirdeshika-16 keeps the shape, a zero followed by a letter, and takes the letter from the Bengali name of the base: ০ষ for ষোড়শিক (hexadecimal) and ০ব for বাইনারি (binary). Decimal has no prefix.',
        'In practice it reads naturally. The highest 8-bit address is ০ষচচ. A jump to address fifty is প্রস্থান ০ষ৩২. When Shimu adds fifteen and twenty-five, it reports ৪০ and, beside it, ০ষ২৮. The binary form of the instruction that places ten in register one is ০ব০০০১০০০১০০০০১০১০.',
        'A small design choice, but it removes the last place where a Bengali programmer working at the lowest level had to switch alphabets.',
      ],
      bn: [
        'হার্ডওয়্যারের কাছাকাছি যাঁরা কাজ করেন, তাঁরা সারাদিন ষোড়শিক সংখ্যা পড়েন। চার বিটে একটি ষোড়শিক অঙ্ক, তাই একটি ১৬-বিট নির্দেশ ঠিক চারটি অঙ্ক, আর মেমরির অবস্থা যেন অঙ্কের একটি দেয়াল। প্রচলিত রীতিতে নয়ের পরের অঙ্কগুলো লাতিন A থেকে F। বাংলা পাঠকের কাছে এর অর্থ, কম্পিউটিংয়ের সবচেয়ে কারিগরি অংশটিই সবচেয়ে বেশি ইংরেজি।',
        'শূন্য থেকে নয় পর্যন্ত বাংলার নিজস্ব অঙ্ক আছে: ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯। অক্ষর-হেক্স এগুলো রেখে বাংলা বর্ণমালার প্রথম ছয়টি ব্যঞ্জনবর্ণ দিয়ে এগোয়: দশের জন্য ক, এগারোর জন্য খ, বারোর জন্য গ, তেরোর জন্য ঘ, চৌদ্দর জন্য ঙ আর পনেরোর জন্য চ। ক্রমটি সেই ক্রমই, যা প্রতিটি বাংলা পাঠক আগে থেকেই জানেন, যেমন A থেকে F লাতিন বর্ণমালা অনুসরণ করে।',
        'পাঠক ও অ্যাসেম্বলার যাতে ভিত্তি আলাদা করে চিনতে পারে, সেজন্য সংখ্যার উপসর্গ দরকার। পরিচিত উপসর্গ 0x ও 0b। নির্দেশিকা-১৬ একই গড়ন রাখে, একটি শূন্য তারপর একটি বর্ণ, আর বর্ণটি নেয় ভিত্তির বাংলা নাম থেকে: ষোড়শিকের জন্য ০ষ, বাইনারির জন্য ০ব। দশমিকের কোনো উপসর্গ নেই।',
        'বাস্তবে পড়তে স্বাভাবিক লাগে। সর্বোচ্চ ৮-বিট ঠিকানা ০ষচচ। পঞ্চাশ নম্বর ঠিকানায় লাফ প্রস্থান ০ষ৩২। শিমু পনেরো আর পঁচিশ যোগ করলে দেখায় ৪০, পাশে ০ষ২৮। সাময়িক-১ এ দশ রাখার নির্দেশের বাইনারি রূপ ০ব০০০১০০০১০০০০১০১০।',
        'ছোট একটি নকশাগত সিদ্ধান্ত, কিন্তু এতে সবচেয়ে নিচের স্তরে কাজ করা বাংলা প্রোগ্রামারের বর্ণমালা বদলানোর শেষ জায়গাটিও দূর হয়।',
      ],
    },
    sources: [
      { label: 'Nirdeshika-16 specification 1.0.0, sections 1 and 4', href: 'https://github.com/akkhar-labs/Nirdeshika-16' },
      { label: 'Boyon syntax guide', href: 'https://github.com/akkhar-labs/Boyon/blob/main/docs/SYNTAX.md' },
    ],
  },
];
