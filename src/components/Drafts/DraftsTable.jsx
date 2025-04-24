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
import { useState, useEffect } from "react";
import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    CalendarIcon,
    PencilIcon,
    FilterIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    XIcon,
    Trash2Icon,
    FileIcon,
    UserIcon,
    FolderIcon,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import data from "../../constant/submittedreports.json"
// import categoryData from "../../constant/category.json"
const SubmittedReportsTable = () => {
    const allData = data;
    const categoryData = {
        CategoryI: ["Teaching", "Duties"],
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
    // const categoryData = categoryData;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileView, setIsMobileView] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: "date",
        direction: "desc"
    });
    const [filters, setFilters] = useState({
        status: [],
        category: [],
    });
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");// New state for category dropdown
    const [isFilterActive, setIsFilterActive] = useState(false);
    const itemsPerPage = 5;

    // Check for mobile view on component mount and window resize
    useEffect(() => {
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

    // Check if any filters are active
    useEffect(() => {
        const hasActiveFilters = filters.status.length > 0 || filters.category.length > 0;
        setIsFilterActive(hasActiveFilters);
    }, [filters]);

    // Handle category selection
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };
    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
    };

    // Handle action buttons (delete and edit)
    const handleDelete = (id) => {
        // Add your delete logic here
        console.log(`Delete report with ID: ${id}`);
        // You would typically call an API or modify state here
    };

    const handleEdit = (id) => {
        // Add your edit logic here
        console.log(`Edit report with ID: ${id}`);
        // You would typically navigate to edit page or open modal
    };

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    // Apply sort
    const sortedData = [...allData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Filter and search logic
    const filteredData = sortedData.filter((item) => {
        // Search term filter
        const matchesSearch = item.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.facultyId.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = filters.status.length === 0 || filters.status.includes(item.status);

        // Category filter from dropdown
        const matchesSelectedCategory = selectedCategory === "All" || item.category === selectedCategory;

        // Category filter from filter panel
        const matchesCategory = filters.category.length === 0 || filters.category.includes(item.category);

        return matchesSearch && matchesStatus && matchesCategory && matchesSelectedCategory;
    });

    // Get unique values for filters
    const uniqueStatuses = [...new Set(allData.map(item => item.status))];
    const uniqueCategories = [...new Set(allData.map(item => item.category))];

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Add or remove filter value
    const toggleFilter = (filterType, value) => {
        setFilters(prev => {
            const updatedFilters = [...prev[filterType]];
            const index = updatedFilters.indexOf(value);

            if (index > -1) {
                updatedFilters.splice(index, 1);
            } else {
                updatedFilters.push(value);
            }

            return {
                ...prev,
                [filterType]: updatedFilters
            };
        });

        setCurrentPage(1);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            status: [],
            category: [],
        });
        setSelectedCategory("All");
        setCurrentPage(1);
    };

    // Status badge mapping
    const statusBadge = (status) => {
        switch (status) {
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">Pending</Badge>;
            case "Accepted":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Accepted</Badge>;
            case "Rejected":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">Rejected</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">{status}</Badge>;
        }
    };

    // Category badge mapping
    const categoryBadge = (category) => {
        switch (category) {
            case "CategoryI":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Category I</Badge>;
            case "CategoryII":
                return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">Category II</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">{category}</Badge>;
        }
    };

    // Mobile card view for each row
    const MobileCard = ({ item }) => (
        <div className="bg-white p-4 rounded-md border mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <div className="font-medium">{item.tableName}</div>
                <div>{statusBadge(item.status)}</div>
            </div>

            <div className="flex flex-col gap-1 mb-3">
                <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Report ID:</span> {item.reportId}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <UserIcon className="h-3 w-3" />
                    <span className="font-medium">Faculty ID:</span> {item.facultyId}
                </div>
                <div className="text-xs text-muted-foreground">
                    {categoryBadge(item.category)}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {item.date}
            </div>

            <div className="border-t pt-3 flex justify-between gap-2">
                <Button
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1 bg-black text-white hover:bg-black/90"
                    onClick={() => handleEdit(item.reportId)}
                >
                    <PencilIcon className="h-4 w-4" /> Edit
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(item.reportId)}
                >
                    <Trash2Icon className="h-4 w-4" /> Delete
                </Button>
            </div>
        </div>
    );

    // Sort indicator component
    const SortIndicator = ({ column }) => {
        if (sortConfig.key !== column) return null;
        return sortConfig.direction === 'asc'
            ? <ChevronUpIcon className="h-4 w-4 ml-1" />
            : <ChevronDownIcon className="h-4 w-4 ml-1" />;
    };
    useEffect(() => {
        const getSubcategories = () => {
            if (selectedCategory === "All") {
                return Object.values(categoryData).flat();
            }
            return categoryData[selectedCategory] || [];
        };
        getSubcategories()
    }, [])


    return (
        <div className="p-3 md:p-6 space-y-4">
            {/* Category Selection Dropdown */}
            <div className="flex gap-10">
                <div className="mb-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="w-full md:w-auto flex items-center gap-2">
                            <FolderIcon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-700">Category:</span>
                        </div>
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-full md:w-64 ">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className={`bg-white`}>
                                <SelectItem value="All">All Categories</SelectItem>
                                {uniqueCategories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category === "CategoryI" ? "Category I" : "Category II"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* category data */}
                {/* Subcategory Selection */}

                {selectedCategory && selectedCategory !== "All" && (
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="w-full md:w-auto flex items-center gap-2">
                            <FolderIcon className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-700">Subcategory:</span>
                        </div>
                        <Select value={selectedSubCategory} onValueChange={handleSubCategoryChange}>
                            <SelectTrigger className="w-full md:w-64">
                                <SelectValue placeholder="Select Subcategory" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {categoryData[selectedCategory].map((sub, index) => (
                                    <SelectItem key={index} value={sub}>
                                        {sub}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

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

                <div className="flex gap-2 w-full md:w-auto">
                    {(isFilterActive || selectedCategory !== "All") && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <XIcon className="h-4 w-4 mr-1" /> Clear Filters
                        </Button>
                    )}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className={`${isFilterActive ? 'bg-blue-50 border-blue-200 text-blue-600' : ''} w-full md:w-auto`}>
                                <FilterIcon className="h-4 w-4 mr-2" /> Filter
                                {isFilterActive && (
                                    <Badge variant="secondary" className="ml-2 bg-blue-100">
                                        {filters.status.length + filters.category.length}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4">
                            <div className="space-y-4">
                                <h3 className="font-medium">Filter Reports</h3>

                                {/* Status Filter */}
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Status</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueStatuses.map(status => (
                                            <Badge
                                                key={status}
                                                variant={filters.status.includes(status) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => toggleFilter('status', status)}
                                            >
                                                {status}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Category</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueCategories.map(category => (
                                            <Badge
                                                key={category}
                                                variant={filters.category.includes(category) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => toggleFilter('category', category)}
                                            >
                                                {category === "CategoryI" ? "Category I" : "Category II"}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Option */}
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Sort By</h4>
                                    <div className="flex gap-2">
                                        <Select
                                            value={sortConfig.key}
                                            onValueChange={(value) => setSortConfig(prev => ({ ...prev, key: value }))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent className={`bg-white`}>
                                                <SelectItem value="date">Date</SelectItem>
                                                <SelectItem value="tableName">Table Name</SelectItem>
                                                <SelectItem value="status">Status</SelectItem>
                                                <SelectItem value="reportId">Report ID</SelectItem>
                                                <SelectItem value="facultyId">Faculty ID</SelectItem>
                                                <SelectItem value="category">Category</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSortConfig(prev => ({
                                                ...prev,
                                                direction: prev.direction === 'asc' ? 'desc' : 'asc'
                                            }))}
                                            className="px-3"
                                        >
                                            {sortConfig.direction === 'asc' ? (
                                                <ChevronUpIcon className="h-4 w-4" />
                                            ) : (
                                                <ChevronDownIcon className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Selected Category Info */}
            {selectedCategory !== "All" && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex items-center gap-2">
                    <FolderIcon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Showing reports from: {selectedCategory === "CategoryI" ? "Category I" : "Category II"}</span>
                </div>
            )}

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
                <Table>
                    <TableCaption>Submitted Reports Overview</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-blue-600">
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('reportId')}
                            >
                                <div className="flex items-center">
                                    Report ID <SortIndicator column="reportId" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('facultyId')}
                            >
                                <div className="flex items-center">
                                    Faculty ID <SortIndicator column="facultyId" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('tableName')}
                            >
                                <div className="flex items-center">
                                    Table Name <SortIndicator column="tableName" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('category')}
                            >
                                <div className="flex items-center">
                                    Category <SortIndicator column="category" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center">
                                    Status <SortIndicator column="status" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center">
                                    Date <SortIndicator column="date" />
                                </div>
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{item.reportId}</TableCell>
                                    <TableCell>{item.facultyId}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            {item.tableName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{categoryBadge(item.category)}</TableCell>
                                    <TableCell>{statusBadge(item.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                            {item.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                className="flex items-center gap-1 bg-black text-white hover:bg-black/90"
                                                onClick={() => handleEdit(item.reportId)}
                                            >
                                                <PencilIcon className="h-4 w-4" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(item.reportId)}
                                            >
                                                <Trash2Icon className="h-4 w-4" /> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No reports found
                                    {(isFilterActive || selectedCategory !== "All") && <div className="mt-2 text-sm">Try adjusting your filters</div>}
                                </TableCell>
                            </TableRow>
                        )}
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
                        {(isFilterActive || selectedCategory !== "All") && <div className="mt-2 text-sm">Try adjusting your filters</div>}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                <span className="text-sm text-muted-foreground order-2 sm:order-1">
                    Page {currentPage} of {totalPages || 1}
                    {filteredData.length > 0 && ` (${filteredData.length} total results)`}
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

export default SubmittedReportsTable;