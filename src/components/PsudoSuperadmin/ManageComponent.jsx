import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { MdEditSquare } from "react-icons/md";
import { useHttp } from "@/hooks/useHttp";

// const mockData = [
//   {
//     name: "Alice Smith",
//     email: "alice@example.com",
//     category: "IEMS",
//     tableName: "Online AI Courses",
//     status: "Pending",
//   },
//   {
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     category: "UEM",
//     tableName: "Contribution to development of E-Content module in Complete Course / E-Book (at least one quadrant)",
//     status: "Pending",
//   },
//   {
//     name: "Charlie Lee",
//     email: "charlie@example.com",
//     category: "IEMN",
//     tableName: "Course Coordinator for MOOCs",
//     status: "Pending",
//   },
// ];

const statusColor = {
  Review: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function ManageComponent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [mockData, setMockData] = useState([]);
  const { getReq } = useHttp();
  const token = sessionStorage.getItem("token");

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? item.category === filter : true)
  );

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getReq("api/v2/pseudoUser/getAllUser", token);
        console.log("jhvjfvn", response);
        if (response.success) {
          setMockData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="text-2xl font-semibold mb-2">All Submissions</div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-blue-300 focus-visible:ring-blue-500"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {filter || "Filter Category"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`bg-white z-50`}>
            {["IEMS", "IEMN", "UEM"].map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setFilter(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => setFilter("")}>
              Clear Filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-md overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-[#002946]">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Category</TableHead>
              {/* <TableHead className="text-white">Table Name</TableHead> */}
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.campus}</TableCell>
                {/* <TableCell>{item.tableName}</TableCell> */}
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColor[item.is_submitted]
                    }`}
                  >
                    {item.is_submitted}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-100"
                  >
                    <MdEditSquare className="w-4 h-4" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
