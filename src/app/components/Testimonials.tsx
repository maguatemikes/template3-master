import { Star } from 'lucide-react';

interface TestimonialsProps {
  content: {
    heading: string;
    description: string;
    reviews: Array<{
      name: string;
      location: string;
      rating: number;
      text: string;
    }>;
  };
}

export function Testimonials({ content }: TestimonialsProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {content.heading}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.reviews.map((testimonial: any, index: number) => (
            <div 
              key={index}
              className="bg-secondary/50 rounded-2xl p-8 space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="pt-4 border-t border-border">
                <div>{testimonial.name}</div>
                <div className="text-sm text-foreground/60">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}