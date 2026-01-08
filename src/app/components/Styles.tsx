import { ImageWithFallback } from './figma/ImageWithFallback';

interface StylesProps {
  content: {
    heading: string;
    description: string;
    collection: Array<{
      name: string;
      description: string;
      image: string;
      available: string;
    }>;
  };
}

export function Styles({ content }: StylesProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStyleClick = (styleName: string) => {
    // Scroll to locations to find stores with this style
    scrollToSection('locations');
    // Could also filter results or show a notification
    console.log(`Searching for ${styleName} near you...`);
  };

  return (
    <section id="styles" className="py-20 lg:py-32">
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
          {content.collection.map((style: any, index: number) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={() => handleStyleClick(style.name)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-4">
                <ImageWithFallback 
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm opacity-90">{style.available}</div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl">
                  {style.name}
                </h3>
                <p className="text-foreground/60">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}