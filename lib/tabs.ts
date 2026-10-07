import { CalendarDays, Home, User, type LucideIcon } from "lucide-react";
import type { TabKey } from "./types";

export const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "inicio", label: "Inicio", icon: Home },
  { key: "reservas", label: "Mis Reservas", icon: CalendarDays },
  { key: "perfil", label: "Perfil", icon: User },
];
