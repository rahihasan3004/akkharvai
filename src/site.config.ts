/** Single source for lab-wide facts. Only verified values go here. */
export const site = {
  url: 'https://akkharlabs.com',
  name: { en: 'Akkhar Labs', bn: 'অক্ষর ল্যাবস' },
  location: { en: 'Bogura, Bangladesh', bn: 'বগুড়া, বাংলাদেশ' },
  /** Public contact address. */
  contactEmail: 'contact@akkharlabs.com' as string | null,
  /** Launched: pages are indexable (index, follow). Set to false to hide the whole site from search again. */
  launched: true,
  links: {
    github: 'https://github.com/akkhar-labs',
    orcid: 'https://orcid.org/0009-0003-6184-5269',
  },
  founder: {
    name: 'Rahat Hasan',
    orcid: '0009-0003-6184-5269',
    github: 'https://github.com/rahatarch',
  },
} as const;
