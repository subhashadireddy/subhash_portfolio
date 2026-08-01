import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Subhash Adireddy - Full Stack Developer',
    template: '%s | Subhash Adireddy',
  },
  description:
    'Web developer specializing in React, Next.js, and MERN Stack development. Building fast, scalable, and user-focused web applications.',
  keywords: [
    'Subhash Adireddy',
    'Web Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'JavaScript',
    'MERN Stack',
    'Portfolio',
  ],
  authors: [
    {
      name: 'Subhash Adireddy',
    },
  ],
  creator: 'Subhash Adireddy',
  metadataBase: new URL('https://aitezaz.xyz'),
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'Subhash Adireddy - Full Stack Developer',
    description:
      'Portfolio of Subhash Adireddy, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    url: 'https://aitezaz.xyz',
    siteName: 'Subhash Adireddy Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Subhash Adireddy - Full Stack Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subhash Adireddy - Full Stack Developer',
    description:
      'Portfolio of Subhash Adireddy, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

