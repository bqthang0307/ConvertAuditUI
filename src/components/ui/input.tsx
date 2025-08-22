import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-[487px] h-[57px] rounded-xl px-4 py-4 border border-gray-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "placeholder:text-gray-400",
        "transition-all duration-200",
        "bg-transparent text-base",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500",
        className
      )}
      style={{
        gap: '10px',
        opacity: 1,
        borderWidth: '1px'
      }}
      {...props}
    />
  )
}

export { Input }
