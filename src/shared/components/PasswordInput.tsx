import { useState } from "react";

import type { ComponentProps } from "react";

import { Eye, EyeOff } from "lucide-react";

import Input from "./Input";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type">;

function PasswordInput({ className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`password-input ${className}`}
      />

      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((previous) => !previous)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        disabled={props.disabled}
      >
        {visible ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  );
}

export default PasswordInput;
