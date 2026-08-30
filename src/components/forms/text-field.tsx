"use client";

type TextFieldProps = {
  autoComplete?: string;
  errorMessage?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
};

export function TextField({
  autoComplete,
  errorMessage,
  id,
  label,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-label={label}
        className="min-w-0 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
      />
      {errorMessage ? (
        <span id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
