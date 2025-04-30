import { useState } from 'react';
import { ChevronDown, Edit, Calendar, FileText, User, CheckCircle, Clock } from 'lucide-react';

export default function ReportsAccordion({ reports }) {
  // Generate subReportOptions dynamically based on what's in the reports
  const subReportOptions = reports.reduce((options, report) => {
    const category = report.category;
    const tableName = report.tableName;
    
    if (!options[category]) {
      options[category] = [];
    }
    
    if (!options[category].includes(tableName)) {
      options[category].push(tableName);
    }
    
    return options;
  }, {});

  // Extract unique categories from reports
  const categories = [...new Set(reports.map(report => report.category))];

  // State to track which accordion items are open
  const [openCategory, setOpenCategory] = useState(null);
  const [openTableName, setOpenTableName] = useState(null);
  const [expandedReports, setExpandedReports] = useState({});

  // Toggle category accordion
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenTableName(null); // Close any open table when toggling category
  };

  // Toggle table name accordion
  const toggleTableName = (tableName) => {
    setOpenTableName(openTableName === tableName ? null : tableName);
  };

  // Toggle expanded view for a specific report
  const toggleExpandReport = (reportId) => {
    setExpandedReports(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  // Handle edit click
  const handleEditClick = (report, event) => {
    // Prevent the click from bubbling up
    event.stopPropagation();
    
    console.log("Editing report:", report);
    
    // In a real application, you would navigate to an edit page or open a modal
    // For example:
    // router.push(`/edit-report/${report.reportId}`);
    // or
    // setEditModalOpen(true);
    // setSelectedReport(report);
  };

  // Filter reports by tableName
  const getReportsByTableName = (category, tableName) => {
    return reports.filter(report => 
      report.category === category && 
      report.tableName === tableName
    );
  };

  // Get all table names that have at least one report in the current category
  const getTableNamesForCategory = (category) => {
    const tableNames = new Set(
      reports
        .filter(report => report.category === category)
        .map(report => report.tableName)
    );
    
    // Return array of unique table names for this category
    return Array.from(tableNames).sort();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString; // Return the original string if parsing fails
    }
  };

  // Format field key for display
  const formatFieldName = (key) => {
    // Convert snake_case or camelCase to Title Case with spaces
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Determine if a value should be rendered as a date
  const isDateField = (key) => {
    return key.toLowerCase().includes('date') || key.toLowerCase().includes('_at');
  };

  // Render a field value based on its type
  const renderFieldValue = (key, value) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">Not available</span>;
    }

    // If it's a date field, format it
    if (isDateField(key)) {
      return formatDate(value);
    }

    // If it's a boolean
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    // If it's an object or array, stringify it
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    // Default case - just return the value as string
    return String(value);
  };

  // Function to check if field should be excluded from display
  const shouldExcludeField = (key) => {
    const excludedFields = [
      '_id', // Already showing as reportId
      'id',
      'facultyId', // Already showing in summary
      'category', // Already showing in accordion
      'tableName', // Already showing in accordion
      'status', // Already showing in summary
      'score', // Already showing in summary
      'reportId', // Already showing in summary
      'modelName', // Internal use
      'fullData', // This is the full data itself
      '__v', // MongoDB versioning
      'createdAt', // Unless specifically needed
      'updatedAt' // Unless specifically needed
    ];
    
    return excludedFields.includes(key);
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        {categories.map((category) => {
          // Only render categories that have reports
          const categoryReports = reports.filter(r => r.category === category);
          if (categoryReports.length === 0) return null;
          
          // Get table names for this category that have reports
          const tableNamesWithReports = getTableNamesForCategory(category);
          
          return (
            <div key={category} className="overflow-hidden rounded-lg shadow">
              {/* Category Level Accordion */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer bg-[#002846] text-white transition-all duration-300 hover:bg-[#00396b]"
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
                  {tableNamesWithReports.length > 0 ? (
                    tableNamesWithReports.map((tableName) => {
                      // Get reports for this table name
                      const tableReports = getReportsByTableName(category, tableName);
                      if (tableReports.length === 0) return null;
                      
                      // Calculate total score for this table
                      const totalScore = tableReports.reduce((sum, report) => sum + (report.score || 0), 0);
                      
                      return (
                        <div key={tableName} className="rounded-md overflow-hidden">
                          {/* Table Name Level Accordion */}
                          <div 
                            className="flex items-center justify-between p-3 cursor-pointer bg-[#0028467c] text-white transition-all duration-300 hover:bg-[#00284699]"
                            onClick={() => toggleTableName(tableName)}
                          >
                            <div className="flex flex-col md:flex-row md:items-center">
                              <h4 className="text-md font-medium">{tableName}</h4>
                              <span className="md:ml-2 text-xs text-gray-200">
                                {tableReports.length} {tableReports.length === 1 ? 'record' : 'records'} | Score: {totalScore}
                              </span>
                            </div>
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
                            <div className="px-3 py-2 space-y-3 bg-gray-50">
                              {tableReports.map((report) => {
                                // Extract the full data from the report
                                const fullData = report.fullData || {};
                                
                                return (
                                  <div 
                                    key={report.reportId} 
                                    className="rounded-md shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300"
                                  >
                                    {/* Report Header - Always visible */}
                                    <div 
                                      className="p-4 cursor-pointer"
                                      onClick={() => toggleExpandReport(report.reportId)}
                                    >
                                      <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                          <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                          <h5 className="font-medium text-gray-800">Record ID: {report.reportId.substring(0, 8)}...</h5>
                                        </div>
                                        <div className="flex items-center">
                                          <button 
                                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 mr-2"
                                            onClick={(e) => handleEditClick(report, e)}
                                            aria-label="Edit report"
                                          >
                                            <Edit className="h-4 w-4 text-blue-500" />
                                          </button>
                                          <div className={`transform transition-transform duration-300 ${expandedReports[report.reportId] ? 'rotate-180' : 'rotate-0'}`}>
                                            <ChevronDown className="h-4 w-4 text-gray-500" />
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Basic information - Always visible */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center">
                                          <User className="h-4 w-4 text-gray-400 mr-2" />
                                          <span className="text-gray-500">Faculty ID:</span>
                                          <span className="ml-2 text-gray-700 font-medium">{report.facultyId}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                          <span className="text-gray-500">Date:</span>
                                          <span className="ml-2 text-gray-700">{formatDate(report.date)}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          {report.status === 'Drafts' ? (
                                            <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                          ) : (
                                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                                          )}
                                          <span className="text-gray-500">Status:</span>
                                          <span className={`ml-2 font-medium ${
                                            report.status === 'Drafts' ? 'text-amber-500' : 
                                            report.status === 'Rejected' ? 'text-rose-500' : 'text-emerald-500'
                                          }`}>
                                            {report.status}
                                          </span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <span className="text-gray-500">Score:</span>
                                          <span className="ml-2 text-gray-700 font-medium">{report.score || 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Detailed Data - Only visible when expanded */}
                                    {expandedReports[report.reportId] && (
                                      <div className="border-t border-gray-100 p-4 bg-gray-50">
                                        <h6 className="font-medium text-gray-700 mb-3">Detailed Information</h6>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                          {/* First dynamically render all fields from fullData */}
                                          {Object.entries(fullData).map(([key, value]) => {
                                            // Skip keys that we don't want to show
                                            if (shouldExcludeField(key)) return null;
                                            
                                            return (
                                              <div key={key} className="flex flex-col">
                                                <div className="text-sm font-medium text-gray-600">
                                                  {formatFieldName(key)}
                                                </div>
                                                <div className="mt-1 text-gray-800">
                                                  {renderFieldValue(key, value)}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-gray-500 text-center">No reports available in this category</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {categories.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="mb-4">
              <FileText className="h-12 w-12 mx-auto text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
            <p>There are no reports to display at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}