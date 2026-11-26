import { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import router from "./app/routes";

import ThemeProvider from "./shared/theme/ThemeProvider";

import "./shared/theme/theme.css";
import "./shared/components/components.css";

import "./index.css";
import Loader from "./shared/components/Loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<Loader fullPage message="Loading MDMS..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
);
