import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const reports = [
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Approved', date: '2023-04-01' },
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Approved', date: '2023-04-01' },
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Approved', date: '2023-04-01' },
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Rejected', date: '2023-04-01' },
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Rejected', date: '2023-04-01' },
    { id: 'FAC001', category: 'Exams', title: 'Q1 Financial Review', status: 'Approved', date: '2023-04-01' },
    { id: 'FAC001', category: 'Finance', title: 'Q1 Financial Review', status: 'Approved', date: '2023-04-01' },
];

export default function DraftTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReports, setFilteredReports] = useState(reports);

    // Search functionality
    useEffect(() => {
        // Filter reports whenever searchTerm changes
        if (searchTerm.trim() === '') {
            setFilteredReports(reports);
        } else {
            const filtered = reports.filter(report => {
                // Search across all fields
                const searchTermLower = searchTerm.toLowerCase();
                return (
                    report.id.toLowerCase().includes(searchTermLower) ||
                    report.category.toLowerCase().includes(searchTermLower) ||
                    report.title.toLowerCase().includes(searchTermLower) ||
                    report.status.toLowerCase().includes(searchTermLower) ||
                    report.date.toLowerCase().includes(searchTermLower)
                );
            });
            setFilteredReports(filtered);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Search is already handled by the useEffect
    };

    const getBadgeColor = (category) => {
        switch (category) {
            case 'Finance':
                return 'bg-blue-100 text-blue-800';
            case 'Exams':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Approved') {
            return (
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <div className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <span>{status}</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center justify-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    <div className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <span>{status}</span>
                </div>
            );
        }
    };

    return (
        <div className="max-w-full mx-auto bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-md">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                            className="pl-10 pr-24 py-2 w-full bg-gray-50 border border-gray-300 rounded-lg"
                            placeholder="Search reports...."
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
                </div>

                <div className="flex gap-4 items-start">
                    <Button variant="outline" className="flex items-center gap-2 bg-[#787878] text-white">
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="text-white" style={{ backgroundColor: '#002946' }}>
                        <tr>
                            <th className="px-4 py-3 text-left first:rounded-tl-xl">Report ID</th>
                            <th className="px-4 py-3 text-left">Category</th>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left last:rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredReports.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                    No Match Found
                                </td>
                            </tr>
                        ) : (
                            filteredReports.map((report, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">{report.id}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(report.category)}`}>
                                            {report.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">{report.title}</td>
                                    <td className="px-4 py-4">
                                        {getStatusBadge(report.status)}
                                    </td>
                                    <td className="px-4 py-4">{report.date}</td>
                                    <td className="px-4 py-4">
                                        <Button variant="ghost" className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}