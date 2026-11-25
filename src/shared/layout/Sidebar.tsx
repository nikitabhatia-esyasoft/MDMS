import { NavLink } from "react-router-dom";
import { menuConfig } from "../routes/menuConfig";
import type { Role } from "../types/role";

interface SidebarProps {
  role: Role;
  collapsed: boolean;
  onNavigate: () => void;
}

function Sidebar({
  role,
  collapsed,
  onNavigate,
}: SidebarProps) {
  const items = menuConfig[role];

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-role">
        {role === "user"
          ? "Consumer Portal"
          : role === "zone"
            ? "Zone Administration"
            : "Enterprise Administration"}
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              aria-label={item.label}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />

              <span className="sidebar-label">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        MDMS
      </div>
    </aside>
  );
}

export default Sidebar;