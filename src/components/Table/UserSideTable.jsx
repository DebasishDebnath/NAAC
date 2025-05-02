import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserSideTable = ({ reports = [], onDelete, onEdit }) => {
  // Early return if there are no reports
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No reports found
      </div>
    );
  }

  // Fields to exclude
  const excludedFields = ['_id', 'Created_by', 'CreatedAt', 'UpdatedAt', '__v'];

  // Safely check for reports[0] and filter out the excluded fields
  const columns = reports.length > 0 && reports[0] !== undefined 
    ? Object.keys(reports[0]).filter((col) => !excludedFields.includes(col)) 
    : [];

  // Function to safely render cell values
  const renderCellValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      // Convert object to string representation
      return JSON.stringify(value);
    }
    return value;
  };

  const getStatusBadge = (status) => {
    const badgeBase = "flex items-center justify-center gap-2 px-3 py-1 rounded-full";
    const iconBase = "rounded-full w-4 h-4 flex items-center justify-center";

    switch (status) {
      case 'Accepted':
        return (
          <div className={`${badgeBase} bg-green-100 text-green-800`}>
            <div className={`${iconBase} bg-green-500`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>{status}</span>
          </div>
        );
      case 'Pending':
        return (
          <div className={`${badgeBase} bg-yellow-100 text-yellow-800`}>
            <div className={`${iconBase} bg-yellow-500`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span>{status}</span>
          </div>
        );
      case 'Draft':
        return (
          <div className={`${badgeBase} bg-blue-100 text-blue-800`}>
            <div className={`${iconBase} bg-blue-500`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <span>{status}</span>
          </div>
        );
      default:
        return (
          <div className={`${badgeBase} bg-red-100 text-red-800`}>
            <div className={`${iconBase} bg-red-500`}>
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

  return (
    <div className="overflow-x-auto flex flex-col">
      <div className="flex w-[90%] mt-3.5 bg-[#002946] justify-self-center self-center mb-3 text-white py-2 text-center justify-center items-center rounded-md ">Total submissions {reports.length}</div>
    
      <table className="w-full min-w-[600px] table-auto bg-gray-50 rounded-lg shadow-md">
        {/* Conditionally render the table header */}
        {columns.length > 0 && (
          <thead className="text-white" style={{ backgroundColor: '#002946' }}>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col}
                  className={`px-4 py-3 text-center ${idx === 0 ? 'first:rounded-tl-xl first:rounded-bl-xl' : ''} ${idx === columns.length - 1 ? 'last:rounded-tr-xl last:rounded-br-xl' : ''}`}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
        )}

        {/* Conditionally render the table rows */}
        {columns.length > 0 ? (
          <tbody className="overflow-hidden rounded-b-xl">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-200">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-center">
                    {col.toLowerCase() === 'status'
                      ? getStatusBadge(report[col])
                      : renderCellValue(report[col])}
                  </td>
                ))}
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit?.(report)}
                      className="text-indigo-600 hover:text-indigo-800 transition-transform hover:scale-110"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete?.(report.reportId || report._id)}
                      className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-gray-600">
                No records available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UserSideTable;