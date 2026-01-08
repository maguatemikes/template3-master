import { Award, MapPin, Shield, Zap } from 'lucide-react';

const iconMap: Record<string, any> = {
  MapPin,
  Zap,
  Shield,
  Award
};

interface BenefitsProps {
  content: {
    heading: string;
    description: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export function Benefits({ content }: BenefitsProps) {
  return (
    <section id="benefits" className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {content.heading}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.benefits.map((benefit: any, index: number) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div 
                key={index}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}