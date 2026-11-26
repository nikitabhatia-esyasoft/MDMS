export type Status =
  | "Active"
  | "Inactive"
  | "Deactivated"
  | "Pending"
  | "Paid"
  | "Overdue"
  | "Critical"
  | "Warning"
  | "Info"
  | "Success"
  | "Failed"
  | "Resolved"
  | "Unread"
  | "Read";

type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

const statusVariants: Record<Status, StatusVariant> = {
  Active: "success",
  Inactive: "neutral",
  Deactivated: "neutral",
  Pending: "warning",
  Paid: "success",
  Overdue: "danger",
  Critical: "danger",
  Warning: "warning",
  Info: "info",
  Success: "success",
  Failed: "danger",
  Resolved: "success",
  Unread: "info",
  Read: "neutral",
};

interface StatusBadgeProps {
  status: Status;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const variant = statusVariants[status];

  return (
    <span className={`status-badge status-${variant}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export default StatusBadge;
