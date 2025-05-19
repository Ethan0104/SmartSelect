import { Code, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AudienceSection() {
  const audiences = [
    {
      title: 'Developers',
      description:
        'Select file paths and UUIDs from GitHub with a single double-click. Copy code snippets faster than ever before.',
      icon: <Code className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Content Creators',
      description:
        'Grab emails and URLs instantly while researching. No more fiddling with precise cursor positioning.',
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: 'IT Professionals',
      description:
        'Extract server paths, IDs, and URLs from logs in seconds. Troubleshoot faster with smarter text selection.',
      icon: <Users className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Smarter Text Selection for Everyone
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select exactly what you want, instantly—no matter what you do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4">{audience.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {audience.title}
              </h3>
              <p className="text-gray-300">{audience.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            No matter your profession, if you work with text, our extension will
            save you time and frustration.
          </p>
          <Link
            href="https://chromewebstore.google.com/detail/better-double-click-selec/nhkmlbajieenacopoepocpoiiancolgb?utm_source=website&utm_medium=footer&utm_campaign=landing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Get it for free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
