import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { useState } from "react";
  import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    CalendarIcon,
    PencilIcon,
  } from "lucide-react";
  
  export default function ReportTable() {
    const allData = [
      {
        report: "report-8782",
        label: "Documentation",
        title: "You can't compress the program without quantifying the open-source system.",
        status: "In Progress",
        date: "2024-05-01",
        editable: true,
      },
      {
        report: "report-7878",
        label: "Documentation",
        title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        status: "Backlog",
        date: "2024-04-15",
        editable: false,
      },
      {
        report: "report-7839",
        label: "Bug",
        title: "We need to bypass the neural TCP card!",
        status: "Todo",
        date: "2024-06-10",
        editable: true,
      },
      {
        report: "report-8686",
        label: "Feature",
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        status: "Canceled",
        date: "2024-03-27",
        editable: false,
      },
      {
        report: "report-1280",
        label: "Bug",
        title: "Use the digital TLS panel, then you can transmit the haptic system!",
        status: "Done",
        date: "2024-06-01",
        editable: true,
      },
      {
        report: "report-1138",
        label: "Feature",
        title: "Generating the driver won’t do anything, we need to quantify the 1080p output!",
        status: "In Progress",
        date: "2024-05-20",
        editable: false,
      },
      {
        report: "report-5160",
        label: "Documentation",
        title: "Calculating the bus won’t do anything, we need to navigate the back-end...",
        status: "In Progress",
        date: "2024-04-05",
        editable: true,
      },
    ];
  
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    const filteredData = allData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const statusIcon = {
      "In Progress": <ClockIcon className="h-4 w-4 text-blue-500" />,
      Backlog: <ClockIcon className="h-4 w-4 text-gray-400" />,
      Todo: <ClockIcon className="h-4 w-4 text-muted-foreground" />,
      Done: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
      Canceled: <XCircleIcon className="h-4 w-4 text-red-500" />,
    };
  
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-xl font-semibold">reports</h2> */}
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64"
          />
        </div>
  
        <Table className={`border-2 `}>
          <TableCaption>A list of your reports for this month.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.report}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="secondary" className="w-fit text-xs">
                      {item.label}
                    </Badge>
                    <p className="line-clamp-1 text-muted-foreground text-sm">{item.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">{statusIcon[item.status]} {item.status}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    {item.date}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.editable ? (
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 bg-black">
                      <PencilIcon className="h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <span className=" flex text-muted-foreground text-sm">Not Editable</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
  