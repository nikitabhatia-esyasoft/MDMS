import type { ReactNode } from "react";

import { Link } from "react-router-dom";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  trend?: "positive" | "negative" | "neutral";
  linkTo?: string;
  linkLabel?: string;
}

function StatCard({
  label,
  value,
  hint,
  icon,
  trend = "neutral",
  linkTo,
  linkLabel = "View details",
}: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>

        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>

      <div className="stat-card-value">{value}</div>

      {hint && <p className={`stat-card-hint trend-${trend}`}>{hint}</p>}

      {linkTo && (
        <Link to={linkTo} className="stat-card-link">
          {linkLabel}
        </Link>
      )}
    </article>
  );
}

export default StatCard;
