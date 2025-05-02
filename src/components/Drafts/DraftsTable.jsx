import React, { useEffect, useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TableComp from '../Table/TableComp';
import ReportPDFGenerator from '../Reports/ReportPDFGenerator';

export default function DraftTable({ draftData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReports, setFilteredReports] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubReport, setSelectedSubReport] = useState('');
    useEffect(() => {
        if (draftData?.data) {
            setFilteredReports(draftData?.data);
        }
    }, [draftData]);

    // Function to handle search
    const handleSearch = (e) => {
        e.preventDefault();
        filterReports();
    };

    // Function to normalize model names by replacing spaces with underscores
    const normalizeModelName = (modelName) => {
        if (!modelName) return '';
        return modelName.replace(/ /g, '_').toLowerCase();
    };

    // Function to filter reports based on search, category, and sub-report
    const filterReports = () => {
        if (!draftData?.data) return;

        let results = [...draftData.data];

        // Filter by search term
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            const normalizedTerm = normalizeModelName(searchTerm);
            
            results = results.filter((report) => {
                // Normalize model name for comparison if it exists
                const normalizedModel = report.model ? normalizeModelName(report.model) : '';
                
                // Search in multiple fields - adjust these based on your actual data structure
                return (
                    (report.title && report.title.toLowerCase().includes(term)) ||
                    (report.description && report.description.toLowerCase().includes(term)) ||
                    (report.author && report.author.toLowerCase().includes(term)) ||
                    (report.reportId && report.reportId.toString().includes(term)) ||
                    (normalizedModel.includes(normalizedTerm))
                );
            });
        }

        // Filter by category if selected
        if (selectedCategory) {
            results = results.filter(report => report.category === selectedCategory);
        }

        // Filter by sub-report if selected
        if (selectedSubReport) {
            results = results.filter(report => report.subReport === selectedSubReport);
        }

        setFilteredReports(results);
    };

    // UseEffect to reset reports when searchTerm or filters change
    useEffect(() => {
        filterReports();
    }, [searchTerm, selectedCategory, selectedSubReport]);

    // Function to prepare report data for the PDF generator
    // const prepareReportData = () => {
    //     // Convert the filtered reports into a format expected by ReportPDFGenerator
    //     // This is a simplified example, you may need to adjust based on your actual data structure
    //     return {
    //         _id: "draft-report",
    //         UserId: {
    //             name: "Draft Reports Summary",
    //             emailId: "",
    //             department: "",
    //             designation: "",
    //             campus: "",
    //             mobileNo: ""
    //         },
    //         obtainedScore: filteredReports.length,
    //         data: [
    //             {
    //                 model: "draftReports",
    //                 score: filteredReports.length,
    //                 entry: filteredReports.map(report => ({
    //                     ...report,
    //                     // Add any transformations needed for your specific data structure
    //                     Title_of_the_project: report.title,
    //                     Status: report.status,
    //                     Description: report.description || "N/A",
    //                     Date: report.date
    //                 }))
    //             }
    //         ]
    //     };
    // };

    // Function to get badge color based on category
    const getBadgeColor = (category) => {
        switch (category) {
            case 'Category I':
                return 'bg-blue-100 text-blue-800';
            case 'Category II':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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

    // Render the component
    return (
        <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className='flex font-bold text-4xl pb-10 text-[#002946]'>Drafts</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-6">
                {draftData &&
                <>
                <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        className="pl-10 pr-24 py-4 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002946]"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        className="absolute right-[2px] top-[2px]  bg-[#002946] text-white rounded-lg shadow-md hover:bg-[#003b61] transition duration-300 ease-in-out"
                        type="submit"
                    >
                        Search
                    </Button>
                </form>

                <div className="flex gap-4 items-start md:items-center">
                    <ReportPDFGenerator 
                        report={draftData}
                        buttonText="Download Report"
                        buttonClass="flex items-center gap-2 bg-[#002946] text-white rounded-lg shadow-md hover:bg-[#003b61] transition duration-300 ease-in-out py-2 px-4"
                        iconClass="text-white"
                    />

                    {/* Filter button could be enabled if you want to implement the filter functionality */}
                    {/* <Button
                        variant="outline"
                        className="flex items-center gap-2 border border-gray-300 p-2"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button> */}
                </div>
                </>
                }
            </div>

            {/* Add the filter panel here if you want to implement it */}
            {/* {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Category I">Category I</option>
                                <option value="Category II">Category II</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Report</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedSubReport}
                                onChange={(e) => setSelectedSubReport(e.target.value)}
                            >
                                <option value="">All Sub Reports</option>
                                <option value="SubReport A">SubReport A</option>
                                <option value="SubReport B">SubReport B</option>
                            </select>
                        </div>
                    </div>
                </div>
            )} */}

            <TableComp reports={filteredReports} getStatusBadge={getStatusBadge} />
        </div>
    );
}