import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-content">
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </div>

      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}

export default PageHeader;
