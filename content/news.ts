export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: { heading: string; body: string }[];
  featured: boolean;
  accent: 'indigo' | 'teal' | 'yellow' | 'coral';
};

export const articles: Article[] = [
  {
    slug: 'gm-group-announces-new-venture',
    title: '[Placeholder] GM Group Announces New Venture',
    excerpt:
      '[Placeholder] GM Group expands its portfolio with the addition of a new business, continuing the group’s strategy of growth across industries.',
    category: 'Group News',
    date: '[Date]',
    readTime: '[X] min read',
    featured: true,
    accent: 'indigo',
    content: [
      {
        heading: 'A New Chapter',
        body: '[Placeholder] GM Group has announced the addition of a new venture to its portfolio. This move reflects the group’s ongoing strategy of building, managing, and growing businesses across industries, with a focus on long-term value creation.',
      },
      {
        heading: 'Strategic Direction',
        body: '[Placeholder] The new venture aligns with GM Group’s operating philosophy — Build, Manage, Grow, Expand. Each business under the group is structured for sustainable operation from the start, with the discipline and ambition that define GM Group’s approach.',
      },
      {
        heading: 'Looking Ahead',
        body: '[Placeholder] As GM Group continues to expand, the group remains focused on its core purpose: building businesses for the long term. The addition of this venture marks another step in that direction.',
      },
    ],
  },
  {
    slug: 'gm-group-expands-into-new-industry',
    title: '[Placeholder] GM Group Expands Into New Industry',
    excerpt:
      '[Placeholder] The group continues its expansion, entering a new industry with the launch of its latest venture.',
    category: 'Expansion',
    date: '[Date]',
    readTime: '[X] min read',
    featured: false,
    accent: 'teal',
    content: [
      {
        heading: 'Expansion Strategy',
        body: '[Placeholder] GM Group has expanded into a new industry, marking the next phase of the group’s growth. This expansion reflects the group’s commitment to building long-term value across diverse markets.',
      },
      {
        heading: 'Building for the Long Term',
        body: '[Placeholder] The group’s expansion is guided by long-term thinking — entering industries where GM Group’s strengths can create lasting value, not chasing short-term opportunity.',
      },
    ],
  },
  {
    slug: 'gm-group-appoints-new-leadership',
    title: '[Placeholder] GM Group Strengthens Leadership',
    excerpt:
      '[Placeholder] GM Group announces new leadership appointments across its portfolio of businesses.',
    category: 'Leadership',
    date: '[Date]',
    readTime: '[X] min read',
    featured: false,
    accent: 'yellow',
    content: [
      {
        heading: 'Leadership Appointments',
        body: '[Placeholder] GM Group has announced new leadership appointments, strengthening the group’s capacity to build, manage, and grow its businesses.',
      },
      {
        heading: 'A Focus on Long-Term Value',
        body: '[Placeholder] These appointments reflect the group’s commitment to long-term thinking — building teams that can guide businesses for decades, not quarters.',
      },
    ],
  },
  {
    slug: 'gm-group-annual-review',
    title: '[Placeholder] GM Group Annual Review',
    excerpt:
      '[Placeholder] A look at the group’s progress across its portfolio and the direction ahead.',
    category: 'Review',
    date: '[Date]',
    readTime: '[X] min read',
    featured: false,
    accent: 'coral',
    content: [
      {
        heading: 'A Year of Progress',
        body: '[Placeholder] GM Group reflects on a year of progress across its portfolio of businesses, with growth in existing ventures and expansion into new industries.',
      },
      {
        heading: 'The Direction Ahead',
        body: '[Placeholder] Looking ahead, GM Group remains focused on its core purpose — building businesses for the long term and expanding into new industries where opportunity exists.',
      },
    ],
  },
  {
    slug: 'gm-group-long-term-vision',
    title: '[Placeholder] GM Group Outlines Long-Term Vision',
    excerpt:
      '[Placeholder] The group shares its vision for the future — building businesses that outlast generations.',
    category: 'Vision',
    date: '[Date]',
    readTime: '[X] min read',
    featured: false,
    accent: 'indigo',
    content: [
      {
        heading: 'Building for Tomorrow',
        body: '[Placeholder] GM Group has outlined its long-term vision — to become a globally recognized business group that creates enduring value across industries.',
      },
      {
        heading: 'A Shared Direction',
        body: '[Placeholder] The group’s vision is built on a simple idea: one group, multiple businesses, a shared direction. Each venture under GM Group contributes to a larger ambition.',
      },
    ],
  },
  {
    slug: 'gm-group-sustainability-commitment',
    title: '[Placeholder] GM Group Reinforces Responsibility Commitment',
    excerpt:
      '[Placeholder] The group underscores its commitment to operating with responsibility across every business.',
    category: 'Responsibility',
    date: '[Date]',
    readTime: '[X] min read',
    featured: false,
    accent: 'teal',
    content: [
      {
        heading: 'Operating with Responsibility',
        body: '[Placeholder] GM Group has reinforced its commitment to operating with responsibility — across every business, every market, and every decision.',
      },
      {
        heading: 'Long-Term Impact',
        body: '[Placeholder] The group’s approach to responsibility is rooted in long-term thinking — building businesses that create positive impact over time.',
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const newsCategories = [
  'All',
  'Group News',
  'Expansion',
  'Leadership',
  'Review',
  'Vision',
  'Responsibility',
];
