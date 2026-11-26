import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface Column<T extends object> {
  id: string;
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  sortKey?: string;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface RowAction<T extends object> {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  danger?: boolean;
  hidden?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
}