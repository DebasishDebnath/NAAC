import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

const categoryData = {
  CategoryI: ["Teaching Duties"],
  CategoryII: [
    "Journal Publications",
    "Books Publication",
    "Books Chapter / Conference Proceedings",
    "Editor of Book",
    "Translation Work",
    "Consultancy",
    "Patent Status",
    "Research Project",
    "Award/Fellowship",
    "Event Organiser / Participation",
    "Development of Innovative Pedagogy",
    "Design of New Curriculam and Courses (ICT Based)",
    "Development of Complete MOOC's in 4 Quadrant (4 Credit Course)",
    "MOOCs (development in 4 quadrant) per module / lecture",
    "Content Writer/Subject Matter Expert for each Module of MOOCs (At Least One Quadrant)",
    "Course Coordinator for MOOCs",
    "Development of E-Content in 4 quadrants for a Complete Course / E-Book",
    "E-Content (developed in 4 quadrants) Per Module",
    "Contribution to development of E-Content module in Complete Course / E-Book (at least one quadrant)",
    "Editor of E-Content for Complete Course / E-Book",
    "Status as Guide - Ph.D. Guidance (Degree Awarded)",
    "Status as Guide - Ph.D. Guidance (for Pursuing Students)",
    "M.Phil./P.G Dissertation Guidance",
    "Online AI Courses",
  ],
};

const dummyReports = [
  { id: "1", date: "2025-04-20", status: "accepted" },
  { id: "2", date: "2025-04-18", status: "pending" },
  { id: "3", date: "2025-04-15", status: "rejected" },
  { id: "5", date: "2025-04-28", status: "pending" },
  { id: "10", date: "2025-04-02", status: "pending" },
  { id: "17", date: "2025-04-26", status: "pending" },
  { id: "40", date: "2025-04-22", status: "pending" },
  { id: "400", date: "2025-04-25", status: "pending" },
  { id: "47", date: "2025-04-27", status: "pending" },
  { id: "45", date: "2025-04-30", status: "pending" },
];

const SubmittedReportsTable = () => {
  const [category, setCategory] = useState("CategoryI");
  const [tableName, setTableName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterStatus, sortAsc]);

  const filteredReports = useMemo(() => {
    return dummyReports
      .filter((report) =>
        report.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((report) =>
        filterStatus ? report.status === filterStatus : true
      )
      .sort((a, b) =>
        sortAsc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [searchTerm, filterStatus, sortAsc]);
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(start, start + itemsPerPage);
  }, [filteredReports, currentPage]);

  useEffect(() => {
    setTableName("");
  }, [category]);

  return (
    <div className=" mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600">
        Submitted Reports
      </h1>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="border border-gray-300 p-2 rounded-md shadow-sm text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(categoryData).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 p-2 rounded-md shadow-sm text-sm min-w-[280px] md:min-w-[400px] lg:min-w-[600px]"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          >
            <option value="">Select Table</option>
            {categoryData[category].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>

        <Input
          placeholder="🔍 Search by ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px] shadow-sm"
        />
      </div>

      <div className="flex gap-4 justify-start">
        {["All", "accepted", "rejected", "pending"].map((status) => (
          <Button
            key={status}
            variant={
              filterStatus === (status === "All" ? "" : status)
                ? "default"
                : "outline"
            }
            onClick={() => setFilterStatus(status === "All" ? "" : status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border overflow-auto shadow-sm">
        <Table>
          <TableHeader className="bg-blue-500">
            <TableRow>
              <TableHead className="text-sm font-semibold text-white">
                ID
              </TableHead>
              <TableHead className="text-sm font-semibold text-white">
                Category
              </TableHead>
              <TableHead className="text-sm font-semibold text-white">
                Table Name
              </TableHead>
              <TableHead
                className="text-sm font-semibold text-white cursor-pointer select-none"
                onClick={() => setSortAsc(!sortAsc)}
              >
                Date
                {sortAsc ? (
                  <ChevronUp className="inline-block ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="inline-block ml-1 h-4 w-4" />
                )}
              </TableHead>
              <TableHead className="text-sm font-semibold text-white">
                Status
              </TableHead>
              <TableHead className="text-sm font-semibold text-white">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow
                key={report.id}
                className="hover:bg-blue-100 transition-all"
              >
                <TableCell>{report.id}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{tableName || "N/A"}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell className="capitalize ">{report.status}</TableCell>
                <TableCell>
                  {report.status === "rejected" ? (
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm">
                        <div>
                          <MdOutlineEdit color="black" />
                        </div>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <div>
                          <MdDelete color="red" />
                        </div>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2 select-none">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {currentPage} of{" "}
          {Math.ceil(filteredReports.length / itemsPerPage)}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((p) =>
              p < Math.ceil(filteredReports.length / itemsPerPage) ? p + 1 : p
            )
          }
          disabled={
            currentPage >= Math.ceil(filteredReports.length / itemsPerPage)
          }
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SubmittedReportsTable;
