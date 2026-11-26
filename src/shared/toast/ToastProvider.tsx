import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";

import { createPortal } from "react-dom";

import {
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  Info,
  X,
} from "lucide-react";

import { ToastContext } from "./ToastContext";

import type {
  ToastItem,
  ToastType,
} from "./ToastContext";

interface ToastProviderProps {
  children: ReactNode;
}

const toastIcons = {
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
};

function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] =
    useState<ToastItem[]>([]);

  const timersRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  const removeToast = useCallback(
    (id: string) => {
      setToasts((previous) =>
        previous.filter(
          (toast) => toast.id !== id
        )
      );

      const timer =
        timersRef.current.get(id);

      if (timer !== undefined) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    },
    []
  );

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = "info",
      duration = 4000
    ) => {
      const id = crypto.randomUUID();

      const toast: ToastItem = {
        id,
        message,
        type,
      };

      setToasts((previous) => [
        ...previous,
        toast,
      ]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, duration);

        timersRef.current.set(
          id,
          timer
        );
      }
    },
    [removeToast]
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });

      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
      }}
    >
      {children}

      {createPortal(
        <div className="toast-container">
          {toasts.map((toast) => {
            const Icon =
              toastIcons[toast.type];

            return (
              <div
                key={toast.id}
                className={`toast-item toast-${toast.type}`}
                role={
                  toast.type === "error"
                    ? "alert"
                    : "status"
                }
              >
                <Icon
                  size={22}
                  className="toast-icon"
                />

                <span className="toast-message">
                  {toast.message}
                </span>

                <button
                  type="button"
                  className="toast-close"
                  onClick={() =>
                    removeToast(toast.id)
                  }
                  aria-label="Dismiss notification"
                >
                  <X size={17} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;