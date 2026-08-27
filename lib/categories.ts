import type { Category } from "./types";

/**
 * The category taxonomy (Full Project Description §20).
 * `slug` is used in URLs: /books/[category]
 */
export const CATEGORIES: Category[] = [
  // Programming
  { slug: "programming", label: "Programming", group: "Programming" },
  { slug: "software-engineering", label: "Software Engineering", group: "Programming" },

  // Web Development
  { slug: "web-development", label: "Web Development", group: "Web Development" },
  { slug: "html-css", label: "HTML & CSS", group: "Web Development" },
  { slug: "backend", label: "Backend Development", group: "Web Development" },

  // Languages
  { slug: "python", label: "Python", group: "Languages" },
  { slug: "javascript", label: "JavaScript", group: "Languages" },
  { slug: "typescript", label: "TypeScript", group: "Languages" },
  { slug: "c", label: "C", group: "Languages" },
  { slug: "cpp", label: "C++", group: "Languages" },
  { slug: "java", label: "Java", group: "Languages" },
  { slug: "csharp", label: "C#", group: "Languages" },
  { slug: "rust", label: "Rust", group: "Languages" },
  { slug: "go", label: "Go", group: "Languages" },
  { slug: "kotlin", label: "Kotlin", group: "Languages" },
  { slug: "swift", label: "Swift", group: "Languages" },

  // Computer Science
  { slug: "computer-science", label: "Computer Science", group: "Computer Science" },
  { slug: "algorithms", label: "Algorithms", group: "Computer Science" },
  { slug: "data-structures", label: "Data Structures", group: "Computer Science" },
  { slug: "operating-systems", label: "Operating Systems", group: "Computer Science" },
  { slug: "computer-architecture", label: "Computer Architecture", group: "Computer Science" },
  { slug: "networking", label: "Networking", group: "Computer Science" },

  // Data
  { slug: "databases", label: "Databases", group: "Data" },
  { slug: "sql", label: "SQL", group: "Data" },
  { slug: "data-engineering", label: "Data Engineering", group: "Data" },

  // AI
  { slug: "artificial-intelligence", label: "Artificial Intelligence", group: "AI" },
  { slug: "machine-learning", label: "Machine Learning", group: "AI" },
  { slug: "deep-learning", label: "Deep Learning", group: "AI" },
  { slug: "nlp", label: "Natural Language Processing", group: "AI" },
  { slug: "computer-vision", label: "Computer Vision", group: "AI" },

  // Infrastructure
  { slug: "linux", label: "Linux", group: "Infrastructure" },
  { slug: "devops", label: "DevOps", group: "Infrastructure" },
  { slug: "docker", label: "Docker", group: "Infrastructure" },
  { slug: "kubernetes", label: "Kubernetes", group: "Infrastructure" },
  { slug: "cloud", label: "Cloud Computing", group: "Infrastructure" },

  // Security
  { slug: "cybersecurity", label: "Cybersecurity", group: "Security" },
  { slug: "ethical-hacking", label: "Ethical Hacking", group: "Security" },
  { slug: "cryptography", label: "Cryptography", group: "Security" },

  // Engineering
  { slug: "system-design", label: "System Design", group: "Engineering" },
  { slug: "software-architecture", label: "Software Architecture", group: "Engineering" },
  { slug: "testing", label: "Testing", group: "Engineering" },
  { slug: "clean-code", label: "Clean Code", group: "Engineering" },
  { slug: "design-patterns", label: "Design Patterns", group: "Engineering" },
  { slug: "distributed-systems", label: "Distributed Systems", group: "Engineering" },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoriesByGroup(): Map<string, Category[]> {
  const map = new Map<string, Category[]>();
  for (const category of CATEGORIES) {
    const list = map.get(category.group) ?? [];
    list.push(category);
    map.set(category.group, list);
  }
  return map;
}
