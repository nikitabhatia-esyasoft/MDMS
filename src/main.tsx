import { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import router from "./app/routes";

import ThemeProvider from "./shared/theme/ThemeProvider";

import ToastProvider from "./shared/toast/ToastProvider";

import Loader from "./shared/components/Loader";

import "./shared/theme/theme.css";

import "./index.css";

import "./shared/components/components.css";

import "./shared/components/advanced.css";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <Suspense
          fallback={
            <Loader
              fullPage
              message="Loading MDMS..."
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);