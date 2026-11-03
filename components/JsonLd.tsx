import { siteUrl } from '@/lib/paths'
import { profile } from '@/lib/site'

/** schema.org Person built only from verified facts (CV and transcript). No ScholarlyArticle: no papers are verified. */
export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    url: `${siteUrl}/`,
    email: `mailto:${profile.email}`,
    jobTitle: 'GIS and Remote Sensing Expert',
    worksFor: { '@type': 'Organization', name: profile.employer, url: profile.employerHref },
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university },
    address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
    knowsAbout: ['Remote sensing', 'Geographic information systems', 'Land-cover change', 'Land degradation', 'Urban heat'],
    sameAs: profile.links.map((l) => l.href),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
