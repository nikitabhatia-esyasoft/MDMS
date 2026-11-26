import { createContext } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number
  ) => void;

  removeToast: (id: string) => void;
}

export const ToastContext =
  createContext<
    ToastContextType | undefined
  >(undefined);