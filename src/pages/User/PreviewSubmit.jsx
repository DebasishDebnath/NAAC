import useFinalSubmit from '@/Apis/User/FinalSubmit';
import usePreviewData from '@/Apis/User/PreviewApi';
import ReportsAccordion from '@/components/ui/ReportsAccordion';
import { useEffect, useState } from 'react';

function PreviewSubmit() {
  const { finalSubmit } = useFinalSubmit();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const { previewData } = usePreviewData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        const responseData = await previewData();

        // Map the API data to the format expected by ReportsAccordion
        const formattedReports = formatReportsData(responseData.data.data);
        
        // Calculate total score
        const calculatedTotalScore = formattedReports.reduce(
          (sum, report) => sum + (report.score || 0), 
          0
        );
        
        setReports(formattedReports);
        setTotalScore(calculatedTotalScore);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format the API data into the structure expected by ReportsAccordion
  const formatReportsData = (apiData) => {
    return apiData.map(item => {
      // Generate entries for each item in the model's entry array
      return item.entry.map(entry => {
        // Determine category based on model name
        const category = item.model === "teaching_duties" ? "Category I" : "Category II";
        
        // Get formatted table name from model name
        const tableName = formatModelName(item.model);
        
        // Calculate the score based on available score fields
        const score = 
          entry.journal_publications_score || 
          entry.book_publications_score || 
          entry.Book_chapter_score || 
          entry.editor_book_score || 
          entry.Translation_work_score || 
          entry.consultancy_score || 
          entry.status_score || 
          entry.research_project_score || 
          entry.fellowship_score || 
          entry.event_org_part_score || 
          entry.pedogogies_score || 
          entry.policy_score || 
          entry.course_score || 
          entry.dissertation_score || 
          entry.Guidance_score || 
          item.score || 
          0;
        
        return {
          facultyId: "Faculty-" + (entry._id?.substring(0, 5) || "Unknown"),
          category: category,
          tableName: tableName,
          status: "Drafts", // Assuming all are drafts from the API
          date: entry.Publication_Date || entry.Date || entry.Phd_award_date || entry.Date_of_Grant || new Date().toISOString(),
          reportId: entry._id || `report-${Math.random().toString(36).substring(2, 10)}`,
          score: score,
          modelName: item.model,
          // Store the full entry data for rendering all fields
          fullData: entry 
        };
      });
    }).flat(); // Flatten the array since we're mapping entries
  };

  // Function to convert model names to user-friendly table names
  const formatModelName = (modelName) => {
    // Convert snake_case or camelCase to Title Case with spaces
    return modelName
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const handleSubmit = () => {
    // Submit functionality
    finalSubmit();
    alert("Submission initiated!");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Preview</h1>
          <p className="text-gray-600">Review your reports before final submission</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Total Score:</span>
              <span className="text-2xl font-bold text-emerald-600">{totalScore.toFixed(1)}</span>
            </div>
            <div className="text-xs text-gray-500">Based on all submitted reports</div>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-end mb-6">
        <button
          onClick={handleSubmit}
          className="bg-[#002946] hover:bg-[#0029469d] font-semibold text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit Reports
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-y-scroll overflow-x-hidden">
        <ReportsAccordion reports={reports} />
      </div>
    </div>
  );
}

export default PreviewSubmit;