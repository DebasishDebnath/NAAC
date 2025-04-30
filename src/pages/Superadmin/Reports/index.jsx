import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { UseReportsAdmin } from "@/Apis/Superadmin/Reportss/ReportsAdmin";

const statusColors = {
  Approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function UserTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const navigate = useNavigate();

  // Function to view report details
  const handleViewReport = (userId) => {
    if (!userId) return;
    
    // Use absolute path starting with / to ensure consistent navigation
    navigate(`/superadmin/reports/${userId}`);
  };

  const { ReportsAdmin } = UseReportsAdmin();

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Define columns
  const columns = React.useMemo(() => [
    {
      accessorKey: "obtainedScore",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-base font-semibold text-white"
        >
          Score <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-indigo-700 text-center">
          {row.original.obtainedScore?.toFixed(1) || "0"}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-semibold text-black truncate max-w-xs">
          {row.original.user?.name || "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-400">
          {row.original.user?.department || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-400">
          {row.original.user?.designation || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "emailId",
      header: "Email address",
      cell: ({ row }) => (
        <div className="text-blue-500 underline lowercase dark:text-blue-400 truncate max-w-xs">
          {row.original.user?.emailId || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-400">
          {formatDate(row.original.createdAt)}
        </div>
      ),
    },
    {
      accessorKey: "is_submitted",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.is_submitted;
        return (
          <span
            className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
          >
            {status}
          </span>
        );
      },
    },
  ], []);
  
  // Fetch data when page changes
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Default status is now hardcoded to "Approved" or can be changed in your API function
        const response = await ReportsAdmin(currentPage);
        
        if (response && response.success && response.data) {
          // The data is in response.data.data
          setData(response.data.data || []);
          // Set total pages from the response
          setTotalPages(response.data.pages || 1);
        } else {
          console.warn("Invalid API response format:", response);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg bg-white text-black dark:text-black">
        <Table>
          <TableHeader className="bg-[#002946]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm font-bold text-white dark:text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className="text-sm font-bold text-white dark:text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-500 dark:text-black"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`
                    ${
                      index % 2 === 0
                        ? "bg-white dark:text-black"
                        : "bg-gray-50 dark:text-black"
                    }
                    hover:bg-blue-50 
                    transition-colors duration-200
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm py-4 px-4 whitespace-nowrap text-black"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="text-sm py-4 px-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        onClick={() => handleViewReport(row.original.user?._id)}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-500 dark:text-black"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="border-gray-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage >= totalPages || loading}
            className="border-gray-300"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};