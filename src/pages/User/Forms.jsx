import React, { useState, useEffect } from 'react';
import data from '../../constant/test.json';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/ResizablePanels';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/DataTable';

import facultyData from "../../constant/invoices.json";
import { useFormSubmission } from '../../Apis/FormSubmission/FormSubmission';
import SubmittedReportsTable from '@/components/Drafts/DraftsTable';

function Forms() {
  const formData = data;
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [formDates, setFormDates] = useState({});
  const [formValues, setFormValues] = useState({});
  const { formSubmit } = useFormSubmission()
  const [popUpShow, setPopUpShow] = useState(false)

  // Format categories with fallback names
  const categories = formData.form.map((category) => ({
    name: category.name || category.type || "Untitled Category",
    subItems: category.forms.map(form => form.tableName || "Untitled Form")
  }));

  // Automatically select first form if only one exists
  useEffect(() => {
    const selectedCategoryForms = formData.form[selectedCategory]?.forms || [];
    if (selectedCategoryForms.length === 1) {
      setSelectedSubcategory(0);
    }
  }, [selectedCategory]);

  // Initialize form values from the data
  useEffect(() => {
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (selectedForm) {
      const initialValues = {};
      selectedForm.tableData.forEach(field => {
        if (field.backend_field_name) {
          initialValues[field.backend_field_name] = field.value || '';
        }
      });
      setFormValues(initialValues);
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategorySelect = (catIndex) => {
    setSelectedCategory(catIndex);
    const categoryForms = formData.form[catIndex]?.forms || [];
    setSelectedSubcategory(0); // reset or select only form
  };

  const handleSubcategorySelect = (subIndex) => {
    setSelectedSubcategory(subIndex);
  };

  // Handle form input changes
  const handleInputChange = (backendFieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [backendFieldName]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Form Values:", formValues);

    // Check if all required fields are filled
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    const backend_table_name = selectedForm.backend_table_name;
    const type = categoryData.type;
    const endpoint = selectedForm.endpoint;

    const data = await formSubmit(formValues, endpoint)

    if (!data?.success) {
      enqueueSnackbar(data.message, { variant: 'error' });
      return
    }

    console.log("data1", data)
    console.log(backend_table_name, type)

    if (selectedForm) {
      const requiredFields = selectedForm.tableData
        .filter(field => field.required && field.backend_field_name)
        .map(field => field.backend_field_name);

      const missingFields = requiredFields.filter(field => !formValues[field]);

      if (missingFields.length > 0) {
        enqueueSnackbar("Please fill all required fields", { variant: 'error' });
        return;
      }

      // Submit the form
      enqueueSnackbar("Form submitted successfully", { variant: 'success' });
      setPopUpShow(false);
    }
  };

  const renderFormFields = () => {
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (!selectedForm) return null;

    const formFields = selectedForm.tableData;

    return (
      <div className="space-y-6 transition-all duration-500 ease-in-out">
        <div>
          <h2 className="text-lg font-medium">{selectedForm.tableName || "Untitled Form"}</h2>
          <span className='text-gray-500'>Total Submissions: {3}</span>
        </div>

        {formFields.map((field, index) => {
          // Make sure each field has a backend_field_name to track in state
          const fieldKey = field.backend_field_name || `field_${index}`;

          return (
            <div key={index} className="mb-4 transition-opacity duration-300">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.fieldName}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.fieldType === "Text" && (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ''}
                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                />
              )}

              {field.fieldType === "Number" && (
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ''}
                  min={field.min}
                  max={field.max}
                  onChange={(e) => {
                    const val = Number(e.target.value);

                    if (field.min !== undefined && val < field.min) {
                      enqueueSnackbar(`Value should not be less than ${field.min}`, { variant: 'warning' });
                      handleInputChange(fieldKey, field.min);
                    } else if (field.max !== undefined && val > field.max) {
                      enqueueSnackbar(`Value should not exceed ${field.max}`, { variant: 'warning' });
                      handleInputChange(fieldKey, field.max);
                    } else {
                      handleInputChange(fieldKey, val);
                    }
                  }}
                />
              )}

              {field.fieldType === "Date" && (
                <DatePicker
                  selected={formDates[fieldKey] || null}
                  onChange={(date) => {
                    setFormDates(prev => ({ ...prev, [fieldKey]: date }));
                    handleInputChange(fieldKey, date);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholderText={field.placeholder}
                  dateFormat="yyyy-MM-dd"
                />
              )}

              {field.fieldType === "Options" && (
                <div className="relative">
                  <select
                    className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md pr-10"
                    value={formValues[fieldKey] || ''}
                    onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                  >
                    {field.options && field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {field.fieldType === "TextArea" && (
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ''}
                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                ></textarea>
              )}

              {field.placeholder && field.fieldType !== "Options" && (
                <p className="mt-1 text-sm text-gray-500">{field.placeholder}</p>
              )}
            </div>
          );
        })}

        <div className="pt-2 pb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  // New function to render popup content
  const renderPopupContent = () => {
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

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

  return (
    <div className="h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-grow gap-2">
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} className="max-h-full ">
          <div className="h-full overflow-y-auto p-4  border-gray-200 bg-white rounded-xl">
            <nav className="space-y-1">
              {categories.map((category, catIndex) => {
                const isActiveCategory = selectedCategory === catIndex;
                const isSingleForm = category.subItems.length === 1;

                return (
                  <div key={catIndex}>
                    {/* Category Header */}
                    <div
                      className={`flex items-center px-3 py-2 transition-all duration-200 ${isSingleForm && isActiveCategory
                        ? 'bg-blue-100 text-blue-600'
                        : isActiveCategory
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-200'
                        } rounded-md cursor-pointer mb-1`}
                      onClick={() => handleCategorySelect(catIndex)}
                    >
                      <span className="font-medium">{category.name}</span>
                    </div>

                    {/* Subcategories: Show only if more than one */}
                    {isActiveCategory && category.subItems.length > 1 && category.subItems.map((subItem, subIndex) => (
                      <div key={subIndex} className='flex items-center'>
                        {selectedSubcategory !== subIndex &&
                          <div className='h-full min-w-[10px] border-gray-400 border-[1px]'></div>
                        }
                        <div
                          className={`flex items-center px-3 py-2 ml-4 text-sm transition-colors duration-150 ${selectedSubcategory === subIndex
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                            } rounded-md cursor-pointer relative`}
                          onClick={() => handleSubcategorySelect(subIndex)}
                        >
                          <span>{subItem}
                            {selectedSubcategory !== subIndex &&
                              <div className='text-[#fff] bg-slate-400 px-2 rounded-full absolute top-2 -right-5'>{3}</div>
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </nav>
          </div>
        </ResizablePanel>

        <ResizableHandle className={"bg-gray-400 h-24 justify-self-center self-center w-1 rounded-full"}/>

        {/* Main content - Form Panel */}
        <ResizablePanel defaultSize={50} className="max-h-full">
          <div className="h-full flex flex-col bg-white rounded-xl">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-1">Academic Performance Indicators</h1>
              <p className="text-gray-500">Manage your academic activities and achievements.</p>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              {renderFormFields()}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className={"bg-gray-400 h-24 justify-self-center self-center w-1 rounded-full"}/>

        {/* Table Panel */}
        <ResizablePanel defaultSize={30} className="max-h-full">
          <div className="h-full overflow-y-auto bg-white rounded-xl">
            <div className='flex w-full justify-end'>
              <div
                className='bg-blue-400 px-5 py-1 text-[1.2rem] mb-4 text-white font-bold rounded shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 hover:bg-blue-500 transform hover:scale-105'
                onClick={() => setPopUpShow(true)}
              >
                Preview & Submit
              </div>
            </div>

            <SubmittedReportsTable />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Modal Popup */}
      {popUpShow && (
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-[0px] left-0 z-40 alertcontainer font-poppins text-">
          <div
            className="inline-block align-bottom sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 transform transition-all ease-in-out duration-300"
            style={{
              opacity: 1,
              transform: 'scale(1)',
              animation: 'modalFadeIn 0.3s'
            }}
          >
            {renderPopupContent()}
          </div>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Forms;