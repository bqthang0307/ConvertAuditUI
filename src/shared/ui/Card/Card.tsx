import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Card({ className = "", ...rest }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ${className}`}
      {...rest}
    />
  );
}
