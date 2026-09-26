import type { RouteImporter } from "../types";

export const layoutAImporter: RouteImporter = {
  id: "layout-a",
  name: "Excel Layout A",
  version: "0.1.0",
  description: "Importador inicial para o formato Excel atualmente utilizado.",
  canHandle(input) {
    return Boolean(input);
  },
  async parse(_input, _context) {
    return {
      importerId: "layout-a",
      importerVersion: "0.1.0",
      plans: [],
      warnings: ["O parser do Layout A será implementado a partir do ficheiro Excel real."],
      errors: []
    };
  }
};