import React from 'react';
import SubmittedReportsTable from '../SubmittedReports/SubmittedReportsTable'; 

const PreviewSubmit = ({
  formData,
  selectedCategory,
  selectedSubcategory,
  setPopUpShow,
  handleSubmit,
}) => {
  const categoryData = formData.form[selectedCategory];
  const selectedForm = categoryData?.forms[selectedSubcategory];

  if (!selectedForm) return null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full">
      {/* Popup Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Preview & Submit: {selectedForm.tableName || "Form"}
          </h3>
          <button
            onClick={() => setPopUpShow(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <SubmittedReportsTable />

      {/* Popup Footer */}
      <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setPopUpShow(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewSubmit;
