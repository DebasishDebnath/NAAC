import React, { useState, useEffect } from 'react';
import data from '../../constant/test.json';

function Forms() {
  const formData = data;

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);

  // Format categories with fallback names
  const categories = formData.form.map((category) => ({
    name: category.name || category.type || "Untitled Category",
    subItems: category.forms.map(form => form.tableName || "Untitled Form"),
  }));

  // Automatically select first form if only one exists
  useEffect(() => {
    const selectedCategoryForms = formData.form[selectedCategory]?.forms || [];
    if (selectedCategoryForms.length === 1) {
      setSelectedSubcategory(0);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (catIndex) => {
    setSelectedCategory(catIndex);
    const categoryForms = formData.form[catIndex]?.forms || [];
    setSelectedSubcategory(0); // reset or select only form
  };

  const handleSubcategorySelect = (subIndex) => {
    setSelectedSubcategory(subIndex);
  };

  const renderFormFields = () => {
    const categoryData = formData.form[selectedCategory];
    const selectedForm = categoryData?.forms[selectedSubcategory];

    if (!selectedForm) return null;

    const formFields = selectedForm.tableData;

    return (
      <div className="space-y-6 transition-all duration-500 ease-in-out">
        <h2 className="text-lg font-medium">{selectedForm.tableName || "Untitled Form"}</h2>

        {formFields.map((field, index) => (
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
                defaultValue={field.value}
              />
            )}

            {field.fieldType === "Number" && (
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                placeholder={field.placeholder}
                defaultValue={field.value}
              />
            )}

            {field.fieldType === "Options" && (
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md pr-10">
                  {field.options && field.options.map((option, optIndex) => (
                    <option key={optIndex}>{option}</option>
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
                defaultValue={field.value}
              ></textarea>
            )}

            {field.placeholder && field.fieldType !== "Options" && (
              <p className="mt-1 text-sm text-gray-500">{field.placeholder}</p>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 overflow-y-auto p-4">
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
                  <div className='flex items-center'>
                  
                  {selectedSubcategory !== subIndex &&
                    <div className='h-full min-w-[10px] border-gray-400 border-[1px] '></div>
                    }
                  
                  <div
                    key={subIndex}
                    className={`flex items-center px-3 py-2 ml-4 text-sm transition-colors duration-150 ${
                      selectedSubcategory === subIndex
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    } rounded-md cursor-pointer`}
                    onClick={() => handleSubcategorySelect(subIndex)}
                  >
                    <span>{subItem}</span>
                  </div>

                  </div>
                ))}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-1">Academic Performance Indicators</h1>
        <p className="text-gray-500 mb-8">Manage your academic activities and achievements.</p>
        <div className="border-t border-gray-200 mb-6"></div>
        {renderFormFields()}
      </div>
    </div>
  );
}

export default Forms;
