/**
 * Plugin Utilities
 * Automatically discover and load all plugin JSON files using Vite's glob import
 */

// Define the plugin interface based on our schema
export interface Plugin {
  id: string;
  slug: string;
  name: string;
  version: string;
  author: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  status: "active" | "beta" | "coming-soon" | "idea-phase" | "deprecated" | "archived";
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
 * Load all plugins from the plugins directory using Vite's glob import
 * Returns an array of plugin objects
 */
export async function loadAllPlugins(): Promise<Plugin[]> {
  // Use Vite's glob import to get all JSON files except schema.json
  const pluginModules = import.meta.glob<{ default: Plugin }>(
    "../data/plugins/*.json",
    {
      eager: true,
    },
  );

  const plugins: Plugin[] = [];

  for (const [filepath, module] of Object.entries(pluginModules)) {
    // Skip schema.json
    if (filepath.includes("schema.json")) {
      continue;
    }

    const plugin = module.default;

    // Validate required fields
    if (plugin && plugin.id && plugin.slug && plugin.name && plugin.status) {
      plugins.push(plugin);
    } else {
      console.warn(`Plugin at ${filepath} is missing required fields`);
    }
  }

  // Sort by status (active first) and then by name
  return plugins.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Load all plugins and create a map by slug for easy lookup
 */
export async function loadPluginsMap(): Promise<Record<string, Plugin>> {
  const plugins = await loadAllPlugins();
  const pluginsMap: Record<string, Plugin> = {};

  for (const plugin of plugins) {
    pluginsMap[plugin.slug] = plugin;
  }

  return pluginsMap;
}

/**
 * Get a single plugin by slug
 */
export async function getPluginBySlug(slug: string): Promise<Plugin | null> {
  const pluginsMap = await loadPluginsMap();
  return pluginsMap[slug] || null;
}

/**
 * Get all plugin slugs for static path generation
 */
export async function getAllPluginSlugs(): Promise<string[]> {
  const plugins = await loadAllPlugins();
  return plugins.map((p) => p.slug);
}

/**
 * Filter plugins by status
 */
export async function getPluginsByStatus(
  status: Plugin["status"],
): Promise<Plugin[]> {
  const plugins = await loadAllPlugins();
  return plugins.filter((p) => p.status === status);
}

/**
 * Filter plugins by category
 */
export async function getPluginsByCategory(
  category: string,
): Promise<Plugin[]> {
  const plugins = await loadAllPlugins();
  return plugins.filter((p) => p.category === category);
}

/**
 * Get all unique categories from plugins
 */
export async function getAllCategories(): Promise<string[]> {
  const plugins = await loadAllPlugins();
  const categories = new Set(plugins.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Get plugin statistics
 */
export async function getPluginStats() {
  const plugins = await loadAllPlugins();

  return {
    total: plugins.length,
    active: plugins.filter((p) => p.status === "active").length,
    beta: plugins.filter((p) => p.status === "beta").length,
    comingSoon: plugins.filter((p) => p.status === "coming-soon").length,
    ideaPhase: plugins.filter((p) => p.status === "idea-phase").length,
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
  return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default;
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
export function getStatusInfo(status: Plugin["status"]) {
  return STATUS_COLORS[status] || STATUS_COLORS["coming-soon"];
}

/**
 * Group plugins by status
 */
export async function getPluginsByStatusGroups() {
  const plugins = await loadAllPlugins();

  return {
    active: plugins.filter((p) => p.status === "active"),
    beta: plugins.filter((p) => p.status === "beta"),
    comingSoon: plugins.filter((p) => p.status === "coming-soon"),
    ideaPhase: plugins.filter((p) => p.status === "idea-phase"),
    deprecated: plugins.filter((p) => p.status === "deprecated"),
    archived: plugins.filter((p) => p.status === "archived"),
  };
}
