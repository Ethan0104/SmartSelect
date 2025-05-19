import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import AudienceSection from '@/components/audience-section';
import FaqSection from '@/components/faq-section';
import FinalCtaSection from '@/components/final-cta-section';

export const metadata: Metadata = {
  title: 'Better Double Click Select | Chrome Extension',
  description:
    'A chrome extension that improves double-click-to-select behavior to select different text patterns, beyond just words.',
  keywords:
    'chrome extension, double click, text selection, productivity, developer tools',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AudienceSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
