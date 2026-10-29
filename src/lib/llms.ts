/**
 * Plain-text summaries for AI assistants and crawlers, following the llms.txt convention
 * (https://llmstxt.org): /llms.txt is a short map of the site, /llms-full.txt carries the full facts.
 * Both are generated from src/data at build time, so they stay in step with the pages.
 */
import { site } from '../site.config';
import { areas, projects, plannedLayers, publications, news, rahat } from '../data/lab';
import { abstracts } from '../data/abstracts';
import { notes } from '../data/notes';
import { summaries, faq } from '../data/discovery';

const u = (path: string) => new URL(path, site.url).href;

function header(): string[] {
  return [
    '# Akkhar Labs (অক্ষর ল্যাবস)',
    '',
    `> ${summaries.lab.en}`,
    '',
    `Mission: ${'Working to make Bengali a new mother tongue for computers.'} (বাংলা ভাষাকে কম্পিউটারের নতুন মাতৃভাষা করার লক্ষ্যে কার্যরত।)`,
    '',
    'Key facts:',
    '- Type: independent research lab (Bangladeshi research lab)',
    `- Location: ${site.location.en}`,
    `- Founder: ${rahat.name.en} (${rahat.name.bn}), ${rahat.role.en.toLowerCase()} — ${u('/people/rahat-hasan/')}`,
    `- Founder ORCID: https://orcid.org/${rahat.orcid}`,
    `- GitHub: ${site.links.github} (lab), ${rahat.github} (founder)`,
    '- Languages of the site: English (/) and Bengali (/bn/)',
    '- Also searched for as: Bangla computer, Bangla CPU, Bangla programming language, Bengali computing, Bangladeshi research lab, AI researcher from Bangladesh',
    '',
  ];
}

export function llmsTxt(): string {
  const lines = [
    ...header(),
    '## Main pages',
    '',
    `- [Home](${u('/')}): what the lab does, with a live Bengali program you can run`,
    `- [About Akkhar Labs](${u('/about/')}): mission, how the lab works, and common questions answered`,
    `- [Rahat Hasan](${u('/people/rahat-hasan/')}): founder profile, biography, publications`,
    `- [Project Ekushey](${u('/ekushey/')}): the Bangla computer — a computing stack designed in Bengali`,
    `- [Research](${u('/research/')}): the two research areas`,
    `- [Publications](${u('/publications/')}): papers and specifications with DOIs and citations`,
    `- [Contact](${u('/contact/')})`,
    '',
    '## Research areas',
    '',
    ...Object.entries(areas).map(([slug, a]) => `- [${a.title.en}](${u(`/research/${slug}/`)}): ${a.summary.en}`),
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.name.en}${p.name.bn !== p.name.en ? ` (${p.name.bn})` : ''}](${u(`/projects/${p.slug}/`)}): ${p.kind.en}. ${p.summary.en} Status: ${p.status.en}.`),
    `- [Nirdeshika-16 playground](${u('/projects/nirdeshika-16/playground/')}): write and run Bengali assembly in the browser`,
    '',
    '## Publications',
    '',
    ...publications.map((p) => `- [${p.title}](${u(`/publications/${p.slug}/`)}): ${p.authors.map((a) => a.name).join(', ')}, ${p.year}. ${p.type.en}${p.doi ? `, DOI ${p.doi}` : ''}.${p.peerReviewed ? '' : ' Not peer-reviewed.'}`),
    '',
    '## Optional',
    '',
    `- [Full text for AI assistants](${u('/llms-full.txt')}): every fact on this site in one file, including abstracts and answers to common questions`,
    `- [Bengali version of the site](${u('/bn/')})`,
    `- [News feed (RSS)](${u('/news/rss.xml')})`,
    `- [Sitemap](${u('/sitemap-index.xml')})`,
    '',
  ];
  return lines.join('\n');
}

export function llmsFullTxt(): string {
  const lines = [
    ...header(),
    '## Founder',
    '',
    summaries.person.en,
    '',
    summaries.person.bn,
    '',
    `Profile: ${u('/people/rahat-hasan/')} · ORCID https://orcid.org/${rahat.orcid} · GitHub ${rahat.github}`,
    '',
    '## Common questions',
    '',
    ...faq.flatMap((f) => [`### ${f.q.en}`, '', f.a.en, '', `(${f.q.bn}) ${f.a.bn}`, '']),
    '## Research areas',
    '',
    ...Object.entries(areas).flatMap(([slug, a]) => [`### ${a.title.en} (${a.title.bn})`, '', a.summary.en, '', `URL: ${u(`/research/${slug}/`)}`, '']),
    '## Projects (built and public)',
    '',
    ...projects.flatMap((p) => [
      `### ${p.name.en}${p.name.bn !== p.name.en ? ` (${p.name.bn})` : ''} — ${p.kind.en}`,
      '',
      p.summary.en,
      '',
      `- Status: ${p.status.en}`,
      `- Research area: ${areas[p.area].title.en}`,
      ...(p.repo ? [`- Source: ${p.repo}`] : []),
      ...(p.license ? [`- Licence: ${p.license}`] : []),
      ...(p.language ? [`- Written in: ${p.language}`] : []),
      `- Page: ${u(`/projects/${p.slug}/`)}`,
      '',
    ]),
    '## Project Ekushey: layers in design (not yet built)',
    '',
    summaries.ekushey.en,
    '',
    ...plannedLayers.flatMap((l) => [`- ${l.name.en} (${l.name.bn}), ${l.layer.en.toLowerCase()}: ${l.text.en} Status: ${l.status.en}.`]),
    '',
    '## Publications',
    '',
    ...publications.flatMap((p) => [
      `### ${p.title}`,
      '',
      `- Authors: ${p.authors.map((a) => a.name + (a.orcid ? ` (ORCID ${a.orcid})` : '')).join(', ')}`,
      `- Affiliation: Akkhar Labs, Bogura, Bangladesh`,
      `- Date: ${p.date} · Version ${p.version} · ${p.type.en} · Published by ${p.publisher}`,
      ...(p.doi ? [`- DOI: https://doi.org/${p.doi}`] : []),
      `- PDF: ${p.pdf.local ? u(p.pdf.href) : p.pdf.href}`,
      `- Licence: ${p.license}`,
      `- Peer-reviewed: ${p.peerReviewed ? 'yes' : 'no'}`,
      `- Keywords: ${p.keywords.join(', ')}`,
      `- Page: ${u(`/publications/${p.slug}/`)}`,
      '',
      abstracts[p.slug].enIsVerbatim ? 'Abstract:' : 'Summary:',
      '',
      ...abstracts[p.slug].en.flatMap((para) => [para, '']),
    ]),
    '## News',
    '',
    ...news.map((n) => `- ${n.precision === 'month' ? n.date.slice(0, 7) : n.date}: ${n.text.en}`),
    '',
    ...(notes.some((n) => !n.draft)
      ? ['## Lab notes', '', ...notes.filter((n) => !n.draft).flatMap((n) => [`### ${n.title.en}`, '', ...n.body.en.flatMap((para) => [para, '']), `URL: ${u(`/notes/${n.slug}/`)}`, ''])]
      : []),
    '## How to cite',
    '',
    'Cite papers by DOI as shown on each publication page. Refer to the lab as "Akkhar Labs, Bogura, Bangladesh" and to the founder as "Rahat Hasan (ORCID 0009-0003-6184-5269)".',
    '',
  ];
  return lines.join('\n');
}
