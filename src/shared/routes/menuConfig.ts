import {
  LayoutDashboard,
  Receipt,
  Gauge,
  Bell,
  Users,
  ChartNoAxesCombined,
  Settings,
  MapPin,
  ClipboardList,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Role } from "../types/role";

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const menuConfig: Record<Role, MenuItem[]> = {
  user: [
    {
      label: "Dashboard",
      path: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Bills & Payments",
      path: "/user/bills",
      icon: Receipt,
    },
    {
      label: "Meter Data",
      path: "/user/meter-data",
      icon: Gauge,
    },
    {
      label: "Alerts",
      path: "/user/alerts",
      icon: Bell,
    },
  ],

  zone: [
    {
      label: "Dashboard",
      path: "/zone/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Meter Management",
      path: "/zone/meters",
      icon: Gauge,
    },
    {
      label: "User Management",
      path: "/zone/users",
      icon: Users,
    },
    {
      label: "Reports & Analytics",
      path: "/zone/reports",
      icon: ChartNoAxesCombined,
    },
    {
      label: "Alerts",
      path: "/zone/alerts",
      icon: Bell,
    },
    {
      label: "Settings",
      path: "/zone/settings",
      icon: Settings,
    },
  ],

  enterprise: [
    {
      label: "Dashboard",
      path: "/enterprise/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Zone Management",
      path: "/enterprise/zones",
      icon: MapPin,
    },
    {
      label: "Meter Management",
      path: "/enterprise/meters",
      icon: Gauge,
    },
    {
      label: "User & Role Management",
      path: "/enterprise/users",
      icon: Users,
    },
    {
      label: "Reports & Analytics",
      path: "/enterprise/reports",
      icon: ChartNoAxesCombined,
    },
    {
      label: "Alerts",
      path: "/enterprise/alerts",
      icon: Bell,
    },
    {
      label: "Audit Logs",
      path: "/enterprise/audit-logs",
      icon: ClipboardList,
    },
    {
      label: "Settings",
      path: "/enterprise/settings",
      icon: Settings,
    },
  ],
};