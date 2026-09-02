import type { Project } from "@/lib/portfolio-model";

export type { Project, ProjectAsset } from "@/lib/portfolio-model";

export const projects: Project[] = [
  {
    slug: "deras-apparel",
    title: "Dera’s Apparel",
    client: "Dera’s Apparel",
    year: "2025",
    type: "brand-identity",
    category: "Fashion Brand Identity & Visual System",
    description:
      "A flexible identity and campaign language for a student-facing fashion label built to move confidently between product, packaging and promotion.",
    challenge:
      "Dera’s needed more than a logo. The brand had to remain recognizable across apparel, accessories, packaging and fast-moving digital promotions without losing its youthful character.",
    objective:
      "Build a distinctive fashion system with a memorable wordmark, repeatable monogram language and enough structure to support both premium applications and energetic sales campaigns.",
    audience: "Students and digital-first fashion shoppers.",
    services: ["Brand strategy", "Identity design", "Logo system", "Pattern language", "Campaign direction"],
    palette: ["#6B0C83", "#B315C8", "#171217", "#F1EEDB"],
    featured: true,
    published: true,
    layoutVersion: 2,
    assets: [
      asset("deras-presentation", "/media/deras-presentation.webp", "Dera’s Apparel identity presentation", "presentation", "portrait", "hero", "presentation", 0),
      asset("deras-logo-black", "/media/deras-logo-black.webp", "Dera’s primary black wordmark", "logo", "wide", "major", "identity", 1),
      asset("deras-logo-purple", "/media/deras-logo-purple.webp", "Dera’s purple wordmark", "logo", "wide", "support", "identity", 2),
      asset("deras-pattern-gradient", "/media/deras-pattern-gradient.webp", "Dera’s gradient monogram pattern", "pattern", "square", "major", "patterns", 3),
      asset("deras-pattern-purple", "/media/deras-pattern-purple.webp", "Dera’s purple monogram pattern", "pattern", "square", "support", "patterns", 4),
      asset("deras-pattern-cream", "/media/deras-pattern-cream.webp", "Dera’s cream monogram pattern", "pattern", "square", "support", "patterns", 5),
      asset("deras-scarf", "/media/deras-scarf.webp", "Dera’s patterned silk scarf mockup", "mockup", "landscape", "major", "applications", 6),
      asset("deras-hat", "/media/deras-hat.webp", "Dera’s wool hat mockup", "mockup", "landscape", "major", "applications", 7),
      asset("deras-label", "/media/deras-label.webp", "Dera’s clothing label mockup", "mockup", "landscape", "major", "applications", 8),
      asset("deras-handbag", "/media/deras-handbag.webp", "Dera’s black handbag mockup", "mockup", "landscape", "major", "applications", 9),
      asset("deras-shirt-mannequin", "/media/deras-shirt-mannequin.webp", "Dera’s patterned shirt on mannequin", "mockup", "landscape", "major", "applications", 10),
      asset("deras-mannequin", "/media/deras-mannequin.webp", "Dera’s patterned apparel on mannequin", "mockup", "landscape", "support", "applications", 11)
    ]
  },
  {
    slug: "asher-concept",
    title: "Asher Concept",
    client: "Asher Concept",
    year: "2025",
    type: "brand-identity",
    category: "Fashion Identity & Applications",
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
    published: true,
    layoutVersion: 2,
    assets: [
      asset("asher-board", "/media/asher-identity-board.webp", "Asher Concept identity system and applications", "presentation", "portrait", "hero", "identity", 0)
    ]
  },
  {
    slug: "wavelox-creator-lab",
    title: "Wavelox Creator Lab",
    client: "Wavelox",
    year: "2026",
    type: "campaign-series",
    category: "Creator Programme Campaign Design",
    description:
      "A focused campaign visual created to make a creator-development programme feel energetic, current and immediately understandable.",
    challenge:
      "The communication needed to hold programme information, personality and a strong creator-led atmosphere inside one clear promotional frame.",
    objective:
      "Build a bold key visual that gives the programme a recognisable presence while keeping the message and call to action easy to read.",
    audience: "Emerging creators and digital professionals.",
    services: ["Campaign concept", "Key visual", "Information hierarchy", "Digital promotion"],
    palette: ["#A7080A", "#17100F", "#F7F3ED", "#F06A16"],
    featured: true,
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
    category: "Product Campaign & Sales Visuals",
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
    category: "Event Campaign & Visual Direction",
    description:
      "A cinematic event campaign developed as a sequence—from the principal announcement to countdown and live-day communication.",
    challenge:
      "The campaign needed to communicate spiritual urgency, movement and event information across multiple releases while retaining one unmistakable visual world.",
    objective:
      "Create a modular campaign system with consistent fire, typography and portrait treatment that could evolve across every stage of the event.",
    audience: "Young believers, students and event attendees.",
    services: ["Campaign direction", "Key art", "Portrait compositing", "Event rollout"],
    palette: ["#120806", "#F1490B", "#FFB31A", "#FFF2C2"],
    featured: true,
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
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}
