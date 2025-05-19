import { Metadata } from 'next';

interface JsonLdProps {
  metadata: Metadata;
}

export default function JsonLd({ metadata }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: metadata.title,
    description: metadata.description,
    applicationCategory: 'BrowserExtension',
    operatingSystem: 'Chrome',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
    downloadUrl:
      'https://chromewebstore.google.com/detail/better-double-click-selec/nhkmlbajieenacopoepocpoiiancolgb',
    softwareVersion: '1.0.0',
    publisher: {
      '@type': 'Organization',
      name: 'Better Double Click Select',
      url: 'https://betterdoubleclick.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
