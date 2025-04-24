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
    FilterIcon,
} from "lucide-react";


const DraftsTable = () => {
    const allData = [
        // ... your existing data will go here
        {
            report: "REP001",
            label: "Finance",
            title: "Q1 Financial Review",
            status: "Done",
            date: "2023-04-01",
            editable: false
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: false
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: false
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: false
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: false
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        {
            report: "REP002",
            label: "Marketing",
            title: "Campaign Performance Analysis",
            status: "In Progress",
            date: "2023-04-12",
            editable: true
        },
        // Add more sample data for testing
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileView, setIsMobileView] = useState(false);
    const itemsPerPage = 5;

    // Check for mobile view on component mount and window resize
    useState(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        // Initial check
        checkMobileView();

        // Add event listener
        window.addEventListener("resize", checkMobileView);

        // Cleanup
        return () => window.removeEventListener("resize", checkMobileView);
    }, []);

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

    // Mobile card view for each row
    const MobileCard = ({ item }) => (
        <div className="bg-white p-4 rounded-md border mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs ">
                    {item.label}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                    {statusIcon[item.status]}
                    <span className="text-sm">{item.status}</span>
                </div>
            </div>

            <h3 className="font-medium mb-1">{item.title}</h3>

            <div className="text-xs text-muted-foreground mb-3">
                <span className="font-medium">ID:</span> {item.report}
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {item.date}
            </div>

            <div className="border-t pt-3">
                {item.editable ? (
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-1">
                        <PencilIcon className="h-4 w-4" /> Edit
                    </Button>
                ) : (
                    <span className="flex justify-center text-muted-foreground text-sm">Not Editable</span>
                )}
            </div>
        </div>
    );
    return (
        <div className="p-3 md:p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <Input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:max-w-xs"
                />
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <FilterIcon className="h-4 w-4 mr-2" /> Filter
                </Button>
            </div>

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
                <Table>
                    <TableCaption>A list of your reports for this month.</TableCaption>
                    <TableHeader>
                        <TableRow className={`bg-blue-500 `}>
                            <TableHead className={`text-black`}>ID</TableHead>
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
                                        <p className="line-clamp-1 text-sm">{item.title}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm">
                                        {statusIcon[item.status]} {item.status}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        {item.date}
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    {item.editable ? (
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1 bg-black">
                                            <PencilIcon className="h-4 w-4 " /> Edit
                                        </Button>
                                    ) : (
                                        <span className="text-muted-foreground text-sm font-bold">Not Editable</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
                {paginatedData.length > 0 ? (
                    paginatedData.map((item, i) => (
                        <MobileCard key={i} item={item} />
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No reports found
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                <span className="text-sm text-muted-foreground order-2 sm:order-1">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <div className="space-x-2 order-1 sm:order-2 w-full sm:w-auto flex justify-center">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex-1 sm:flex-auto"
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="flex-1 sm:flex-auto"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DraftsTable
