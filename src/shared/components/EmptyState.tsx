import type { ReactNode } from "react";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

function EmptyState({
  title = "No data available",
  description = "There is nothing to display.",
  icon = <Inbox size={36} />,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
