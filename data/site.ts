export type SiteLink = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  type: "whatsapp" | "email" | "social" | "other";
};

export type SiteProfile = {
  name: string;
  shortName: string;
  role: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  location: string;
  links: SiteLink[];
};

export const site: SiteProfile & {
  hero: { words: string[] };
  whatsapp: string;
  whatsappLabel: string;
} = {
  name: "Onyedika Wisdom Chiemeziem",
  shortName: "Onyedika.",
  role: "Brand Identity & Visual Systems Designer",
  hero: {
    words: ["Identity", "Systems", "Direction"]
  },
  phone: "+2348081571801",
  phoneDisplay: "+234 808 157 1801",
  whatsapp: "https://wa.me/2348081571801?text=Hello%20Wisdom%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  whatsappLabel: "Start a Project",
  email: "wiscode01@gmail.com",
  location: "Nigeria · Available remotely",
  links: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/2348081571801?text=Hello%20Wisdom%2C%20I%27d%20like%20to%20discuss%20a%20project.",
      enabled: true,
      type: "whatsapp"
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:wiscode01@gmail.com",
      enabled: true,
      type: "email"
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "",
      enabled: false,
      type: "social"
    }
  ]
};

export const defaultSiteProfile: SiteProfile = {
  name: site.name,
  shortName: site.shortName,
  role: site.role,
  email: site.email,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  location: site.location,
  links: site.links
};
