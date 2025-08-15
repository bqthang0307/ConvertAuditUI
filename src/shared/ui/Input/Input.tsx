import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({ label, hint, error, className = "", ...rest }: Props) {
  return (
    <label className="block">
      {label && <div className="mb-2 text-sm font-semibold text-gray-700">{label}</div>}
      <input
        className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:ring-2
        ${error ? "border-red-300 ring-red-100" : "border-gray-200 focus:ring-blue-100"} ${className}`}
        {...rest}
      />
      {hint && <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span>ⓘ</span>
        <span>{hint}</span>
      </div>}
      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </label>
  );
}