import useFinalSubmit from '@/Apis/User/FinalSubmit';
import TableComp from '@/components/Table/TableComp';
import ReportsAccordion from '@/components/ui/ReportsAccordion';
import React, { useState } from 'react';

function PreviewSubmit() {
  const {finalSubmit}= useFinalSubmit()
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

    const [filteredReports, setFilteredReports] = useState(reports); // Initially show all reports

    const handleDelete = (reportId) => {
        const confirmed = window.confirm("Are you sure you want to delete this report?");
        if (confirmed) {
            const updatedReports = filteredReports.filter(r => r.reportId !== reportId);
            setFilteredReports(updatedReports);
        }
    };

    const handleSubmit = () => {
        // Submit functionality goes here
        finalSubmit()
    };

    return (
        <div className=""> {/* relative positioning for the button */}
            
            <div className='w-full flex justify-end mb-12'>
            <button
                onClick={handleSubmit}
                className=" bg-[#002946] hover:bg-[#0029469d] font-semibold text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
                Submit
            </button>
            </div>
            
            <ReportsAccordion reports={reports}/>

            {/* Submit Button */}
        </div>
    );
}

export default PreviewSubmit;
