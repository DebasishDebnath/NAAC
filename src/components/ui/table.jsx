import * as React from "react";
import { cn } from "@/lib/utils";

// Table component with base styling
function Table({
  className,
  ...props
}) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm text-gray-700 shadow-lg rounded-lg", className)}
        {...props}
      />
    </div>
  );
}

// TableHeader with sleek borders and hover effect
function TableHeader({
  className,
  ...props
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white", className)}
      {...props}
    />
  );
}

// TableBody with smooth row transitions
function TableBody({
  className,
  ...props
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

// TableFooter with gradient and a soft background
function TableFooter({
  className,
  ...props
}) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gradient-to-r from-indigo-100 to-indigo-200 border-t font-medium",
        className
      )}
      {...props}
    />
  );
}

// TableRow with hover effect and subtle transition
function TableRow({
  className,
  ...props
}) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors hover:bg-indigo-50 cursor-pointer rounded-xl border-b border-gray-200",
        className
      )}
      {...props}
    />
  );
}

// TableHead with improved font and padding for better readability
function TableHead({
  className,
  ...props
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-neutral-950 text-lg font-semibold p-4 text-left align-middle whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

// TableCell with added padding and soft borders for visual flow
function TableCell({
  className,
  ...props
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle whitespace-nowrap border-t border-b border-gray-100",
        className
      )}
      {...props}
    />
  );
}

// TableCaption with subtle text styling and spacing
function TableCaption({
  className,
  ...props
}) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-gray-600 mt-4 text-sm italic", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
