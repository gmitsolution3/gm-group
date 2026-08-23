export type Venture = {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  shortDescription: string;
  description: string;
  whatItDoes: string;
  roleInGroup: string;
  website: string;
  featured: boolean;
  accent: "indigo" | "teal" | "yellow" | "coral";
  established: string;
  image?: string;
  gallery: string[];
  keyInfo: { label: string; value: string }[];
};

export const ventures: Venture[] = [
  {
    slug: "gm-international",
    name: "GM International",
    tagline: "Connecting people with global opportunities.",
    industry: "International Education & Consultancy",
    shortDescription:
      "An international consultancy helping students, professionals, and travelers access education and opportunities abroad.",

    description:
      "GM International is the group's international consultancy venture, focused on helping clients navigate overseas education, visa processing, medical travel, tourism, and other international opportunities.",

    whatItDoes:
      "GM International provides international consultancy services across education, student admissions, visa processing, medical travel, tourism, and related services. The venture works with clients throughout the process, from initial consultation and documentation to application and destination support.",

    roleInGroup:
      "GM International represents the group's international services division and serves as a major point of connection between clients in Bangladesh and opportunities abroad.",

    website: "#",

    featured: true,

    accent: "indigo",

    established: "2024",

    image: "/images/ventures/gm-international.png",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "International Education & Consultancy",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "International Services Venture",
      },
    ],
  },

  {
    slug: "gm-it-solution",
    name: "GM IT Solution",
    tagline: "Building technology for modern businesses.",
    industry: "Information Technology",

    shortDescription:
      "A technology venture focused on software, digital products, and technology solutions for businesses.",

    description:
      "GM IT Solution is the group's technology-focused venture, delivering software and digital solutions designed to help businesses operate more efficiently and build stronger digital capabilities.",

    whatItDoes:
      "GM IT Solution works across software development, web applications, digital platforms, technology consulting, and other IT services. The venture focuses on creating practical technology that solves operational and business problems.",

    roleInGroup:
      "GM IT Solution provides the group's technology capabilities and supports the digital transformation of businesses both within and beyond GM Group.",

    website: "#",

    featured: true,

    accent: "teal",

    established: "2024",

    image: "/images/ventures/gm-it-solution.webp",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "Information Technology",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "Technology Venture",
      },
    ],
  },

  {
    slug: "gm-logistic",
    name: "GM Logistic",
    tagline: "Moving business forward.",
    industry: "Logistics & Transportation",

    shortDescription:
      "A logistics venture focused on reliable transportation, movement, and operational support.",

    description:
      "GM Logistic is the group's logistics venture, focused on supporting the movement of goods and services through dependable logistics operations and coordinated transportation solutions.",

    whatItDoes:
      "GM Logistic manages logistics and transportation activities with an emphasis on coordination, reliability, timely delivery, and efficient operations.",

    roleInGroup:
      "GM Logistic expands the group's operational footprint into logistics and transportation while creating infrastructure that can support both internal and external business activities.",

    website: "#",

    featured: false,

    accent: "yellow",

    established: "2024",

    image: "/images/ventures/gm-logistic.webp",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "Logistics & Transportation",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "Operating Venture",
      },
    ],
  },

  {
    slug: "gm-food-point",
    name: "GM Food Point",
    tagline: "Good food. Good experience.",
    industry: "Food & Hospitality",

    shortDescription:
      "A food and restaurant venture focused on quality products, consistent service, and customer experience.",

    description:
      "GM Food Point is the group's food and hospitality venture, operating in the restaurant and food-service space with a focus on quality, consistency, and customer satisfaction.",

    whatItDoes:
      "GM Food Point manages food and restaurant operations, serving customers through quality food, attentive service, and disciplined day-to-day operations.",

    roleInGroup:
      "GM Food Point represents GM Group's presence in the food and hospitality sector and demonstrates the group's approach to building consumer-facing businesses.",

    website: "#",

    featured: false,

    accent: "coral",

    established: "2024",

    image: "/images/ventures/gm-food-point.png",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "Food & Hospitality",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "Operating Venture",
      },
    ],
  },

  {
    slug: "ai-learning-academy",
    name: "AI Learning Academy",
    tagline: "Learning for the future.",
    industry: "Education & Technology",

    shortDescription:
      "An education venture focused on practical learning, digital skills, and emerging technologies.",

    description:
      "AI Learning Academy is an education-focused venture built around modern learning and technology. It aims to help learners develop practical skills relevant to an increasingly digital and AI-driven world.",

    whatItDoes:
      "AI Learning Academy provides learning programs and educational resources focused on technology, artificial intelligence, digital skills, and practical professional development.",

    roleInGroup:
      "AI Learning Academy represents the group's investment in education and human capability, creating opportunities for people to develop skills for emerging industries.",

    website: "#",

    featured: true,

    accent: "indigo",

    established: "2024",

    image: "/images/ventures/ai-learning-academy.webp",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "Education & Technology",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "Education Venture",
      },
    ],
  },

  {
    slug: "graphics-multimedia",
    name: "Graphics & Multimedia",
    tagline: "Creative ideas, brought to life.",
    industry: "Creative & Digital Media",

    shortDescription:
      "A creative venture delivering graphic design, multimedia, and digital content services.",

    description:
      "Graphics & Multimedia is the group's creative services venture, focused on visual communication, graphic design, multimedia production, and digital content.",

    whatItDoes:
      "Graphics & Multimedia provides creative services including graphic design, visual identity, digital artwork, multimedia content, and other creative production work for businesses and organizations.",

    roleInGroup:
      "Graphics & Multimedia strengthens the group's creative capabilities and supports the visual communication needs of GM Group and its ventures.",

    website: "#",

    featured: false,

    accent: "teal",

    established: "2024",

    image: "/images/ventures/graphics-multimedia.webp",

    gallery: [],

    keyInfo: [
      {
        label: "Industry",
        value: "Creative & Digital Media",
      },
      {
        label: "Established",
        value: "2024",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Role",
        value: "Creative Venture",
      },
    ],
  },
];

export function getVenture(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug);
}

export function getRelatedVentures(
  slug: string,
  count = 3,
): Venture[] {
  return ventures
    .filter((v) => v.slug !== slug)
    .slice(0, count);
}

export const ventureAccentMap = {
  indigo: {
    bg: "bg-indigo",
    text: "text-indigo",
    ring: "ring-indigo",
    hex: "#5B5FEF",
  },

  teal: {
    bg: "bg-teal",
    text: "text-teal",
    ring: "ring-teal",
    hex: "#00BFA6",
  },

  yellow: {
    bg: "bg-yellow",
    text: "text-yellow",
    ring: "ring-yellow",
    hex: "#FFD23F",
  },

  coral: {
    bg: "bg-coral",
    text: "text-coral",
    ring: "ring-coral",
    hex: "#F43F5E",
  },
} as const;