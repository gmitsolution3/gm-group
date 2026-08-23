export interface Venture {
  _id: string;
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
  accent: string;
  established: string;
  image: string;
  gallery: string[];
  keyInfo: {
    label: string;
    value: string;
  }[];
  createdAt: string;
  updatedAt: string;
}