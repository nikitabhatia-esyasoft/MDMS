import type { ReactNode } from "react";

import TimeRangeToggle from "./TimeRangeToggle";

import type {
  TimeRange,
} from "./TimeRangeToggle";

import Loader from "./Loader";
import EmptyState from "./EmptyState";

interface ChartCardProps {
  title: string;
  subtitle?: string;

  range?: TimeRange;
  onRangeChange?: (range: TimeRange) => void;
  ranges?: TimeRange[];

  loading?: boolean;
  empty?: boolean;
  error?: string;

  height?: number;
  actions?: ReactNode;
  children: ReactNode;
}

function ChartCard({
  title,
  subtitle,

  range,
  onRangeChange,
  ranges,

  loading = false,
  empty = false,
  error,

  height = 300,
  actions,
  children,
}: ChartCardProps) {
  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <div>
          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>

        <div className="chart-card-actions">
          {range && onRangeChange && (
            <TimeRangeToggle
              value={range}
              onChange={onRangeChange}
              options={ranges}
            />
          )}

          {actions}
        </div>
      </div>

      <div
        className="chart-card-content"
        style={{ height }}
      >
        {loading ? (
          <Loader message="Loading chart..." />
        ) : error ? (
          <EmptyState
            title="Unable to load chart"
            description={error}
          />
        ) : empty ? (
          <EmptyState
            title="No chart data"
            description="No readings are available for this period."
          />
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export default ChartCard;