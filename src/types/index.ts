export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  visual: "city" | "orbit" | "blocks";
}
export interface SocialLink {
  name: string;
  icon: "github" | "discord" | "x";
  url?: string;
  caption: string;
  username?: string;
}
export interface Interest {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
}
