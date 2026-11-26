import { useId } from "react";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

function Input({
  label,
  error,
  helperText,
  id,
  required,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();

  const inputId = id ?? generatedId;

  const descriptionId = `${inputId}-description`;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}

          {required && <span className="required-mark"> *</span>}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error || helperText ? descriptionId : undefined}
        className={`form-input ${error ? "form-input-error" : ""} ${className}`}
      />

      {(error || helperText) && (
        <span
          id={descriptionId}
          className={error ? "form-error" : "form-helper"}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

export default Input;
