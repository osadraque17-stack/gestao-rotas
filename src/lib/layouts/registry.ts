import type { OutputLayout } from "./types";

class OutputLayoutRegistry {
  private layouts = new Map<string, OutputLayout>();

  register(layout: OutputLayout) {
    if (this.layouts.has(layout.id)) {
      throw new Error(`Layout já registado: ${layout.id}`);
    }
    this.layouts.set(layout.id, layout);
  }

  get(id: string) {
    return this.layouts.get(id);
  }

  list() {
    return Array.from(this.layouts.values());
  }
}

export const outputLayoutRegistry = new OutputLayoutRegistry();