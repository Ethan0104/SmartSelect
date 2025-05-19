import type React from 'react';
import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import JsonLd from '@/components/json-ld';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Better Double Click Select | Chrome Extension',
  description:
    'A chrome extension that improves double-click-to-select behavior to select different text patterns, beyond just words.',
  icons: {
    icon: '/logo32x32.png',
  },
  metadataBase: new URL('https://betterdoubleclick.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Better Double Click Select | Chrome Extension',
    description:
      'A chrome extension that improves double-click-to-select behavior to select different text patterns, beyond just words.',
    url: 'https://betterdoubleclick.com',
    siteName: 'Better Double Click Select',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Better Double Click Select Chrome Extension',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Double Click Select',
    description:
      'A chrome extension that improves double-click-to-select behavior',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <JsonLd metadata={metadata} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
