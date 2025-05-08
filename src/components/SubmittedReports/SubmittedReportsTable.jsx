import React, { useEffect, useState } from 'react';
import { useHttp } from '@/hooks/useHttp';
import ReportPDFGenerator from '../Reports/ReportPDFGenerator';
import SubmittedReports from '@/Apis/User/SubmittedReports';

const SubmittedReportsTable = () => {
  const [report, setReport] = useState(null);
  const { getReq } = useHttp();
  const {submittedReportData} = SubmittedReports();
  // const token = sessionStorage.getItem("token");

  useEffect(() => {
    const handleReportData = async () => {
        const response = await submittedReportData();
        // console.log("Submitted Report Data:", response);

        if (response.success)
          setReport(response.data);
    };
  
    handleReportData();
  }, []);

  // Function to get badge color based on status
  const getStatusBadge = (status) => {
    if (status === 'Approved') {
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
    } else if (status === 'Review') {
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

  // Format date to "Apr 30, 2025" format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className='flex font-bold text-4xl pb-10 text-[#002946]'>Submitted Reports</h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] table-auto bg-gray-50 rounded-lg shadow-md">
          <thead className="text-white" style={{ backgroundColor: '#002946' }}>
            <tr>
              <th className="px-4 py-3 text-center first:rounded-tl-xl">Report ID</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3 text-center last:rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {report ? (
              <tr className="hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-3 text-center">{report._id}</td>
                <td className="px-4 py-3 text-center">{getStatusBadge(report.is_submitted)}</td>
                <td className="px-4 py-3 text-center">{formatDate(report.updatedAt)}</td>
                <td className="px-4 py-3 text-center">{report.obtainedScore || 'N/A'}</td>
                <td className="px-4 py-3 text-center">
                  <ReportPDFGenerator 
                    report={report} 
                    buttonText="Download Report"
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">No reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedReportsTable;