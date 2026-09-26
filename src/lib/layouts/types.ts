import type { RoutePlan } from "@/lib/domain/route-plan";

export interface OutputLayout {
  id: string;
  name: string;
  channel: "whatsapp" | "app";
  version: string;
  render(plan: RoutePlan): string;
}