import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

interface LocationMapProps {
  content: {
    heading: string;
    description: string;
    store: {
      name: string;
      address: string;
      hours: string;
      status: string;
      website: string;
      plusCode: string;
      phone: string;
    };
    whatToExpect: string[];
    cta: {
      heading: string;
      description: string;
      buttons: Array<{
        text: string;
        action: string;
      }>;
    };
  };
}

export function LocationMap({ content }: LocationMapProps) {
  const storeInfo = content.store;

  // Correct Google Maps embed URL with proper coordinates for the address
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.8259384!2d-74.8527!3d39.9792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c134e9e4f3f8c7%3A0x8f8b0f8f8f8f8f8f!2s2402%20Sylon%20Blvd%2C%20Hainesport%2C%20NJ%2008036!5e0!3m2!1sen!2sus!4v1234567890`;
  
  // Direct link to Google Maps with the exact address
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=2402+Sylon+Blvd,Hainesport,NJ+08036`;

  const handleCallStore = () => {
    window.location.href = `tel:${storeInfo.phone}`;
  };

  const handleViewCatalog = () => {
    // In a real app, this would link to an actual catalog page
    window.open(`https://${storeInfo.website}`, '_blank');
  };

  return (
    <section id="locations" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {content.heading}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Store Information */}
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-2xl mb-2">{storeInfo.name}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm">
                  <Clock className="w-3 h-3" />
                  {storeInfo.status}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-foreground/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Address</div>
                    <div>{storeInfo.address}</div>
                    <div className="text-sm text-foreground/60 mt-1">{storeInfo.plusCode}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-foreground/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Hours</div>
                    <div>{storeInfo.hours}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-foreground/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Phone</div>
                    <button 
                      onClick={handleCallStore}
                      className="text-primary hover:underline"
                    >
                      {storeInfo.phone}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <ExternalLink className="w-5 h-5 text-foreground/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Website</div>
                    <a 
                      href={`https://${storeInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {storeInfo.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <Button 
                  className="w-full gap-2"
                  onClick={() => window.open(directionsUrl, '_blank')}
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open(`https://${storeInfo.website}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-primary/5 rounded-2xl p-6 space-y-3">
              <h4>What to Expect</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                {content.whatToExpect.map((item: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-secondary shadow-lg">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-secondary/30 rounded-2xl p-8">
          <h3 className="text-xl mb-2">{content.cta.heading}</h3>
          <p className="text-foreground/60 mb-4">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {content.cta.buttons.map((button: any, index: number) => (
              <Button 
                key={index}
                variant="outline" 
                className={index === 0 ? "gap-2" : ""}
                onClick={() => {
                  if (button.action.startsWith('tel:')) {
                    window.location.href = button.action;
                  } else {
                    window.open(button.action, '_blank');
                  }
                }}
              >
                {index === 0 && <Phone className="w-4 h-4" />}
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}