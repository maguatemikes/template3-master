import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface CtaSectionProps {
  content: {
    heading: string;
    description: string;
    searchPlaceholder: string;
    searchButton: string;
    subtext: string;
    secondaryCta: {
      text: string;
      sectionId: string;
    };
  };
}

export function CtaSection({ content }: CtaSectionProps) {
  const [zipCode, setZipCode] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearch = () => {
    if (zipCode.trim()) {
      // In a real app, this would search for stores by zip code
      console.log(`Searching for bandanas near: ${zipCode}`);
      scrollToSection('locations');
      // Could also show a notification
      alert(`Showing stores near ${zipCode}`);
    } else {
      scrollToSection('locations');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-16 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              {content.heading}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder={content.searchPlaceholder}
                className="bg-primary-foreground text-foreground flex-1"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                variant="secondary" 
                size="lg"
                className="gap-2"
                onClick={handleSearch}
              >
                <MapPin className="w-4 h-4" />
                {content.searchButton}
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70">
              {content.subtext}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              variant="outline" 
              className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 gap-2"
              onClick={() => scrollToSection(content.secondaryCta.sectionId)}
            >
              {content.secondaryCta.text}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}