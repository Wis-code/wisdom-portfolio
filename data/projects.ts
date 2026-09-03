import { sortProjectsForPortfolio, type Project } from "@/lib/portfolio-model";

export type { Project, ProjectAsset } from "@/lib/portfolio-model";

export const projects: Project[] = [
  {
    slug: "deras-apparel",
    title: "Dera Decor & Dress",
    client: "Dera Decor & Dress",
    year: "2025",
    type: "brand-identity",
    category: "Brand Identity & Applications",
    description:
      "A flexible identity system created to support a growing fashion and lifestyle brand across product, packaging and promotion.",
    challenge:
      "The identity needed to remain recognisable across fashion, accessories, packaging and promotional communication while leaving room for the brand to expand beyond its original apparel positioning.",
    objective:
      "Build a distinctive and repeatable visual system with a memorable wordmark, monogram language and practical applications across customer touchpoints.",
    audience: "Digital-first fashion and lifestyle shoppers.",
    services: ["Brand strategy", "Identity design", "Logo system", "Pattern language", "Brand applications"],
    palette: ["#6B0C83", "#B315C8", "#171217", "#F1EEDB"],
    featured: true,
    featuredOrder: 3,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("deras-presentation", "/media/deras-presentation.webp", "Dera Decor & Dress identity presentation", "presentation", "portrait", "hero", "presentation", 0),
      asset("deras-logo-black", "/media/deras-logo-black.webp", "Dera primary black wordmark", "logo", "wide", "major", "identity", 1),
      asset("deras-logo-purple", "/media/deras-logo-purple.webp", "Dera purple wordmark", "logo", "wide", "support", "identity", 2),
      asset("deras-pattern-gradient", "/media/deras-pattern-gradient.webp", "Dera gradient monogram pattern", "pattern", "square", "major", "patterns", 3),
      asset("deras-pattern-purple", "/media/deras-pattern-purple.webp", "Dera purple monogram pattern", "pattern", "square", "support", "patterns", 4),
      asset("deras-pattern-cream", "/media/deras-pattern-cream.webp", "Dera cream monogram pattern", "pattern", "square", "support", "patterns", 5),
      asset("deras-scarf", "/media/deras-scarf.webp", "Dera patterned silk scarf mockup", "mockup", "landscape", "major", "applications", 6),
      asset("deras-hat", "/media/deras-hat.webp", "Dera wool hat mockup", "mockup", "landscape", "major", "applications", 7),
      asset("deras-label", "/media/deras-label.webp", "Dera clothing label mockup", "mockup", "landscape", "major", "applications", 8),
      asset("deras-handbag", "/media/deras-handbag.webp", "Dera black handbag mockup", "mockup", "landscape", "major", "applications", 9),
      asset("deras-shirt-mannequin", "/media/deras-shirt-mannequin.webp", "Dera patterned shirt on mannequin", "mockup", "landscape", "major", "applications", 10),
      asset("deras-mannequin", "/media/deras-mannequin.webp", "Dera patterned apparel on mannequin", "mockup", "landscape", "support", "applications", 11)
    ]
  },
  {
    slug: "asher-concept",
    title: "Asher Concept",
    client: "Asher Concept",
    year: "2025",
    type: "brand-identity",
    category: "Brand Identity System",
    description:
      "A refined fashion identity balancing restrained typography, a monogram pattern and a confident black, ivory and gold application system.",
    challenge:
      "The brand needed to feel dignified and contemporary across bespoke traditional wear, formal clothing and merchandise without relying on generic luxury cues.",
    objective:
      "Create a premium, repeatable visual language that could move from identity presentation to fabric, packaging and promotional communication.",
    audience: "Style-conscious clients seeking bespoke and premium clothing.",
    services: ["Identity design", "Monogram system", "Art direction", "Brand applications"],
    palette: ["#171918", "#D9B52E", "#DDD0AE", "#F5F5F3"],
    featured: true,
    featuredOrder: 2,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("asher-system", "/media/asher/identity-system.webp", "Asher Concept identity system, palette, pattern and fashion applications", "presentation", "portrait", "hero", "identity", 0),
      asset("asher-monogram", "/media/asher/monogram-mark.webp", "Asher Concept circular monogram mark", "logo", "landscape", "major", "identity", 1),
      asset("asher-shoe-box", "/media/asher/shoe-box.webp", "Asher Concept patterned shoe box packaging", "mockup", "landscape", "major", "applications", 2),
      asset("asher-billboard", "/media/asher/billboard.webp", "Asher Concept urban billboard application", "mockup", "landscape", "major", "applications", 3),
      asset("asher-shirt", "/media/asher/shirt-mannequin.webp", "Asher Concept monogram shirt on a mannequin", "mockup", "landscape", "major", "applications", 4),
      asset("asher-scarf", "/media/asher/scarf.webp", "Asher Concept monogram scarf application", "mockup", "landscape", "support", "applications", 5),
      asset("asher-hat", "/media/asher/hat.webp", "Asher Concept embroidered wool hat", "mockup", "landscape", "support", "applications", 6)
    ]
  },
  {
    slug: "wavelox-creator-lab",
    title: "Wavelox",
    client: "Wavelox",
    year: "2026",
    type: "campaign-series",
    category: "Digital Campaign & Promotional Design",
    description:
      "A set of promotional communications for Wavelox spanning creator education, entertainment programming and a public-facing brand-name transition.",
    challenge:
      "Different messages had to feel energetic and immediate while still reading as communications from the same entertainment platform.",
    objective:
      "Build bold promotional visuals with clear hierarchy, strong calls to action and enough flexibility to move across programme, entertainment and brand announcements.",
    audience: "Creators, viewers and digital entertainment audiences.",
    services: ["Campaign design", "Promotional graphics", "Information hierarchy", "Digital communication"],
    palette: ["#A7080A", "#17100F", "#F7F3ED", "#F06A16"],
    featured: true,
    featuredOrder: 4,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("wavelox-main", "/media/archive/wavelox-creator-lab.jpg", "Wavelox Creator Lab campaign artwork", "campaign", "portrait", "hero", "campaign", 0)
    ]
  },
  {
    slug: "beef-bliss-protein-on-the-go",
    title: "Protein on the Go",
    client: "Beef Bliss",
    year: "2026",
    type: "campaign-series",
    category: "Product Campaign & Consumer Design",
    description:
      "A high-energy launch campaign turning a compact meat snack into an immediate, youthful and memorable product story.",
    challenge:
      "Beef Bliss needed campaign artwork that could make a small packaged product feel exciting, active and instantly understandable in a crowded social feed.",
    objective:
      "Build a bold campaign world around speed, energy and product visibility while keeping the pack recognizable at first glance.",
    audience: "Students, young professionals and on-the-go snack buyers.",
    services: ["Campaign concept", "Key visuals", "Product compositing", "Sales design"],
    palette: ["#FFDA00", "#E91727", "#171717", "#FFF8D8"],
    featured: true,
    featuredOrder: 5,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("beef-bliss-01", "/media/beef-bliss-campaign-01.webp", "Beef Bliss Protein on the Go campaign in a supermarket aisle", "campaign", "portrait", "hero", "campaign", 0),
      asset("beef-bliss-02", "/media/beef-bliss-campaign-02.webp", "Beef Bliss Protein on the Go lifestyle campaign", "campaign", "portrait", "major", "campaign", 1),
      asset("beef-bliss-product", "/media/beef-bliss-product.webp", "Beef Bliss packaged product in hand", "mockup", "portrait", "support", "product", 2)
    ]
  },
  {
    slug: "revival-fire-campaign",
    title: "Revival Fire",
    client: "Revival Hub International",
    year: "2026",
    type: "campaign-series",
    category: "Event Branding & Campaign Design",
    description:
      "A cinematic event campaign developed as a connected system—from principal event artwork to countdown, programme and supporting branded applications.",
    challenge:
      "The campaign needed to communicate urgency, movement and event information across multiple releases while retaining one unmistakable visual world.",
    objective:
      "Create a modular event campaign language with consistent fire, typography and portrait treatment that could evolve across the complete rollout.",
    audience: "Young believers, students and event attendees.",
    services: ["Event branding", "Campaign direction", "Key art", "Promotional rollout"],
    palette: ["#120806", "#F1490B", "#FFB31A", "#FFF2C2"],
    featured: true,
    featuredOrder: 6,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("revival-main", "/media/revival-fire-main.webp", "Revival Fire principal event artwork", "campaign", "portrait", "hero", "campaign", 0),
      asset("revival-one-day", "/media/revival-fire-one-day.webp", "Revival Fire one day to go artwork", "campaign", "portrait", "major", "campaign", 1),
      asset("revival-night", "/media/revival-fire-night.webp", "Revival Fire night programme artwork", "campaign", "portrait", "major", "campaign", 2),
      asset("revival-starts", "/media/revival-fire-starts.webp", "Revival Fire starts today artwork", "campaign", "portrait", "support", "campaign", 3),
      asset("revival-dday", "/media/revival-fire-dday.webp", "Revival Fire D-Day artwork", "campaign", "portrait", "support", "campaign", 4)
    ]
  },
  {
    slug: "gloss-and-glow",
    title: "Gloss & Glow",
    client: "Gloss & Glow Salon & Spa",
    year: "2026",
    type: "social-set",
    category: "Launch Campaign & Digital Touchpoints",
    description:
      "A launch and customer-onboarding visual set combining promotional storytelling with clear digital registration touchpoints.",
    challenge:
      "The salon needed to introduce its services, offer and digital registration process while maintaining a recognizable premium gold-and-black visual language.",
    objective:
      "Turn multiple customer messages into one coherent rollout that feels polished, approachable and easy to act on.",
    audience: "Beauty and grooming customers in Abuja.",
    services: ["Campaign design", "Service communication", "Digital onboarding", "Visual consistency"],
    palette: ["#111311", "#F4B700", "#FFF7D6", "#FFFFFF"],
    featured: true,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("gloss-promo", "/media/gloss-glow-promo.webp", "Gloss and Glow first-visit promotional artwork", "campaign", "portrait", "hero", "campaign", 0),
      asset("gloss-services", "/media/gloss-glow-services.webp", "Gloss and Glow service listing artwork", "social", "portrait", "major", "campaign", 1),
      asset("gloss-contact", "/media/gloss-glow-contact.webp", "Gloss and Glow digital registration instruction artwork", "social", "portrait", "support", "digital", 2)
    ]
  }
];

function asset(
  id: string,
  src: string,
  alt: string,
  kind: Project["assets"][number]["kind"],
  ratio: Project["assets"][number]["ratio"],
  weight: Project["assets"][number]["weight"],
  group: string,
  order: number
): Project["assets"][number] {
  return { id, src, alt, kind, ratio, weight, group, order };
}

export function getProject(slug: string) {
  const normalized = slug === "deras-decor-dress" ? "deras-apparel" : slug;
  return projects.find((project) => project.slug === normalized);
}

export function getPublishedProjects() {
  return projects
    .filter((project) => project.published)
    .sort(sortProjectsForPortfolio);
}
