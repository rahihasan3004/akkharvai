import rss from '@astrojs/rss';
import { news } from '../data/lab';
import { notes } from '../data/notes';
import { pathFor, type Lang } from '../i18n/ui';
import { site } from '../site.config';

export function newsFeed(lang: Lang) {
  return rss({
    title: lang === 'bn' ? 'অক্ষর ল্যাবস: সংবাদ' : 'Akkhar Labs: News',
    description: lang === 'bn' ? 'অক্ষর ল্যাবসের প্রকাশ ও প্রকাশনা' : 'Releases and publications from Akkhar Labs',
    site: site.url,
    items: news.map((n, i) => ({
      title: n.text[lang].replace(/[.।]$/, ''),
      description: n.text[lang],
      pubDate: new Date(`${n.date}T00:00:00Z`),
      link: n.href ? pathFor(lang, n.href) : pathFor(lang, '/news/'),
      customData: `<guid isPermaLink="false">akkharlabs-news-${n.date}-${i}</guid>`,
    })),
    customData: `<language>${lang === 'bn' ? 'bn-BD' : 'en'}</language>`,
  });
}

export function notesFeed(lang: Lang) {
  return rss({
    title: lang === 'bn' ? 'অক্ষর ল্যাবস: নোট' : 'Akkhar Labs: Notes',
    description: lang === 'bn' ? 'অক্ষর ল্যাবসের ল্যাব নোট' : 'Lab notes from Akkhar Labs',
    site: site.url,
    items: notes.map((n) => ({
      title: n.title[lang],
      description: n.summary[lang],
      pubDate: new Date(`${n.date}T00:00:00Z`),
      link: pathFor(lang, `/notes/${n.slug}/`),
    })),
    customData: `<language>${lang === 'bn' ? 'bn-BD' : 'en'}</language>`,
  });
}
