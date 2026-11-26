export type TimeRange =
  | "day"
  | "week"
  | "month"
  | "year";

const rangeLabels: Record<TimeRange, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

interface TimeRangeToggleProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  options?: TimeRange[];
}

function TimeRangeToggle({
  value,
  onChange,
  options = [
    "day",
    "week",
    "month",
    "year",
  ],
}: TimeRangeToggleProps) {
  return (
    <div
      className="time-range-toggle"
      role="group"
      aria-label="Chart time range"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={`time-range-button ${
            value === option
              ? "time-range-active"
              : ""
          }`}
          onClick={() => onChange(option)}
        >
          {rangeLabels[option]}
        </button>
      ))}
    </div>
  );
}

export default TimeRangeToggle;