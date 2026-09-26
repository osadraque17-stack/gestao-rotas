export type RoutePlanStatus = "draft" | "validated" | "published" | "archived";

export interface RoutePlan {
  id: string;
  planDate: string;
  driverCode?: string;
  vehicleCode?: string;
  zone?: string;
  cycle?: string;
  priority?: string;
  stops: RouteStop[];
  status: RoutePlanStatus;
  sourceImporter: string;
  sourceVersion: string;
}

export interface RouteStop {
  sequence: number;
  customerCode?: string;
  customerName?: string;
  address?: string;
  postalCode?: string;
  notes?: string;
  raw?: Record<string, unknown>;
}