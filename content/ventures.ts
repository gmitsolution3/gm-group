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
  gallery: string[];
  keyInfo: { label: string; value: string }[];
};

export const ventures: Venture[] = [
  {
    slug: "gm-venture-one",
    name: "GM Venture One",
    tagline: "Building from the ground up.",
    industry: "Technology",
    shortDescription:
      "[Placeholder] A technology venture focused on building digital products and platforms.",
    description:
      "[Placeholder] GM Venture One is the group’s flagship technology business — focused on building digital products, platforms, and infrastructure. Established as the first venture under GM Group, it set the operating model for the businesses that followed.",
    whatItDoes:
      "[Placeholder] GM Venture One develops digital products and platforms, serving users with reliable, well-built technology. Its work spans product development, infrastructure, and user experience.",
    roleInGroup:
      "[Placeholder] As the group’s first venture, GM Venture One established the operating philosophy that guides every business under GM Group — build with discipline, manage with clarity, grow with intention.",
    website: "#",
    featured: true,
    accent: "indigo",
    established: "[Year]",
    gallery: [],
    keyInfo: [
      { label: "Industry", value: "Technology" },
      { label: "Established", value: "[Year]" },
      { label: "Status", value: "Active" },
      { label: "Role", value: "Flagship Venture" },
    ],
  },
  {
    slug: "gm-venture-two",
    name: "GM Venture Two",
    tagline: "Managing at scale.",
    industry: "Financial Services",
    shortDescription:
      "[Placeholder] A financial services venture built on disciplined operation.",
    description:
      "[Placeholder] GM Venture Two is the group’s financial services business — built on disciplined operation, clear governance, and long-term positioning within its market.",
    whatItDoes:
      "[Placeholder] GM Venture Two provides financial services with a focus on reliability and trust. Its operations are structured for sustainable performance across cycles.",
    roleInGroup:
      "[Placeholder] GM Venture Two demonstrates the group’s capacity to manage complex, regulated businesses with discipline and long-term focus.",
    website: "#",
    featured: false,
    accent: "teal",
    established: "[Year]",
    gallery: [],
    keyInfo: [
      { label: "Industry", value: "Financial Services" },
      { label: "Established", value: "[Year]" },
      { label: "Status", value: "Active" },
      { label: "Role", value: "Managed Venture" },
    ],
  },
  {
    slug: "gm-venture-three",
    name: "GM Venture Three",
    tagline: "Growing new markets.",
    industry: "Real Estate",
    shortDescription:
      "[Placeholder] A real estate venture focused on growth and market expansion.",
    description:
      "[Placeholder] GM Venture Three is the group’s real estate business — focused on growth, market expansion, and long-term asset development.",
    whatItDoes:
      "[Placeholder] GM Venture Three develops and manages real estate assets, with a focus on long-term value creation across markets.",
    roleInGroup:
      "[Placeholder] GM Venture Three represents the group’s growth-stage operating model — scaling proven businesses into new markets.",
    website: "#",
    featured: false,
    accent: "yellow",
    established: "[Year]",
    gallery: [],
    keyInfo: [
      { label: "Industry", value: "Real Estate" },
      { label: "Established", value: "[Year]" },
      { label: "Status", value: "Active" },
      { label: "Role", value: "Growth Venture" },
    ],
  },
  {
    slug: "gm-venture-four",
    name: "GM Venture Four",
    tagline: "Expanding into new territory.",
    industry: "Consumer Goods",
    shortDescription:
      "[Placeholder] A consumer goods venture expanding into new industries.",
    description:
      "[Placeholder] GM Venture Four is the group’s consumer goods business — representing the group’s expansion into new industries and adjacent markets.",
    whatItDoes:
      "[Placeholder] GM Venture Four builds and markets consumer products, with a focus on quality and brand development.",
    roleInGroup:
      "[Placeholder] GM Venture Four reflects the group’s expansion philosophy — moving into new industries where the group’s strengths can create lasting value.",
    website: "#",
    featured: false,
    accent: "coral",
    established: "[Year]",
    gallery: [],
    keyInfo: [
      { label: "Industry", value: "Consumer Goods" },
      { label: "Established", value: "[Year]" },
      { label: "Status", value: "Active" },
      { label: "Role", value: "Expansion Venture" },
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
  return ventures.filter((v) => v.slug !== slug).slice(0, count);
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
