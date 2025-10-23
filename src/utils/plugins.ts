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
  status: "active" | "coming-soon" | "beta" | "deprecated" | "archived";
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
    comingSoon: plugins.filter((p) => p.status === "coming-soon").length,
    beta: plugins.filter((p) => p.status === "beta").length,
    categories: await getAllCategories(),
  };
}
