import { useId } from "react";

import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

function Select({
  label,
  options,
  error,
  placeholder,
  id,
  required,
  className = "",
  ...props
}: SelectProps) {
  const generatedId = useId();

  const selectId = id ?? generatedId;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required-mark"> *</span>}
        </label>
      )}

      <select
        {...props}
        id={selectId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`form-input ${error ? "form-input-error" : ""} ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span id={`${selectId}-error`} className="form-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default Select;
