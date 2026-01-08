import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  content: {
    badge: {
      icon: string;
      text: string;
    };
    heading: string;
    subheading: string;
    description: string;
    primaryCta: {
      text: string;
      sectionId: string;
    };
    secondaryCta: {
      text: string;
      sectionId: string;
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
    heroImage: {
      src: string;
      alt: string;
    };
  };
}

export function Hero({ content }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                <MapPin className="w-3 h-3" />
                {content.badge.text}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                {content.heading}
                <span className="block text-foreground/70 mt-2">{content.subheading}</span>
              </h1>
              <p className="text-lg text-foreground/60 max-w-lg">
                {content.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 text-base" onClick={() => scrollToSection(content.primaryCta.sectionId)}>
                {content.primaryCta.text}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base" onClick={() => scrollToSection(content.secondaryCta.sectionId)}>
                {content.secondaryCta.text}
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {content.stats.map((stat: any, index: number) => (
                <div key={index} className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl tracking-tight">{stat.value}</div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                  </div>
                  {index < content.stats.length - 1 && <div className="w-px h-12 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
              <ImageWithFallback 
                src={content.heroImage.src}
                alt={content.heroImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}