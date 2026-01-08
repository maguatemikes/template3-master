import { MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  content: {
    logo: {
      icon: string;
      text: string;
    };
    navigation: Array<{
      label: string;
      sectionId: string;
    }>;
    cta: {
      text: string;
      icon: string;
    };
  };
}

export function Header({ content }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground">{content.logo.icon}</span>
            </div>
            <span className="text-xl tracking-tight">{content.logo.text}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {content.navigation.map((item: any, index: number) => (
              <button 
                key={index}
                onClick={() => scrollToSection(item.sectionId)} 
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button className="gap-2" onClick={() => scrollToSection('locations')}>
            <MapPin className="w-4 h-4" />
            {content.cta.text}
          </Button>
        </div>
      </div>
    </header>
  );
}