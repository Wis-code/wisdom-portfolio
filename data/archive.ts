export type ArchiveItem = {
  title: string;
  src: string;
  ratio: "portrait" | "landscape" | "wide";
};

export type ArchiveCollection = {
  slug: string;
  title: string;
  note: string;
  cover: string;
  items: ArchiveItem[];
};

export const archiveCollections: ArchiveCollection[] = [
  {
    slug: "publishing-cover-design",
    title: "Publishing & cover design",
    note: "Book covers and educational publishing pieces, collected as one body of work.",
    cover: "/media/archive/seven-heads.png",
    items: [
      { title: "Silent Echoes", src: "/media/archive/silent-echoes.jpg", ratio: "portrait" },
      { title: "Seven Heads", src: "/media/archive/seven-heads.png", ratio: "landscape" },
      { title: "Kids Quest Academy", src: "/media/archive/kids-quest-academy.png", ratio: "landscape" },
      { title: "OCO Academy Nsukka", src: "/media/archive/oco-academy-nsukka.png", ratio: "landscape" },
      { title: "Shalom Academy Nsukka", src: "/media/archive/shalom-academy-nsukka.png", ratio: "landscape" }
    ]
  },
  {
    slug: "film-entertainment-posters",
    title: "Film & entertainment posters",
    note: "Narrative key art shaped around character, atmosphere and release communication.",
    cover: "/media/archive/the-other-man.png",
    items: [
      { title: "The Other Man", src: "/media/archive/the-other-man.png", ratio: "portrait" },
      { title: "The Seat", src: "/media/archive/the-seat.jpg", ratio: "portrait" },
      { title: "Help Me Now", src: "/media/archive/help-me-now.png", ratio: "wide" }
    ]
  },
  {
    slug: "digital-campaigns",
    title: "Digital campaigns & content visuals",
    note: "Connected campaign graphics across education, events, personal brands and media.",
    cover: "/media/archive/wavelox-creator-lab.jpg",
    items: [
      { title: "Wavelox Creator Lab", src: "/media/archive/wavelox-creator-lab.jpg", ratio: "portrait" },
      { title: "Creators Summit", src: "/media/archive/creators-summit.jpg", ratio: "portrait" },
      { title: "Personal Branding", src: "/media/archive/personal-branding.png", ratio: "portrait" },
      { title: "Atmosphere", src: "/media/archive/atmosphere.jpg", ratio: "wide" },
      { title: "The Breaker’s Chant", src: "/media/archive/breakers-chant.jpg", ratio: "wide" }
    ]
  }
];
