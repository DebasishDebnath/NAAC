import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TableComp = ({ reports }) => {
  const navigate = useNavigate()
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No reports found
      </div>
    );
  }

  const handleEdit = (report) => {
    const modelName = report?.model?.replace(/_/g, ' ');
    sessionStorage.setItem('table_name', modelName);
    navigate(`/user/forms`)

  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] table-auto bg-gray-50 rounded-lg shadow-md">
        <thead className="text-white" style={{ backgroundColor: '#002946' }}>
          <tr>
            <th className="px-4 py-3 text-center rounded-tl-xl rounded-bl-xl">Model Name</th>
            <th className="px-4 py-3 text-center">Entries</th>
            <th className="px-4 py-3 text-center">Score</th>
            <th className="px-4 py-3 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-hidden rounded-b-xl">
          {reports.map((report, index) => (
            <tr key={index} className="hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 text-center capitalize">
                {report?.model?.replace(/_/g, ' ')}
              </td>
              <td className="px-4 py-3 text-center">
                {report.entry?.length || 0}
              </td>
              <td className="px-4 py-3 text-center">
                {report.score}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={()=> handleEdit(report)}
                    className="text-indigo-600 hover:text-indigo-800 transition-transform hover:scale-110"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  {/* <button
                    onClick={() => onDelete?.(report)}
                    className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <FaTrash />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComp;
