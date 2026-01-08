import { Facebook, Instagram, Mail, MapPin, Twitter } from 'lucide-react';

interface FooterProps {
  content: {
    logo: {
      icon: string;
      text: string;
    };
    tagline: string;
    sections: Array<{
      heading: string;
      links?: Array<{
        text: string;
        sectionId?: string;
        url?: string;
      }>;
      socialMedia?: Array<{
        platform: string;
        url: string;
      }>;
      email?: string;
    }>;
    copyright: string;
    legal: Array<{
      text: string;
      url: string;
    }>;
  };
}

export function Footer({ content }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    scrollToSection(section);
  };

  const socialIcons: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded-lg flex items-center justify-center">
                <span>{content.logo.icon}</span>
              </div>
              <span className="text-xl tracking-tight">{content.logo.text}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {content.tagline}
            </p>
          </div>

          {content.sections.map((section: any, index: number) => (
            <div key={index}>
              <h4 className="mb-4">{section.heading}</h4>
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      {link.sectionId ? (
                        <a 
                          href={`#${link.sectionId}`} 
                          onClick={(e) => handleNavigation(e, link.sectionId)} 
                          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <a 
                          href={link.url} 
                          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                        >
                          {link.text}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {section.socialMedia && (
                <>
                  <div className="flex gap-3 mb-4">
                    {section.socialMedia.map((social: any, socialIndex: number) => {
                      const Icon = socialIcons[social.platform];
                      return (
                        <a 
                          key={socialIndex}
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                  <div className="space-y-2 text-sm">
                    <a href={`mailto:${section.email}`} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      <Mail className="w-4 h-4" />
                      {section.email}
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>{content.copyright}</p>
          <div className="flex gap-6">
            {content.legal.map((item: any, index: number) => (
              <a key={index} href={item.url} className="hover:text-primary-foreground transition-colors">
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}