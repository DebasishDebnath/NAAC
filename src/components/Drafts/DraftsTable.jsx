import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const reports = [
    {
        facultyId: "FAC001",
        category: "Category I",
        tableName: "Teaching",
        status: "Pending",
        date: "2025-04-20",
        reportId: "REP001"
    },
    {
        facultyId: "FAC002",
        category: "Category II",
        tableName: "Journal Publications",
        status: "Accepted",
        date: "2025-04-18",
        reportId: "REP002"
    },
    {
        facultyId: "FAC003",
        category: "Category II",
        tableName: "Patent Status",
        status: "Pending",
        date: "2025-04-22",
        reportId: "REP003"
    },
    {
        facultyId: "FAC004",
        category: "Category I",
        tableName: "Duties",
        status: "Rejected",
        date: "2025-04-19",
        reportId: "REP004"
    },
    {
        facultyId: "FAC005",
        category: "Category II",
        tableName: "E-Content (developed in 4 quadrants) Per Module",
        status: "Pending",
        date: "2025-04-21",
        reportId: "REP005"
    }
];

const subReportOptions = {
    'Category I': ["Teaching",
        "Duties"],
    'Category II': ["Journal Publications",
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
        "Online AI Courses"],
};

export default function DraftTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReports, setFilteredReports] = useState(reports); // Initially show all reports
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubReport, setSelectedSubReport] = useState('');

    // Function to handle search
    const handleSearch = (e) => {
        e.preventDefault();
        filterReports();
    };

    // Function to get badge color based on category
    const getBadgeColor = (category) => {
        switch (category) {
            case 'CategoryI':
                return 'bg-blue-100 text-blue-800';
            case 'CategoryII':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to filter reports based on search, category, and sub-report
    const filterReports = () => {
        let filtered = reports;

        // Filter by search term
        if (searchTerm.trim()) {
            const searchTermLower = searchTerm.toLowerCase();
            filtered = filtered.filter(report => {
                return (
                    report.reportId.toLowerCase().includes(searchTermLower) ||
                    report.category.toLowerCase().includes(searchTermLower) ||
                    report.tableName.toLowerCase().includes(searchTermLower) ||
                    report.status.toLowerCase().includes(searchTermLower) ||
                    report.date.toLowerCase().includes(searchTermLower)
                );
            });
        }

        // Filter by selected category
        if (selectedCategory) {
            filtered = filtered.filter(report => report.category === selectedCategory);
        }

        // Filter by selected sub-report (compare with the title)
        if (selectedSubReport) {
            filtered = filtered.filter(report =>
                report.tableName.toLowerCase().includes(selectedSubReport.toLowerCase())
            );
        }

        setFilteredReports(filtered);
    };

    // Function to get status badge
    const getStatusBadge = (status) => {
        if (status === 'Accepted') {
            return (
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <div className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <span>{status}</span>
                </div>
            );
        } else if (status === 'Pending') {
            return (
                <div className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    <div className="bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <span>{status}</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center justify-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    <div className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    <span>{status}</span>
                </div>
            );
        }
    };

    // UseEffect to reset reports when searchTerm or filters change
    useEffect(() => {
        filterReports();
    }, [searchTerm, selectedCategory, selectedSubReport]);

    // Render the component
    return (
        <div className="max-w-full mx-auto bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        className="pl-10 pr-24 py-2 w-full bg-gray-50 border border-gray-300 rounded-lg"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        className="absolute right-0 top-0 bottom-0 bg-[#002946] text-white rounded-[10px]"
                        type="submit"
                    >
                        Search
                    </Button>
                </form>

                <div className="flex gap-4 items-start md:items-center">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-[#787878] text-white"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                    </Button>
                    {showFilters && (
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            {/* Category Dropdown */}
                            <select
                                className="border border-gray-300 rounded-md px-4 py-2"
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedSubReport('');
                                }}
                            >
                                <option value="">Select Category</option>
                                <option value="Category I">Category I</option>
                                <option value="Category II">Category II</option>
                            </select>

                            {/* Sub-report Dropdown */}
                            {selectedCategory && (
                                <select
                                    className="border border-gray-300 rounded-md px-4 py-2"
                                    value={selectedSubReport}
                                    onChange={(e) => setSelectedSubReport(e.target.value)}
                                >
                                    <option value="">Select Sub-report</option>
                                    {subReportOptions[selectedCategory].map((sub, index) => (
                                        <option key={index} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] table-auto">
                    <thead className="text-white" style={{ backgroundColor: '#002946' }}>
                        <tr>
                            <th className="px-4 py-3 text-center first:rounded-tl-xl first:rounded-bl-xl">Report ID</th>
                            <th className="px-4 py-3 text-center">Category</th>
                            <th className="px-4 py-3 text-center">Title</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-center last:rounded-tr-xl last:rounded-br-xl">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 text-center">{report.reportId}</td>
                                    <td className="px-4 py-3 text-center">{report.category}</td>
                                    <td className="px-4 py-3 text-center">{report.tableName}</td>
                                    <td className="px-4 py-3 text-center">{getStatusBadge(report.status)}</td>
                                    <td className="px-4 py-3 text-center">{report.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No reports found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
