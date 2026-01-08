import { Clock, MapPinOff, Package, ShoppingBag } from 'lucide-react';

const iconMap: Record<string, any> = {
  MapPinOff,
  Clock,
  Package,
  ShoppingBag
};

interface PainPointsProps {
  content: {
    heading: string;
    description: string;
    points: Array<{
      icon: string;
      problem: string;
      solution: string;
    }>;
  };
}

export function PainPoints({ content }: PainPointsProps) {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {content.heading}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.points.map((point: any, index: number) => {
            const Icon = iconMap[point.icon];
            return (
              <div 
                key={index}
                className="bg-background rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl">
                    {point.problem}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {point.solution}
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