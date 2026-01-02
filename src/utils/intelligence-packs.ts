/**
 * Intelligence Pack Utilities
 * Automatically discover and load all intelligence pack JSON files using Vite's glob import
 */

// Define the intelligence pack interface based on our schema
export interface IntelligencePack {
  id: string;
  slug: string;
  name: string;
  version: string;
  author: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  status:
    | "active"
    | "beta"
    | "coming-soon"
    | "idea-phase"
    | "deprecated"
    | "archived";
  features?: string[];
  pricing?: {
    free?: {
      available: boolean;
      limits?: string;
      features?: string[];
    };
    pro?: {
      price?: string;
      features?: string[];
    };
    enterprise?: {
      price?: string;
      features?: string[];
    };
  };
  installation?: {
    command: string;
    requirements?: string[];
  };
  quickstart?: Array<{
    step: number;
    title: string;
    command: string;
    description?: string;
  }>;
  commands?: Array<{
    name: string;
    description: string;
    usage?: string;
  }>;
  links?: {
    documentation?: string;
    repository?: string;
    support?: string;
    website?: string;
  };
  sourceCode?: boolean;
  repository?: {
    url: string;
    type: string;
    license: string;
  };
}

/**
 * Load all intelligence packs from the intelligence-packs directory using Vite's glob import
 * Returns an array of intelligence pack objects
 */
export async function loadAllIntelligencePacks(): Promise<IntelligencePack[]> {
  // Use Vite's glob import to get all JSON files except schema.json
  const packModules = import.meta.glob<{ default: IntelligencePack }>(
    "../data/intelligence-packs/*.json",
    {
      eager: true,
    },
  );

  const packs: IntelligencePack[] = [];

  for (const [filepath, module] of Object.entries(packModules)) {
    // Skip schema.json
    if (filepath.includes("schema.json")) {
      continue;
    }

    const pack = module.default;

    // Validate required fields
    if (pack && pack.id && pack.slug && pack.name && pack.status) {
      packs.push(pack);
    } else {
      console.warn(
        `Intelligence pack at ${filepath} is missing required fields`,
      );
    }
  }

  // Sort by status (active first) and then by name
  return packs.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Load all intelligence packs and create a map by slug for easy lookup
 */
export async function loadIntelligencePacksMap(): Promise<
  Record<string, IntelligencePack>
> {
  const packs = await loadAllIntelligencePacks();
  const packsMap: Record<string, IntelligencePack> = {};

  for (const pack of packs) {
    packsMap[pack.slug] = pack;
  }

  return packsMap;
}

/**
 * Get a single intelligence pack by slug
 */
export async function getIntelligencePackBySlug(
  slug: string,
): Promise<IntelligencePack | null> {
  const packsMap = await loadIntelligencePacksMap();
  return packsMap[slug] || null;
}

/**
 * Get all intelligence pack slugs for static path generation
 */
export async function getAllIntelligencePackSlugs(): Promise<string[]> {
  const packs = await loadAllIntelligencePacks();
  return packs.map((p) => p.slug);
}

/**
 * Filter intelligence packs by status
 */
export async function getIntelligencePacksByStatus(
  status: IntelligencePack["status"],
): Promise<IntelligencePack[]> {
  const packs = await loadAllIntelligencePacks();
  return packs.filter((p) => p.status === status);
}

/**
 * Filter intelligence packs by category
 */
export async function getIntelligencePacksByCategory(
  category: string,
): Promise<IntelligencePack[]> {
  const packs = await loadAllIntelligencePacks();
  return packs.filter((p) => p.category === category);
}

/**
 * Get all unique categories from intelligence packs
 */
export async function getAllCategories(): Promise<string[]> {
  const packs = await loadAllIntelligencePacks();
  const categories = new Set(packs.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Get intelligence pack statistics
 */
export async function getIntelligencePackStats() {
  const packs = await loadAllIntelligencePacks();

  return {
    total: packs.length,
    active: packs.filter((p) => p.status === "active").length,
    beta: packs.filter((p) => p.status === "beta").length,
    comingSoon: packs.filter((p) => p.status === "coming-soon").length,
    ideaPhase: packs.filter((p) => p.status === "idea-phase").length,
    categories: await getAllCategories(),
  };
}

/**
 * Category color mapping for visual differentiation
 */
export const CATEGORY_COLORS = {
  finance: {
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    accent: "emerald-500",
    hover: "hover:border-emerald-500/50",
  },
  productivity: {
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    accent: "blue-500",
    hover: "hover:border-blue-500/50",
  },
  analytics: {
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    accent: "purple-500",
    hover: "hover:border-purple-500/50",
  },
  security: {
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    accent: "red-500",
    hover: "hover:border-red-500/50",
  },
  automation: {
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    accent: "amber-500",
    hover: "hover:border-amber-500/50",
  },
  default: {
    badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    accent: "gray-500",
    hover: "hover:border-gray-500/50",
  },
} as const;

/**
 * Get category color classes
 */
export function getCategoryColors(category: string) {
  return (
    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    CATEGORY_COLORS.default
  );
}

/**
 * Status color mapping
 */
export const STATUS_COLORS = {
  active: {
    badge: "bg-status-success/20 text-status-success border-status-success/30",
    text: "Active",
  },
  beta: {
    badge: "bg-status-warning/20 text-status-warning border-status-warning/30",
    text: "Beta",
  },
  "coming-soon": {
    badge: "bg-huitzo-accent/20 text-huitzo-accent border-huitzo-accent/30",
    text: "Coming Soon",
  },
  "idea-phase": {
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    text: "Idea Phase",
  },
  deprecated: {
    badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    text: "Deprecated",
  },
  archived: {
    badge: "bg-gray-600/20 text-gray-500 border-gray-600/30",
    text: "Archived",
  },
} as const;

/**
 * Get status display info
 */
export function getStatusInfo(status: IntelligencePack["status"]) {
  return STATUS_COLORS[status] || STATUS_COLORS["coming-soon"];
}

/**
 * Group intelligence packs by status
 */
export async function getIntelligencePacksByStatusGroups() {
  const packs = await loadAllIntelligencePacks();

  return {
    active: packs.filter((p) => p.status === "active"),
    beta: packs.filter((p) => p.status === "beta"),
    comingSoon: packs.filter((p) => p.status === "coming-soon"),
    ideaPhase: packs.filter((p) => p.status === "idea-phase"),
    deprecated: packs.filter((p) => p.status === "deprecated"),
    archived: packs.filter((p) => p.status === "archived"),
  };
}
