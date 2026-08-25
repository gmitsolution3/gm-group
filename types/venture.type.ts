export interface IVenture {
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
  accent: "indigo" | "teal" | "yellow" | "coral";
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