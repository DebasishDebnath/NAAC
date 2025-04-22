import * as React from "react"

import { cn } from "../../lib/utils.js"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "border-input flex h-10 w-full min-w-0 rounded-md border-2 bg-transparent px-4 py-2 text-base", 
        "  transition-all duration-200",
        "outline-none focus:outline-none ring-0 focus:ring-0",
        "focus:border-blue-500 dark:focus:border-blue-400",
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Input }