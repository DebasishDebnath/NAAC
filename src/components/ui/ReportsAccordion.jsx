import { useState } from 'react';
import { ChevronDown, Edit } from 'lucide-react';

export default function ReportsAccordion() {
  const reports = [
    {
      facultyId: "FAC001",
      category: "Category I",
      tableName: "Teaching",
      status: "Drafts",
      date: "2025-04-20",
      reportId: "REP001"
    },
    {
      facultyId: "FAC001",
      category: "Category I",
      tableName: "Teaching",
      status: "Drafts",
      date: "2025-04-20",
      reportId: "REP001"
    },
    {
      facultyId: "FAC002",
      category: "Category II",
      tableName: "Journal Publications",
      status: "Drafts",
      date: "2025-04-18",
      reportId: "REP002"
    },
    {
      facultyId: "FAC003",
      category: "Category II",
      tableName: "Patent Status",
      status: "Drafts",
      date: "2025-04-22",
      reportId: "REP003"
    },
    {
      facultyId: "FAC004",
      category: "Category I",
      tableName: "Duties",
      status: "Drafts",
      date: "2025-04-19",
      reportId: "REP004"
    },
    {
      facultyId: "FAC005",
      category: "Category II",
      tableName: "E-Content (developed in 4 quadrants) Per Module",
      status: "Drafts",
      date: "2025-04-21",
      reportId: "REP005"
    }
  ];

  const subReportOptions = {
    'Category I': ["Teaching", "Duties"],
    'Category II': [
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
      "Online AI Courses"
    ]
  };

  // Get unique categories from the reports
  const categories = [...new Set(reports.map(report => report.category))];

  // State to track which accordion items are open
  const [openCategory, setOpenCategory] = useState(null);
  const [openTableName, setOpenTableName] = useState(null);

  // Toggle category accordion
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenTableName(null); // Close any open table name when toggling category
  };

  // Toggle table name accordion
  const toggleTableName = (tableName) => {
    setOpenTableName(openTableName === tableName ? null : tableName);
  };

  // Handle edit click
  const handleEditClick = (report) => {
    // Prevent the click from bubbling up to parent elements
    event.stopPropagation();
    
    // Log all report details
    console.log("Editing report with details:");
    console.log("Category:", report.category);
    console.log("Table Name:", report.tableName);
    console.log("All Fields:", report);
  };

  // Filter reports by tableName
  const getReportsByTableName = (category, tableName) => {
    return reports.filter(report => report.category === category && report.tableName === tableName);
  };

  return (
    <div className="w-full p-10">
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="overflow-hidden rounded-lg shadow">
            {/* Category Level Accordion */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer bg-[#002846] text-white transition-all duration-300 hover:from-violet-600 hover:to-fuchsia-600"
              onClick={() => toggleCategory(category)}
            >
              <h3 className="text-lg font-medium">{category}</h3>
              <div className={`transform transition-transform duration-300 ${openCategory === category ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            
            {/* Table Names Level */}
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openCategory === category ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-2 space-y-2">
                {subReportOptions[category].map((tableName) => {
                  // Only show table names that have corresponding reports
                  const tableReports = getReportsByTableName(category, tableName);
                  if (tableReports.length === 0) return null;
                  
                  return (
                    <div key={tableName} className="rounded-md overflow-hidden">
                      {/* Table Name Level Accordion */}
                      <div 
                        className="flex items-center justify-between p-3 cursor-pointer bg-[#0028467c] text-white transition-all duration-300 hover:from-cyan-500 hover:to-blue-500"
                        onClick={() => toggleTableName(tableName)}
                      >
                        <h4 className="text-md">{tableName}</h4>
                        <div className={`transform transition-transform duration-300 ${openTableName === tableName ? 'rotate-180' : 'rotate-0'}`}>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                      
                      {/* Reports List */}
                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          openTableName === tableName ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-3 py-2 space-y-3">
                          {tableReports.map((report) => (
                            <div 
                              key={report.reportId} 
                              className="p-3 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="font-medium text-gray-700">Report ID:</span>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">{report.reportId}</span>
                                  <button 
                                    className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditClick(report);
                                    }}
                                    aria-label="Edit report"
                                  >
                                    <Edit className="h-4 w-4 text-blue-500" />
                                  </button>
                                </div>
                                
                                <span className="font-medium text-gray-700">Faculty ID:</span>
                                <span className="text-gray-600">{report.facultyId}</span>
                                
                                <span className="font-medium text-gray-700">Status:</span>
                                <span className={`font-medium ${
                                  report.status === 'Drafts' ? 'text-emerald-500' : 
                                  report.status === 'Drafts' ? 'text-rose-500' : 'text-amber-500'
                                }`}>
                                  {report.status}
                                </span>
                                
                                <span className="font-medium text-gray-700">Date:</span>
                                <span className="text-gray-600">{report.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}