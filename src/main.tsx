import { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import router from "./app/routes";

import ThemeProvider from "./shared/theme/ThemeProvider";

import "./shared/theme/theme.css";

import "./index.css";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<p>Loading page...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);