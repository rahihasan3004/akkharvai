/**
 * Interface strings in both languages.
 * Bengali strings are drafts by Claude and must be reviewed by Rahat before launch.
 */
export const languages = { en: 'English', bn: 'বাংলা' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'skip': 'Skip to main content',
    'nav.label': 'Main',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.publications': 'Publications',
    'nav.notes': 'Notes',
    'nav.ekushey': 'Ekushey',
    'nav.about': 'About',
    'lang.switch': 'বাংলা',
    'lang.switchLabel': 'Read this page in Bengali',
    'mission': 'Working to make Bengali a new mother tongue for computers.',
    'lab.description':
      'An independent research lab in Bogura, Bangladesh. We build computing around human language, from a Bengali instruction set architecture to efficient infrastructure for AI agents.',
    'footer.elsewhere': 'Elsewhere',
    'footer.copyright': '© 2026 Akkhar Labs',
    'home.label': 'Akkhar Labs home',
  },
  bn: {
    'skip': 'মূল লেখায় যান',
    'nav.label': 'প্রধান',
    'nav.research': 'গবেষণা',
    'nav.projects': 'প্রকল্প',
    'nav.publications': 'প্রকাশনা',
    'nav.notes': 'নোট',
    'nav.ekushey': 'একুশে',
    'nav.about': 'পরিচিতি',
    'lang.switch': 'English',
    'lang.switchLabel': 'এই পাতাটি ইংরেজিতে পড়ুন',
    'mission': 'বাংলা ভাষাকে কম্পিউটারের নতুন মাতৃভাষা করার লক্ষ্যে কার্যরত।',
    'lab.description':
      'বগুড়া, বাংলাদেশের একটি স্বাধীন গবেষণাগার। আমরা মানুষের ভাষাকে কেন্দ্র করে কম্পিউটিং গড়ে তুলি: বাংলা নির্দেশনা-সেট স্থাপত্য থেকে শুরু করে এআই এজেন্টের জন্য দক্ষ অবকাঠামো পর্যন্ত।',
    'footer.elsewhere': 'অন্যত্র',
    'footer.copyright': '© ২০২৬ অক্ষর ল্যাবস',
    'home.label': 'অক্ষর ল্যাবস প্রথম পাতা',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** Language of a URL: /bn/... is Bengali, everything else English. */
export function langFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'bn' ? 'bn' : 'en';
}

/** Path without the /bn prefix, always with a trailing slash. */
export function basePath(url: URL): string {
  const p = url.pathname.replace(/^\/bn(?=\/|$)/, '') || '/';
  return p.endsWith('/') ? p : `${p}/`;
}

/** The same page in the given language. */
export function pathFor(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'bn' ? `/bn${clean === '/' ? '/' : clean}` : clean;
}

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
/** Bengali numerals for Bengali pages; Latin numerals otherwise. */
export function num(lang: Lang, value: number | string): string {
  const s = String(value);
  return lang === 'bn' ? s.replace(/\d/g, (d) => bnDigits[Number(d)]) : s;
}
