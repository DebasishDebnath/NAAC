import React, { useState, useEffect } from "react";
import data from "../../../constant/test.json";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/ResizablePanels";
import squareSvg from "../../../Assets/square.svg";
import { useFormSubmission } from "../../../Apis/FormSubmission/FormSubmission";
import UserSideTable from "@/components/Table/UserSideTable";
import { Eye, PanelRightOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDraft } from "@/Apis/Drafts/UserDrafts";
import usePreviewDataPseudo from "@/Apis/PseudoAdmin/PseudoAdminGetAllFiles";

function PsudoUserEdit() {
  const formData = data;
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [formDates, setFormDates] = useState({});
  const [formValues, setFormValues] = useState({});
  const { formSubmit } = useFormSubmission();
  const [popUpShow, setPopUpShow] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [endPointGet, setEndPointGet] = useState("CategoryI/teaching_duties");
  const [checkCategoryI, setCheckCategoryI] = useState(true);
  const [reports, setReports] = useState([]);
  const { fetchDraft } = useUserDraft();
  const navigate = useNavigate();
  const { previewDataPseudo } = usePreviewDataPseudo();
  const userId = useParams()?.id;

  // Add new state for storing the report being edited
  const [editingReportId, setEditingReportId] = useState(null);
  // Add a flag to prevent form reset when editing
  const [isEditing, setIsEditing] = useState(false);
  // Add a flag to track if initial loading is complete
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await previewDataPseudo();
      const categoryData = formData.form[selectedCategory];
      const selectedForm = categoryData?.forms[selectedSubcategory];
      console.log("Response from previewDataPseudo:", response);
      const grabData = response?.data?.data.find(
        (item) => item.UserId === userId
      );
      console.log("grabData", grabData, selectedForm);
      const newResponse = grabData.data.find(
        (item) => item?.model === selectedForm?.backend_table_name
      );
      setReports(newResponse?.entry || []);
    } catch (error) {}
  };

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Initial load from sessionStorage - runs only once
  useEffect(() => {
    setInitialLoadComplete(true);
  }, []);

  useEffect(() => {
    // Get the endpoint immediately
    console.log(
      "Initial load from sessionStorage: 186",
      selectedCategory,
      selectedSubcategory
    );
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];
    if (selectedForm?.endpoint) {
      console.log("Setting initial endpoint:", selectedForm.endpoint);
      setEndPointGet(selectedForm.endpoint);
    }
  }, [selectedCategory, selectedSubcategory]);

  // Log changes to selected category and subcategory
  useEffect(() => {
    console.log(
      "Category/Subcategory changed:",
      selectedCategory,
      selectedSubcategory
    );
  }, [selectedCategory, selectedSubcategory]);

  // Format categories with fallback names
  const categories = formData.form.map((category) => ({
    name: category.name || category.type || "Untitled Category",
    subItems: category.forms.map((form) => form.tableName || "Untitled Form"),
  }));

  // Automatically select first form if only one exists
  useEffect(() => {
    const selectedCategoryForms = formData.form[selectedCategory]?.forms || [];
    console.log("Initial load from sessionStorage:209", selectedCategoryForms);
    if (selectedCategoryForms.length === 1) {
      // setSelectedSubcategory(0);
    }
  }, [selectedCategory]);

  // Initialize form values from the data - ONLY when not editing
  useEffect(() => {
    // Skip initialization if we're currently editing
    if (isEditing) return;

    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (selectedForm) {
      const initialValues = {};
      selectedForm.tableData.forEach((field) => {
        if (field.backend_field_name) {
          initialValues[field.backend_field_name] = field.value || "";
        }
      });
      setFormValues(initialValues);
    }
  }, [selectedCategory, selectedSubcategory, isEditing]);

  // Update endpoint when category or subcategory changes
  useEffect(() => {
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (selectedForm?.endpoint) {
      console.log(
        "Updating endpoint based on selection:",
        selectedForm.endpoint
      );
      setEndPointGet(selectedForm.endpoint);
    }
  }, [selectedCategory, selectedSubcategory]);

  // Fetch reports when endpoint changes
  useEffect(() => {
    // Only fetch if we have a valid endpoint and initial load is complete
    if (endPointGet && initialLoadComplete) {
      console.log("Fetching reports for endpoint:", endPointGet);
      fetchReports();
    }
  }, [endPointGet, initialLoadComplete]);

  const handleCategorySelect = (catIndex) => {
    // Reset editing state when changing category
    setEditingReportId(null);
    setIsEditing(false);
    setSelectedCategory(catIndex);
    const categoryForms = formData.form[catIndex]?.forms || [];
    setSelectedSubcategory(0); // reset or select only form
  };

  const handleSubcategorySelect = (subIndex) => {
    // Reset editing state when changing subcategory
    setEditingReportId(null);
    setIsEditing(false);
    setSelectedSubcategory(subIndex);
  };

  // Handle form input changes
  const handleInputChange = (backendFieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [backendFieldName]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Form Values:", formValues);

    // Check if all required fields are filled
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (!selectedForm) return;

    const backend_table_name = selectedForm.backend_table_name;
    const type = categoryData.type;
    const endpoint = selectedForm.endpoint;

    console.log(
      "Submitting form with endpoint:",
      endpoint,
      "editing ID:",
      editingReportId
    );

    // If we're editing, use update endpoint or method
    const data = await formSubmit(formValues, endpoint, editingReportId);

    if (!data?.success) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }

    console.log("Submission response:", data);

    if (selectedForm) {
      const requiredFields = selectedForm.tableData
        .filter((field) => field.required && field.backend_field_name)
        .map((field) => field.backend_field_name);

      const missingFields = requiredFields.filter(
        (field) => !formValues[field]
      );

      if (missingFields.length > 0) {
        enqueueSnackbar("Please fill all required fields", {
          variant: "error",
        });
        return;
      }

      // Submit the form
      enqueueSnackbar(
        editingReportId
          ? "Report updated successfully"
          : "Form submitted successfully",
        { variant: "success" }
      );
      setPopUpShow(false);

      // Reset the editing state
      setEditingReportId(null);
      setIsEditing(false);

      // Refresh the reports list
      fetchReports();

      // Reset form values
      const initialValues = {};
      selectedForm.tableData.forEach((field) => {
        if (field.backend_field_name) {
          initialValues[field.backend_field_name] = field.value || "";
        }
      });
      setFormValues(initialValues);
    }
  };

  // Handle edit button click from TableComp
  const handleEdit = (report) => {
    console.log("Editing report:", report);

    // Set the editing flags first
    setIsEditing(true);
    setEditingReportId(report?._id);

    // Populate form values with the report data
    const newFormValues = {};

    // Get all fields from the current form
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (selectedForm) {
      // Initialize with defaults or values from the report
      selectedForm.tableData.forEach((field) => {
        if (field.backend_field_name) {
          // Set the values from the report if they exist, otherwise use defaults
          const value =
            report[field.backend_field_name] !== undefined
              ? report[field.backend_field_name]
              : field.value || "";

          newFormValues[field.backend_field_name] = value;

          // Also update the date picker if it's a date field
          if (field.fieldType === "Date" && report[field.backend_field_name]) {
            try {
              const dateValue = new Date(report[field.backend_field_name]);
              setFormDates((prev) => ({
                ...prev,
                [field.backend_field_name]: dateValue,
              }));
            } catch (e) {
              console.error("Failed to parse date:", e);
            }
          }
        }
      });

      // Update the form values state
      setFormValues(newFormValues);
    }
  };

  const cancelEditing = () => {
    setEditingReportId(null);
    setIsEditing(false);

    // Reset form values
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (selectedForm) {
      const initialValues = {};
      selectedForm.tableData.forEach((field) => {
        if (field.backend_field_name) {
          initialValues[field.backend_field_name] = field.value || "";
        }
      });
      setFormValues(initialValues);
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
          <h2 className="text-lg font-medium">
            {editingReportId
              ? `Edit ${selectedForm.tableName || "Form"}`
              : selectedForm.tableName || "Untitled Form"}
          </h2>
          {/* {!editingReportId && <span className='text-gray-500'>Total Submissions: {3}</span>} */}
          {editingReportId && (
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Editing Report ID: {editingReportId}
              </span>
              <button
                onClick={cancelEditing}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel Editing
              </button>
            </div>
          )}
        </div>

        {formFields.map((field, index) => {
          // Make sure each field has a backend_field_name to track in state
          const fieldKey = field.backend_field_name || `field_${index}`;

          return (
            <div key={index} className="mb-4 transition-opacity duration-300">
              <>
                {field?.syntax && (
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field?.syntax}
                  </label>
                )}

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.fieldName}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
              </>

              {field.fieldType === "Text" && (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ""}
                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                />
              )}

              {field.fieldType === "Number" && (
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ""}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    handleInputChange(fieldKey, val);
                  }}
                />
              )}

              {field.fieldType === "Date" && (
                <DatePicker
                  selected={formDates[fieldKey] || null}
                  onChange={(date) => {
                    setFormDates((prev) => ({ ...prev, [fieldKey]: date }));
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
                    value={formValues[fieldKey] || ""}
                    onChange={(e) =>
                      handleInputChange(fieldKey, e.target.value)
                    }
                  >
                    {field.options &&
                      field.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {field.fieldType === "TextArea" && (
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder={field.placeholder}
                  value={formValues[fieldKey] || ""}
                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                ></textarea>
              )}

              {field.placeholder && field.fieldType !== "Options" && (
                <p className="mt-1 text-sm text-gray-500">
                  {field.placeholder}
                </p>
              )}
            </div>
          );
        })}

        <div className="pt-2 pb-6">
          <button
            className={`px-4 py-2 ${
              editingReportId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium rounded-md transition`}
            onClick={handleSubmit}
          >
            {editingReportId ? "Update" : "Submit"}
          </button>

          {editingReportId && (
            <button
              className="px-4 py-2 ml-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[80vh] flex flex-col ">
      <div className="h-[100%] flex">
        {/* Sidebar */}
        <div
          className={`h-full pt-12 relative overflow-y-auto p-4 mr-2.5 border-gray-200 bg-white rounded-xl transition-all duration-300 ${
            isCollapsed ? "w-[15%]" : "w-[30%]"
          }`}
        >
          <div
            onClick={handleToggleSidebar}
            className="absolute top-2 right-4 cursor-pointer"
          >
            <PanelRightOpen size={24} />
          </div>
          <nav className="space-y-1">
            {categories.map((category, catIndex) => {
              const isActiveCategory = selectedCategory === catIndex;
              const isSingleForm = category.subItems.length === 1;

              return (
                <div key={catIndex}>
                  {/* Category Header */}
                  <div
                    className={`flex items-center px-3 py-2 transition-all duration-200 ${
                      isSingleForm && isActiveCategory
                        ? "bg-[#002946] text-white"
                        : isActiveCategory
                        ? "bg-[#002946] text-[#fff]"
                        : "hover:bg-[#676767a6] bg-[#676767] text-white"
                    } rounded-md cursor-pointer mb-1 gap-3 ${
                      checkCategoryI ? "" : ""
                    }`}
                    onClick={
                      checkCategoryI
                        ? () => handleCategorySelect(catIndex)
                        : () =>
                            enqueueSnackbar("Submit Category I First", {
                              variant: "error",
                            })
                    }
                  >
                    <img src={squareSvg} alt="" className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </div>

                  {/* Subcategories: Show only if more than one */}
                  {isActiveCategory &&
                    category.subItems.length > 1 &&
                    category.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center ml-4 w-full"
                      >
                        <div
                          className={`flex justify-between items-center text-[#002946] text-[15px] font-bold px-3 py-2 ml-4 text-sm transition-colors duration-150 ${
                            selectedSubcategory === subIndex
                              ? "font-[#002946] bg-[#00294634]"
                              : "text-[#676767] hover:bg-gray-50"
                          } rounded-md cursor-pointer relative w-full`}
                          onClick={() => handleSubcategorySelect(subIndex)}
                        >
                          {/* Left side: dot + name */}
                          <div className="flex items-center gap-2">
                            {selectedSubcategory !== subIndex && (
                              <div className="h-[6px] w-[6px] bg-[#676767] border border-gray-400 rounded-full"></div>
                            )}
                            <span>{subItem}</span>
                          </div>

                          {/* Right side: number */}
                          {/* {selectedSubcategory !== subIndex && (
                          <div className='text-white bg-slate-400 px-2 rounded-full min-w-[16px] h-[16px] flex justify-center items-center text-xs ml-4'>
                            3
                          </div>
                        )} */}
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
          </nav>
        </div>

        <ResizablePanelGroup direction="horizontal" className="flex-grow gap-2">
          {/* Main content - Form Panel */}
          <ResizablePanel defaultSize={22} className="max-h-full">
            <div className="h-full  flex flex-col bg-white rounded-xl">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold mb-1">
                  Academic Performance Indicators
                </h1>
                <p className="text-gray-500">
                  Manage your academic activities and achievements.
                </p>
              </div>
              <div className="flex-grow overflow-y-auto p-6">
                {renderFormFields()}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle
            className={
              "bg-gray-400 h-24 justify-self-center self-center w-1 rounded-full"
            }
          />

          {/* Table Panel */}
          <ResizablePanel
            defaultSize={20}
            className="max-h-full max-w-full md:max-w-[calc(100vw-800px)] overflow-auto"
          >
            <div className="h-full overflow-y-auto bg-white rounded-xl">
              <UserSideTable reports={reports || [{}]} onEdit={handleEdit} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="flex w-full justify-end mt-8">
        <div
          className="bg-[#002946] flex items-center gap-2 px-6 py-3 text-[1.2rem] mb-4 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#002946a2] transform hover:scale-105"
          onClick={() => {
            navigate("previewsubmit");
          }}
        >
          <Eye />
          Preview & Submit
        </div>
      </div>
    </div>
  );
}

export default PsudoUserEdit;
