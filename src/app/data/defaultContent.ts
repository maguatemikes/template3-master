// Default content schema - fallback if API fails
export const defaultContent = {
  id: 51186,
  site: {
    name: "Bandana Express",
    domain: "bandanaexpress.local",
    tagline: "Your local hub for stylish bandanas",
    year: "2024"
  },
  header: {
    logo: {
      text: "Bandana Express",
      icon: "🧣"
    },
    navigation: [
      {
        label: "Shop",
        sectionId: "shop"
      },
      {
        label: "Directory",
        sectionId: "directory"
      },
      {
        label: "Styles",
        sectionId: "styles"
      },
      {
        label: "Location",
        sectionId: "location"
      },
      {
        label: "Testimonials",
        sectionId: "testimonials"
      }
    ],
    cta: {
      text: "Find Bandanas Near Me",
      icon: "📍"
    }
  },
  hero: {
    badge: {
      icon: "🛒",
      text: "Online & Local"
    },
    heading: "Discover Trendy Bandanas Near You",
    subheading: "Shop & Find Bandanas from Local Sellers Quickly",
    description: "Browse our curated selection of bandanas and connect with local shops offering the best styles and prices in your area.",
    primaryCta: {
      text: "Shop Now",
      sectionId: "shop"
    },
    secondaryCta: {
      text: "Find Nearby Stores",
      sectionId: "directory"
    },
    stats: [
      {
        value: "250+",
        label: "Bandana Styles"
      },
      {
        value: "100+",
        label: "Local Stores"
      },
      {
        value: "5000+",
        label: "Happy Customers"
      }
    ],
    heroImage: {
      src: "https://example.com/images/bandana-hero.jpg",
      alt: "Colorful bandanas displayed on racks"
    }
  },
  painPoints: {
    heading: "Why Finding Bandanas Locally Matters",
    description: "Many buyers face challenges finding quality bandanas nearby. We solve these issues with our local focus.",
    points: [
      {
        icon: "MapPinOff",
        problem: "Limited selection at local stores",
        solution: "Extensive online catalog connected to multiple local sellers."
      },
      {
        icon: "Clock",
        problem: "Long delivery times",
        solution: "Instant local pickup and fast shipping options."
      },
      {
        icon: "Package",
        problem: "Uncertainty about quality and style",
        solution: "Customer reviews and detailed style guides for informed choices."
      }
    ]
  },
  styles: {
    heading: "Explore Popular Bandana Styles",
    description: "From classic paisley to modern prints, find the perfect bandana to match your style and needs.",
    collection: [
      {
        name: "Classic Paisley",
        description: "Timeless design available in multiple colors.",
        image: "https://example.com/images/classic-paisley.jpg",
        available: "In stock at 65 stores"
      },
      {
        name: "Floral Prints",
        description: "Bright and vibrant patterns for a fresh look.",
        image: "https://example.com/images/floral-prints.jpg",
        available: "In stock at 40 stores"
      },
      {
        name: "Solid Colors",
        description: "Simple and versatile, perfect for any outfit.",
        image: "https://example.com/images/solid-colors.jpg",
        available: "In stock at 75 stores"
      }
    ]
  },
  benefits: {
    heading: "Why Buy Your Bandanas Here",
    description: "Enjoy seamless shopping experience with unbeatable benefits tailored for local buyers.",
    benefits: [
      {
        icon: "Zap",
        title: "Fast Local Delivery",
        description: "Get bandanas delivered quickly or pick them up from stores near you."
      },
      {
        icon: "Shield",
        title: "Secure Payments",
        description: "Safe and easy checkout with multiple payment options."
      },
      {
        icon: "Award",
        title: "Trusted Quality",
        description: "Only verified local sellers with top customer ratings."
      }
    ]
  },
  location: {
    heading: "Find a Bandana Store Near You",
    description: "Locate nearby shops that offer the best bandanas in your neighborhood.",
    store: {
      name: "The Bandana Spot",
      address: "123 Market St, Townsville",
      hours: "Mon-Sat 10am - 7pm, Sun 11am - 5pm",
      status: "Open",
      website: "https://thebandanaspot.example",
      plusCode: "87G8+5X Townsville",
      phone: "(555) 123-4567"
    },
    whatToExpect: [
      "Wide variety of bandanas including exclusive local designs",
      "Friendly staff ready to assist style choices",
      "Competitive prices with seasonal discounts",
      "Try before you buy options"
    ],
    cta: {
      heading: "Visit or Contact a Local Store Today",
      description: "Get hands-on experience and personalized service at a store near you.",
      buttons: [
        {
          text: "Get Directions",
          action: "navigate"
        },
        {
          text: "Call Store",
          action: "call"
        }
      ]
    }
  },
  testimonials: {
    heading: "What Our Customers Say",
    description: "Real feedback from local buyers who found their perfect bandanas here.",
    reviews: [
      {
        name: "Emily R.",
        location: "Townsville",
        rating: 5,
        text: "I found the exact bandana I wanted within minutes. Love supporting local stores!"
      },
      {
        name: "Jason K.",
        location: "Riverside",
        rating: 4,
        text: "Great variety and fast shipping. The quality exceeded my expectations."
      },
      {
        name: "Maya L.",
        location: "Hilltop",
        rating: 5,
        text: "Customer service was excellent. They helped me pick styles that match my outfits."
      }
    ]
  },
  ctaSection: {
    heading: "Search Bandanas Near You",
    description: "Enter your location to find local stores and shop online instantly.",
    searchPlaceholder: "Enter your city or zip code",
    searchButton: "Search",
    subtext: "Discover styles, prices, and stores all in one place.",
    secondaryCta: {
      text: "Browse Bandana Styles",
      sectionId: "styles"
    }
  },
  footer: {
    logo: {
      text: "Bandana Express",
      icon: "🧣"
    },
    tagline: "Local Bandanas, Quick and Easy",
    sections: [
      {
        heading: "Quick Links",
        links: [
          {
            text: "Shop",
            sectionId: "shop",
            url: "/#shop"
          },
          {
            text: "Directory",
            sectionId: "directory",
            url: "/#directory"
          },
          {
            text: "Styles",
            sectionId: "styles",
            url: "/#styles"
          },
          {
            text: "Testimonials",
            sectionId: "testimonials",
            url: "/#testimonials"
          }
        ],
        socialMedia: [
          {
            platform: "Facebook",
            url: "https://facebook.com/bandanaexpress"
          },
          {
            platform: "Instagram",
            url: "https://instagram.com/bandanaexpress"
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/bandanaexpress"
          }
        ],
        email: "support@bandanaexpress.local"
      }
    ],
    copyright: "© 2024 Bandana Express. All rights reserved.",
    legal: [
      {
        text: "Privacy Policy",
        url: "/privacy"
      },
      {
        text: "Terms of Service",
        url: "/terms"
      }
    ]
  },
  timestamp: new Date().toISOString()
};