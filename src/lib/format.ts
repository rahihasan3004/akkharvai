import { num, type Lang } from '../i18n/ui';

const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

/** Format an ISO date (YYYY-MM-DD) without timezone shifts. */
export function formatDate(lang: Lang, iso: string, precision: 'day' | 'month' = 'day', short = false): string {
  const [y, m, d] = iso.split('-').map(Number);
  const month = (lang === 'bn' ? monthsBn : monthsEn)[m - 1];
  const mon = short && lang === 'en' ? month.slice(0, 3) : month;
  if (precision === 'month') return `${mon} ${num(lang, y)}`;
  return `${num(lang, d)} ${mon} ${num(lang, y)}`;
}

/** File size in KB/MB, localised digits. */
export function formatBytes(lang: Lang, bytes: number): string {
  const s = bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} KB`;
  return num(lang, s);
}

/** Thousands separators, localised digits. */
export function formatNumber(lang: Lang, n: number): string {
  return num(lang, n.toLocaleString('en-US'));
}
