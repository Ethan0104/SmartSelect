import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HeroArrowGraphic from './hero-arrow-graphic';

export default function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Select Smarter, <span className="text-primary">Not Harder</span>
            </h1>
            <p className="text-xl text-gray-300 md:pr-12">
              No more dragging on text! Supercharge your double click to select
              text intelligently.
            </p>
            <div>
              <Link
                href="https://chromewebstore.google.com/detail/better-double-click-selec/nhkmlbajieenacopoepocpoiiancolgb?utm_source=website&utm_medium=hero&utm_campaign=landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 font-bold"
                >
                  Add to Chrome
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <HeroArrowGraphic />
        </div>
      </div>
    </section>
  );
}
