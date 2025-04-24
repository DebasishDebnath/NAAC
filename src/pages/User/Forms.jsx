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

function Forms() {


  // Use sample data for demonstration, in production you'd use data from props/API
  const formData = data;
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [formDates, setFormDates] = useState({});
  const [formValues, setFormValues] = useState({});

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
  const handleSubmit = () => {
    console.log("Form Values:", formValues);

    // Check if all required fields are filled
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    const backend_table_name = selectedForm.backend_table_name;
    const type = categoryData.type;

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

  return (
    <div className="h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} className="max-h-full">
          <div className="h-full overflow-y-auto p-4 border-r border-gray-200">
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
                              // <div className='h-full min-w-[10px] border-gray-400 border-[1px]'></div>
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

        <ResizableHandle />

        {/* Main content - Form Panel */}
        <ResizablePanel defaultSize={50} className="max-h-full">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-1">Academic Performance Indicators</h1>
              <p className="text-gray-500">Manage your academic activities and achievements.</p>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              {renderFormFields()}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Table Panel */}
        <ResizablePanel defaultSize={30} className="max-h-full">
          <div className="h-full overflow-y-auto">
            <div className='flex w-full justify-end'>
                <div className='bg-blue-400 px-5 py-1 text-[1.2rem] mb-4 text-white font-bold rounded shadow-md hover:shadow-lg cursor-pointer'>Preview & Submit</div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Faculty ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead className="text-right">Submitted On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyData.map((faculty) => (
                  <TableRow key={faculty.facultyId}>
                    <TableCell className="font-medium">{faculty.facultyId}</TableCell>
                    <TableCell>{faculty.name}</TableCell>
                    <TableCell>{faculty.department}</TableCell>
                    <TableCell>{faculty.designation}</TableCell>
                    <TableCell className="text-right">{faculty.submittedOn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Forms;