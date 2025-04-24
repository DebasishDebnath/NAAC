import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data = [
  {
    id: "1",
    score: 92,
    name: "John Doe",
    email: "john@example.com",
    date: "2025-04-20",
    status: "active",
    role: "Proffesor",
  },
  {
    id: "2",
    score: 76,
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2025-04-18",
    status: "pending",
    role: "user",
  },
  {
    id: "3",
    score: 59,
    name: "Alan Walker",
    email: "alan@example.com",
    date: "2025-04-15",
    status: "inactive",
    role: "user",
  },
];

const columns = [
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Score <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("score")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

    //   return (
    //     <DropdownMenu className={`z-10`}>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <MoreHorizontal />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem
    //           onClick={() => navigator.clipboard.writeText(user.id)}
    //         >
    //           Copy ID
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>View Profile</DropdownMenuItem>
    //         <DropdownMenuItem>Send Email</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    },
  },
];

export default function UserTable() {
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="w-full overflow-auto rounded-md border border-gray-300 dark:border-gray-400 text-black dark:text-white bg-white dark:bg-zinc-400">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
