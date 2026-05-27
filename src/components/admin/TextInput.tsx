import { useState } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  type?: "text" | "email" | "url";
}

export function TextInput({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  required,
  helperText,
  type = "text",
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-charcoal/40 border rounded px-3 py-2 text-cream text-sm transition-all ${
          isFocused ? "border-amber-gold/80 bg-charcoal/60" : "border-amber-gold/30 hover:border-amber-gold/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} focus:outline-none`}
      />

      {helperText && <p className="text-[10px] text-cream/50">{helperText}</p>}
    </div>
  );
}
