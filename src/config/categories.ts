import {
  GraduationCap,
  Users,
  Scale,
  Landmark,
  Laptop,
  Handshake,
  Building2,
  Globe,
  Gavel,
  BookOpen,
  Shield,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string; // Tailwind color class
  gradient: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Education",
    slug: "education",
    icon: GraduationCap,
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    description: "Legal education and academic insights",
  },
  {
    name: "Family",
    slug: "family",
    icon: Users,
    color: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-pink-500",
    description: "Family law and domestic matters",
  },
  {
    name: "Constitutional",
    slug: "constitutional",
    icon: Scale,
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-violet-500",
    description: "Constitutional law and fundamental rights",
  },
  {
    name: "Politics",
    slug: "politics",
    icon: Landmark,
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-red-500",
    description: "Political developments and policy analysis",
  },
  {
    name: "Technology",
    slug: "technology",
    icon: Laptop,
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
    description: "Technology law and digital rights",
  },
  {
    name: "ADR",
    slug: "adr",
    icon: Handshake,
    color: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-yellow-500",
    description: "Alternative Dispute Resolution and mediation",
  },
  {
    name: "Corporate",
    slug: "corporate",
    icon: Building2,
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-600 to-indigo-500",
    description: "Corporate law and business regulations",
  },
  {
    name: "International",
    slug: "international",
    icon: Globe,
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
    description: "International law and global affairs",
  },
  {
    name: "Criminal",
    slug: "criminal",
    icon: Gavel,
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-600 to-orange-500",
    description: "Criminal law and justice system",
  },
  {
    name: "Civil",
    slug: "civil",
    icon: FileText,
    color: "text-slate-600 dark:text-slate-400",
    gradient: "from-slate-500 to-gray-500",
    description: "Civil law and litigation matters",
  },
  {
    name: "Property",
    slug: "property",
    icon: Shield,
    color: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-500",
    description: "Property law and real estate",
  },
  {
    name: "Legal Studies",
    slug: "legal-studies",
    icon: BookOpen,
    color: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500 to-purple-500",
    description: "Legal research and scholarly articles",
  },
];

// Helper to get category by slug (case-insensitive)
export const getCategoryBySlug = (slug: string) => {
  return categories.find(
    (cat) => cat.slug.toLowerCase() === slug.toLowerCase()
  );
};

// Helper to get category by name (case-insensitive)
export const getCategoryByName = (name: string) => {
  return categories.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  );
};

// Helper to get all category names
export const getCategoryNames = () => {
  return categories.map((cat) => cat.name);
};

// Helper to get all category slugs
export const getCategorySlugs = () => {
  return categories.map((cat) => cat.slug);
};

// Helper to validate if a category exists
export const isCategoryValid = (categorySlugOrName: string): boolean => {
  const lowerInput = categorySlugOrName.toLowerCase();
  return categories.some(
    (cat) =>
      cat.slug.toLowerCase() === lowerInput ||
      cat.name.toLowerCase() === lowerInput
  );
};

// Helper to get category color classes
export const getCategoryColor = (categorySlugOrName: string): string => {
  const category =
    getCategoryBySlug(categorySlugOrName) ||
    getCategoryByName(categorySlugOrName);
  return category?.color || "text-gray-600 dark:text-gray-400";
};

// Helper to get category gradient
export const getCategoryGradient = (categorySlugOrName: string): string => {
  const category =
    getCategoryBySlug(categorySlugOrName) ||
    getCategoryByName(categorySlugOrName);
  return category?.gradient || "from-gray-500 to-slate-500";
};
