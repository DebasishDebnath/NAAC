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

const DraftsTable = () => {
    const allData = [
        {
            id: "DB001",
            tableName: "Users",
            type: "MySQL",
            time: "2023-04-01",
            editable: true
        },
        {
            id: "DB002",
            tableName: "Products",
            type: "PostgreSQL",
            time: "2023-04-12",
            editable: true
        },
        {
            id: "DB003",
            tableName: "Orders",
            type: "MySQL",
            time: "2023-03-20",
            editable: true
        },
        {
            id: "DB004",
            tableName: "Customers",
            type: "MongoDB",
            time: "2023-04-15",
            editable: true
        },
        {
            id: "DB005",
            tableName: "Inventory",
            type: "PostgreSQL",
            time: "2023-04-22",
            editable: true
        },
        {
            id: "DB006",
            tableName: "Transactions",
            type: "MySQL",
            time: "2023-05-01",
            editable: true
        },
        {
            id: "DB007",
            tableName: "Analytics",
            type: "MongoDB",
            time: "2023-04-18",
            editable: true
        },
        {
            id: "DB008",
            tableName: "Employees",
            type: "PostgreSQL",
            time: "2023-04-05",
            editable: true
        },
        {
            id: "DB009",
            tableName: "Departments",
            type: "MySQL",
            time: "2023-03-25",
            editable: true
        },
        {
            id: "DB010",
            tableName: "Logs",
            type: "MongoDB",
            time: "2023-04-30",
            editable: true
        },
        {
            id: "DB011",
            tableName: "Settings",
            type: "MySQL",
            time: "2023-03-15",
            editable: true
        },
        {
            id: "DB012",
            tableName: "Categories",
            type: "PostgreSQL",
            time: "2023-05-10",
            editable: true
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileView, setIsMobileView] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: "time",
        direction: "desc"
    });
    const [filters, setFilters] = useState({
        type: [],
    });
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
        const hasActiveFilters = filters.type.length > 0;
        setIsFilterActive(hasActiveFilters);
    }, [filters]);

    // Handle action buttons (delete and edit)
    const handleDelete = (id) => {
        // Add your delete logic here
        console.log(`Delete item with ID: ${id}`);
        // You would typically call an API or modify state here
    };

    const handleEdit = (id) => {
        // Add your edit logic here
        console.log(`Edit item with ID: ${id}`);
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
                             item.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Type filter
        const matchesType = filters.type.length === 0 || filters.type.includes(item.type);
        
        return matchesSearch && matchesType;
    });

    // Get unique values for filters
    const uniqueTypes = [...new Set(allData.map(item => item.type))];

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
            type: [],
        });
        setCurrentPage(1);
    };

    // Type icon mapping
    const typeIcon = {
        "MySQL": <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">MySQL</Badge>,
        "PostgreSQL": <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200">PostgreSQL</Badge>,
        "MongoDB": <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">MongoDB</Badge>,
    };

    // Mobile card view for each row
    const MobileCard = ({ item }) => (
        <div className="bg-white p-4 rounded-md border mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <div className="font-medium">{item.tableName}</div>
                <div>{typeIcon[item.type]}</div>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
                <span className="font-medium">ID:</span> {item.id}
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {item.time}
            </div>

            <div className="border-t pt-3 flex justify-between gap-2">
                <Button 
                    size="sm" 
                    className="flex-1 flex items-center justify-center gap-1 bg-black text-white hover:bg-black/90"
                    onClick={() => handleEdit(item.id)}
                >
                    <PencilIcon className="h-4 w-4" /> Edit
                </Button>
                <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(item.id)}
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

    return (
        <div className="p-3 md:p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <Input
                    type="text"
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:max-w-xs"
                />
                
                <div className="flex gap-2 w-full md:w-auto">
                    {isFilterActive && (
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
                                {isFilterActive && <Badge variant="secondary" className="ml-2 bg-blue-100">{filters.type.length}</Badge>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4">
                            <div className="space-y-4">
                                <h3 className="font-medium">Filter Tables</h3>
                                
                                {/* Type Filter */}
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Type</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueTypes.map(type => (
                                            <Badge 
                                                key={type}
                                                variant={filters.type.includes(type) ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => toggleFilter('type', type)}
                                            >
                                                {type}
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
                                            <SelectContent>
                                                <SelectItem value="time">Time</SelectItem>
                                                <SelectItem value="tableName">Table Name</SelectItem>
                                                <SelectItem value="type">Type</SelectItem>
                                                <SelectItem value="id">ID</SelectItem>
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

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
                <Table>
                    <TableCaption>Database tables overview</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-blue-500">
                            <TableHead 
                                className="text-black cursor-pointer"
                                onClick={() => handleSort('id')}
                            >
                                <div className="flex items-center">
                                    ID <SortIndicator column="id" />
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
                                onClick={() => handleSort('type')}
                            >
                                <div className="flex items-center">
                                    Type <SortIndicator column="type" />
                                </div>
                            </TableHead>
                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSort('time')}
                            >
                                <div className="flex items-center">
                                    Time <SortIndicator column="time" />
                                </div>
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.tableName}</TableCell>
                                    <TableCell>{typeIcon[item.type]}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                            {item.time}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button 
                                                size="sm" 
                                                className="flex items-center gap-1 bg-black text-white hover:bg-black/90"
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                <PencilIcon className="h-4 w-4" /> Edit
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2Icon className="h-4 w-4" /> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No tables found
                                    {isFilterActive && <div className="mt-2 text-sm">Try adjusting your filters</div>}
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
                        No tables found
                        {isFilterActive && <div className="mt-2 text-sm">Try adjusting your filters</div>}
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

export default DraftsTable