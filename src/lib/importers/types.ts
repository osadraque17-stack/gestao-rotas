import type { RoutePlan } from "@/lib/domain/route-plan";

export interface ImportContext {
  fileName: string;
  importedAt: string;
}

export interface ImportResult {
  importerId: string;
  importerVersion: string;
  plans: RoutePlan[];
  warnings: string[];
  errors: string[];
}

export interface RouteImporter {
  id: string;
  name: string;
  version: string;
  description: string;
  canHandle(input: unknown): boolean;
  parse(input: unknown, context: ImportContext): Promise<ImportResult>;
}