import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { cn } from "../../lib/utils"

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  className,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex w-full items-center justify-between rounded-md border-2 border-gray-200",
            "bg-transparent px-4 py-2 text-left text-sm outline-none",
            "shadow-sm hover:border-blue-400 focus:border-blue-500",
            "transition-all duration-200 h-10",
            !value && "text-gray-400", // Placeholder text color when no value
            className
          )}
        >
          <span className={!value ? "text-gray-400" : "text-gray-800"}>
            {value || `Select ${label}`}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full min-w-[12rem] bg-white/90 backdrop-blur-sm"
          align="start"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "cursor-pointer",
                value === option && "bg-blue-50 text-blue-600 font-medium"
              )}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}