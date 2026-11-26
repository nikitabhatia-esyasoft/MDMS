import { useEffect, useRef, useState } from "react";

import {
  Menu,
  Zap,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  UserCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import type { Role } from "../types/role";
import { useTheme } from "../theme/useTheme";

interface HeaderProps {
  role: Role;
  onToggleSidebar: () => void;
}

function Header({
  role,
  onToggleSidebar,
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const [language, setLanguage] = useState("en");

  const { theme, toggleTheme } = useTheme();

  const profileRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const unreadCount = 3;

  const alertsPath = `/${role}/alerts`;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        event.target instanceof Node &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  function handleLogout() {
    setProfileOpen(false);

    navigate("/login", { replace: true });
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="icon-button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        <Link
          to={`/${role}/dashboard`}
          className="brand"
        >
          <div className="brand-icon">
            <Zap size={22} />
          </div>

          <span>MDMS</span>
        </Link>
      </div>

      <div className="header-right">
        <Link
          to={alertsPath}
          className="icon-button notification-button"
          aria-label={`${unreadCount} unread notifications`}
        >
          <Bell size={21} />

          <span className="notification-count">
            {unreadCount}
          </span>
        </Link>

        <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
            title={
                theme === "light"
                    ? "Dark mode"
                    : "Light mode"
                }
        >
        {theme === "light" ? (
            <Moon size={21} />
            ) : (
            <Sun size={21} />
        )}
        </button>

        <select
          className="language-select"
          aria-label="Language"
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value)
          }
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="kn">KN</option>
        </select>

        <div
          className="profile-container"
          ref={profileRef}
        >
          <button
            type="button"
            className="profile-button"
            aria-label="Profile menu"
            aria-expanded={profileOpen}
            onClick={() =>
              setProfileOpen((previous) => !previous)
            }
          >
            <UserCircle size={28} />

            <ChevronDown size={15} />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <Link
                to="/profile?tab=profile"
                onClick={() => setProfileOpen(false)}
              >
                <User size={17} />
                Profile
              </Link>

              <Link
                to="/profile?tab=security"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={17} />
                Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;