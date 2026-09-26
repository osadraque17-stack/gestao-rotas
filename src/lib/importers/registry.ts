import type { RouteImporter } from "./types";
import { layoutAImporter } from "./layout-a";

class ImporterRegistry {
  private importers = new Map<string, RouteImporter>();

  register(importer: RouteImporter) {
    if (this.importers.has(importer.id)) {
      throw new Error(`Importer já registado: ${importer.id}`);
    }
    this.importers.set(importer.id, importer);
  }

  get(id: string) {
    return this.importers.get(id);
  }

  list() {
    return Array.from(this.importers.values());
  }
}

export const importerRegistry = new ImporterRegistry();

importerRegistry.register(layoutAImporter);