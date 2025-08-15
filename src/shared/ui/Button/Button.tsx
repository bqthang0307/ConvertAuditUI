import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export default function Button({ variant = "primary", loading, className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-95"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200";
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {loading ? "Loading..." : children}
    </button>
  );
}