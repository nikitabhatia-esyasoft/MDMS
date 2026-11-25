import {
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import type { Role } from "../types/role";

import "./layout.css";

function isRole(value: unknown): value is Role {
  return (
    value === "user" ||
    value === "zone" ||
    value === "enterprise"
  );
}

function getStoredRole(): Role {
  const storedRole = sessionStorage.getItem(
    "mdms-role"
  );

  return isRole(storedRole)
    ? storedRole
    : "user";
}

function AppLayout() {
  const location = useLocation();

  const segment = location.pathname.split("/")[1];

  const role: Role = isRole(segment)
    ? segment
    : getStoredRole();

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("mdms-role", role);
  }, [role]);

  function toggleSidebar() {
    if (window.innerWidth <= 768) {
      setMobileOpen((previous) => !previous);
    } else {
      setCollapsed((previous) => !previous);
    }
  }

  function closeMobileSidebar() {
    setMobileOpen(false);
  }

  return (
    <div className="app-layout">
      <Header
        role={role}
        onToggleSidebar={toggleSidebar}
      />

      <div className="app-body">
        {mobileOpen && (
          <button
            type="button"
            className="sidebar-overlay"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
          />
        )}

        <div
          className={`sidebar-wrapper ${
            mobileOpen ? "mobile-open" : ""
          }`}
        >
          <Sidebar
            role={role}
            collapsed={collapsed}
            onNavigate={closeMobileSidebar}
          />
        </div>

        <main className="main-content">
          <Suspense fallback={<p>Loading page...</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;