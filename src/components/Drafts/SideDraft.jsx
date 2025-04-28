import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TableComp from '../Table/TableComp';

const subReportOptions = {
  'Category I': ['Teaching', 'Duties'],
  'Category II': [
    'Journal Publications',
    'Books Publication',
    'Books Chapter / Conference Proceedings',
    'Editor of Book',
    'Translation Work',
    'Consultancy',
    'Patent Status',
    'Research Project',
    'Award/Fellowship',
    'Event Organiser / Participation',
    'Development of Innovative Pedagogy',
    'Design of New Curriculam and Courses (ICT Based)',
    "Development of Complete MOOC's in 4 Quadrant (4 Credit Course)",
    'MOOCs (development in 4 quadrant) per module / lecture',
    'Content Writer/Subject Matter Expert for each Module of MOOCs (At Least One Quadrant)',
    'Course Coordinator for MOOCs',
    'Development of E-Content in 4 quadrants for a Complete Course / E-Book',
    'E-Content (developed in 4 quadrants) Per Module',
    'Contribution to development of E-Content module in Complete Course / E-Book (at least one quadrant)',
    'Editor of E-Content for Complete Course / E-Book',
    'Status as Guide - Ph.D. Guidance (Degree Awarded)',
    'Status as Guide - Ph.D. Guidance (for Pursuing Students)',
    'M.Phil./P.G Dissertation Guidance',
    'Online AI Courses',
  ],
};

export default function SideDraft({ reports, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubReport, setSelectedSubReport] = useState('');

  useEffect(() => {
    console.log('reports', reports);
  }, [reports]);

  // Sync filteredReports when reports prop changes
  useEffect(() => {
    setFilteredReports(reports || []);
  }, [reports]);

  const handleSearch = (e) => {
    e.preventDefault();
    filterReports();
  };

  const handleDelete = (reportId) => {
    const confirmed = window.confirm('Are you sure you want to delete this report?');
    if (confirmed) {
      const updatedReports = filteredReports.filter((r) => r.reportId !== reportId);
      setFilteredReports(updatedReports);
    }
  };

  const filterReports = () => {
    let filtered = [...(reports || [])];

    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter((report) => {
        return (
          report.reportId?.toLowerCase().includes(searchTermLower) ||
          report.category?.toLowerCase().includes(searchTermLower) ||
          report.tableName?.toLowerCase().includes(searchTermLower) ||
          report.status?.toLowerCase().includes(searchTermLower) ||
          report.date?.toLowerCase().includes(searchTermLower)
        );
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter((report) => report.category === selectedCategory);
    }

    if (selectedSubReport) {
      filtered = filtered.filter((report) =>
        report.tableName?.toLowerCase().includes(selectedSubReport.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  };

  useEffect(() => {
    filterReports();
  }, [searchTerm, selectedCategory, selectedSubReport]);

  return (
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="flex font-bold text-4xl pb-10 text-[#002946]">Drafts</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-6">
        <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            className="pl-10 pr-24 py-3 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002946]"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="absolute right-0 top-0 bottom-0 bg-[#002946] text-white rounded-lg shadow-md hover:bg-[#003b61] transition duration-300 ease-in-out"
            type="submit"
          >
            Search
          </Button>
        </form>

        <div className="flex gap-4 items-start md:items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-[#787878] text-white rounded-lg py-2 px-4 hover:bg-[#666666] transition duration-200 ease-in-out"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>

          {showFilters && (
            <div className="flex flex-col items-center justify-center h-full md:flex-row gap-4 mt-4">
              <select
                className="border border-gray-300 rounded-md px-4 p-1 shadow-sm focus:ring-2 focus:ring-[#002946]"
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

              {selectedCategory && (
                <select
                  className="border border-gray-300 min-w-[800px] rounded-md px-4 p-1 shadow-sm focus:ring-2 focus:ring-[#002946]"
                  value={selectedSubReport}
                  onChange={(e) => setSelectedSubReport(e.target.value)}
                >
                  <option value="">Select Sub-report</option>
                  {subReportOptions[selectedCategory].map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      </div>

      <TableComp reports={filteredReports} onDelete={handleDelete} onEdit={onEdit} />
    </div>
  );
}