import React from 'react';
import { Download } from 'lucide-react';
import jspdf from "jspdf";
import autoTable from 'jspdf-autotable';

// ReportPDFGenerator - A reusable component for generating PDF reports
// This can be imported and used in any component that needs to generate reports
const ReportPDFGenerator = ({ report, buttonText = "Download Report", buttonClass = "", iconClass = "" }) => {
  // Format date to "Apr 30, 2025" format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return the original string if there's an error
    }
  };

  // Helper function to ensure value is displayed properly
  const formatValue = (value) => {
    if (value === undefined || value === null) return "N/A";
    if (typeof value === 'boolean') return value ? "Yes" : "No";
    return value.toString();
  };

  // Define category title mappings
  const getCategoryTitle = (modelName) => {
    const titleMap = {
      "journalPublications": "Journal Publications",
      "book_chapter_conference_publications": "Book Chapter / Conference Proceedings",
      "translation_work": "Translation Work",
      "editor_book": "Editor of Book",
      "development_of_innovative_pedagogy": "Development of Innovative Pedagogy",
      "design_of_new_curricula": "Design of New Curricula",
      "MOOCsDevelopment": "MOOCs Development",
      "MOOCsContentWriter": "MOOCs Content Writer",
      "MOOCsModule": "MOOCs Module",
      "MOOCsCourseCoordinator": "MOOCs Course Coordinator",
      "e_content": "E-Content Development",
      "e_content_module": "E-Content Module",
      "event_org_part": "Event Organization & Participation",
      "fellowshipandAwards": "Fellowships & Awards",
      "research_project": "Research Projects",
      "status_as_guided_phd": "Ph.D. Guidance",
      "dissertation": "Dissertation Guidance",
      "OnlineCourse": "Online Courses Completed",
      "PolicyDocument": "Policy Documents"
    };
    
    // Return the mapped title if it exists, otherwise format the model name
    return titleMap[modelName] || modelName
      .trim()
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to get appropriate headers for each category
  const getCategoryHeaders = (modelName, entryData) => {
    // If no entries, extract headers from the first entry
    if (!entryData || entryData.length === 0) {
      return [];
    }
    
    // Define specific headers for known models
    const headerMap = {
      "journalPublications": [
        "Category", 
        "Journal Name", 
        "Paper Title", 
        "Category of Journal",
        "Type of Journal", 
        "Publication Date", 
        "ISSN", 
        "Impact Factor", 
        "Scopus Index", 
        "Score"
      ],
      "book_chapter_conference_publications": [
        "Status of Authors", 
        "Paper Name", 
        "Conference Name", 
        "Book Title", 
        "Publisher", 
        "Year", 
        "Score"
      ],
      "translation_work": [
        "Number of Author", 
        "Title of the Book", 
        "Publisher Name", 
        "Score"
      ],
      "editor_book": [
        "Name of Editors", 
        "Book Title", 
        "Publishers", 
        "Type", 
        "Score"
      ],
      "development_of_innovative_pedagogy": [
        "Description", 
        "Contributors", 
        "Score"
      ],
      "design_of_new_curricula": [
        "Description", 
        "Contributors", 
        "Score"
      ],
      "MOOCsDevelopment": [
        "Description", 
        "Credit Score", 
        "Score"
      ],
      "MOOCsContentWriter": [
        "Description", 
        "Score"
      ],
      "MOOCsModule": [
        "Description", 
        "Score"
      ],
      "event_org_part": [
        "Name of Event", 
        "Role", 
        "Type of Event", 
        "Event Duration", 
        "Score"
      ],
      "fellowshipandAwards": [
        "Name of Fellowship", 
        "Type of Fellowship", 
        "Awarding Agency", 
        "Date", 
        "Score"
      ],
      "research_project": [
        "Investigator Status", 
        "Project Status", 
        "Project Title", 
        "Category", 
        "Fund Amount (Rs)", 
        "Grant Date", 
        "Duration", 
        "Score"
      ],
      "status_as_guided_phd": [
        "Student Name", 
        "Research Topic", 
        "Domain", 
        "PhD Award Date", 
        "Guidance Type", 
        "Score"
      ],
      "dissertation": [
        "Student Name", 
        "Research Topic", 
        "Domain", 
        "Dissertation Type", 
        "Score"
      ],
      "OnlineCourse": [
        "Course Name", 
        "Platform", 
        "Number of Hours", 
        "Score"
      ],
      "PolicyDocument": [
        "Status", 
        "Description", 
        "Score"
      ]
    };
    
    // Return mapped headers if available
    if (headerMap[modelName]) {
      return headerMap[modelName];
    }
    
    // Generate headers from the first entry keys
    const firstEntry = entryData[0];
    const headers = Object.keys(firstEntry)
      .filter(key => 
        key !== "_id" && key !== "__v" && 
        key !== "createdAt" && key !== "updatedAt" &&
        !key.includes("Drive_link") && !key.includes("Drive_Link")
      )
      .map(key => {
        // Format the key as a header
        return key
          .replace(/_/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      });
    
    return headers;
  };

  // Function to get appropriate data for each category's table
  const getCategoryData = (modelName, entryData) => {
    if (!entryData || entryData.length === 0) {
      return [];
    }
    
    // Specific data formatting for known models
    const formatters = {
      "journalPublications": (entry) => [
        formatValue(entry.Category),
        formatValue(entry.Journal_Name),
        formatValue(entry.Paper_Title),
        formatValue(entry.Category_of_Journal),
        formatValue(entry.Type_of_Journal),
        formatDate(entry.Publication_Date),
        formatValue(entry.ISSN),
        formatValue(entry.Impact_Factor),
        formatValue(entry.Scopus_Index),
        formatValue(entry.journal_publications_score)
      ],
      "book_chapter_conference_publications": (entry) => [
        formatValue(entry.Status_of_authors),
        formatValue(entry.Paper_Name),
        formatValue(entry.Conference_Name),
        formatValue(entry.Book_Title),
        formatValue(entry.Publisher),
        formatValue(entry.Year),
        formatValue(entry.Book_chapter_score)
      ],
      "translation_work": (entry) => [
        formatValue(entry.Number_of_author),
        formatValue(entry.Title_of_the_book),
        formatValue(entry.Publisher_name),
        formatValue(entry.Translation_work_score)
      ],
      "editor_book": (entry) => [
        formatValue(entry.Name_of_Editors),
        formatValue(entry.Book_Title),
        formatValue(entry.Publishers),
        formatValue(entry.Type),
        formatValue(entry.editor_book_score)
      ],
      "development_of_innovative_pedagogy": (entry) => [
        formatValue(entry.Description),
        formatValue(entry.Contributor_Contributors),
        formatValue(entry.pedogogies_score)
      ],
      "design_of_new_curricula": (entry) => [
        formatValue(entry.Description),
        formatValue(entry.Contributors),
        formatValue(entry.curriculas_score)
      ],
      "MOOCsDevelopment": (entry) => [
        formatValue(entry.Description),
        formatValue(entry.Credit_Score),
        formatValue(entry.moocs_score)
      ],
      "MOOCsContentWriter": (entry) => [
        formatValue(entry.Description),
        formatValue(entry.moocs_score)
      ],
      "MOOCsModule": (entry) => [
        formatValue(entry.Description),
        formatValue(entry.moocs_score)
      ],
      "event_org_part": (entry) => [
        formatValue(entry.Name_of_Event),
        formatValue(entry.Role),
        formatValue(entry.Type_of_Event),
        formatValue(entry.Event_duration),
        formatValue(entry.event_org_part_score)
      ],
      "fellowshipandAwards": (entry) => [
        formatValue(entry.Name_of_Fellowship),
        formatValue(entry.Type_of_Fellowship),
        formatValue(entry.Name_Award_agency),
        formatDate(entry.Date),
        formatValue(entry.fellowship_score)
      ],
      "research_project": (entry) => [
        formatValue(entry.Status_of_Investigator),
        formatValue(entry.Status),
        formatValue(entry.Title_of_the_project),
        formatValue(entry.Category),
        formatValue(entry.Fund_in_Rs),
        formatDate(entry.Date_of_Grant),
        formatValue(entry.Duration),
        formatValue(entry.research_project_score)
      ],
      "status_as_guided_phd": (entry) => [
        formatValue(entry.student_name),
        formatValue(entry.research_topic),
        formatValue(entry.domain),
        formatDate(entry.Phd_award_date),
        formatValue(entry.Guidance_type),
        formatValue(entry.Guidance_score)
      ],
      "dissertation": (entry) => [
        formatValue(entry.Name_of_Student),
        formatValue(entry.Topic_of_Research),
        formatValue(entry.Domain),
        formatValue(entry.Dissertation),
        formatValue(entry.dissertation_score)
      ],
      "OnlineCourse": (entry) => [
        formatValue(entry.Name_of_Course),
        formatValue(entry.Platform),
        formatValue(entry.Number_of_Hours),
        formatValue(entry.course_score)
      ],
      "PolicyDocument": (entry) => [
        formatValue(entry.Status),
        formatValue(entry.Description),
        formatValue(entry.policy_score)
      ]
    };
    
    // If we have a formatter for this model, use it
    if (formatters[modelName]) {
      return entryData.map(entry => formatters[modelName](entry));
    }
    
    // Default behavior - extract only visible fields (remove internal fields and Drive links)
    const firstEntry = entryData[0];
    const keys = Object.keys(firstEntry).filter(key => 
      key !== "_id" && key !== "__v" && 
      key !== "createdAt" && key !== "updatedAt" &&
      !key.includes("Drive_link") && !key.includes("Drive_Link")
    );
    
    return entryData.map(entry => {
      return keys.map(key => {
        // Apply special formatting for dates and other values
        if (key.toLowerCase().includes("date")) {
          return formatDate(entry[key]);
        } else {
          return formatValue(entry[key]);
        }
      });
    });
  };

  // Function to generate and download the PDF report
  const generatePDF = () => {
    if (!report) {
      console.error("No report data available");
      return;
    }

    try {
      const doc = new jspdf();
      let yPosition = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = pageWidth / 2;
      
      // Add title and headers
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("IEM-UEM Group", centerX, yPosition, { align: 'center' });
      yPosition += 7;
      
      doc.setFontSize(14);
      doc.text("Academic Performance Report", centerX, yPosition, { align: 'center' });
      yPosition += 7;
      
      // Format current date for report
      const today = new Date();
      const formatPeriodDate = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };
      
      doc.setFontSize(12);
      doc.text(`${formatPeriodDate(today)}`, centerX, yPosition, { align: 'center' });
      yPosition += 15;
      
      // Add user details
      doc.setFontSize(14);
      doc.text("User Details", 14, yPosition);
      yPosition += 10;
      
      // Create headers and data arrays for user details
      const userHeaders = [];
      const userData = [];
      
      if (report.UserId) {
        if (report.UserId.name) {
          userHeaders.push("Name");
          userData.push(report.UserId.name);
        }
        
        if (report.UserId.emailId) {
          userHeaders.push("Email");
          userData.push(report.UserId.emailId);
        }
        
        if (report.UserId.department) {
          userHeaders.push("Department");
          userData.push(report.UserId.department);
        }
        
        if (report.UserId.designation) {
          userHeaders.push("Designation");
          userData.push(report.UserId.designation);
        }
        
        if (report.UserId.campus) {
          userHeaders.push("Campus");
          userData.push(report.UserId.campus);
        }
        
        if (report.UserId.mobileNo) {
          userHeaders.push("Contact");
          userData.push(report.UserId.mobileNo);
        }
      }
      
      // Add total score if available
      if (report.obtainedScore !== undefined) {
        userHeaders.push("Total Score");
        userData.push(formatValue(report.obtainedScore));
      }
      
      // Add user details table
      if (userHeaders.length > 0) {
        autoTable(doc, {
          startY: yPosition,
          head: [userHeaders],
          body: [userData],
          theme: 'grid',
          headStyles: { fillColor: [0, 41, 70], textColor: [255, 255, 255] }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
      }
      
      // Process each category
      if (report.data && Array.isArray(report.data)) {
        // Sort categories to ensure consistent order
        const sortedCategories = [...report.data].sort((a, b) => {
          // If score is available, sort by higher score first
          if (a.score !== undefined && b.score !== undefined) {
            return b.score - a.score;
          }
          // Alphabetical fallback
          return a.model.localeCompare(b.model);
        });
        
        sortedCategories.forEach((category) => {
          // Skip categories with no entries
          if (!category.entry || !Array.isArray(category.entry) || category.entry.length === 0) {
            return;
          }
          
          // Get appropriate title, headers, and data for this category
          const categoryTitle = getCategoryTitle(category.model);
          const headers = getCategoryHeaders(category.model, category.entry);
          const data = getCategoryData(category.model, category.entry);
          
          // Add category to PDF if we have data
          if (data.length > 0) {
            // Check if we need a page break
            if (yPosition > 260) {
              doc.addPage();
              yPosition = 15;
            }
            
            // Add section title
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(categoryTitle, 14, yPosition);
            yPosition += 7;
            
            // Add category score
            if (category.score !== undefined) {
              doc.setFontSize(10);
              doc.setFont('helvetica', 'italic');
              doc.text(`Category Score: ${formatValue(category.score)}`, 14, yPosition);
              yPosition += 7;
            }
            
            // Add table
            autoTable(doc, {
              startY: yPosition,
              head: [headers],
              body: data,
              theme: 'grid',
              headStyles: { fillColor: [0, 41, 70], textColor: [255, 255, 255] },
              // Set column styles to handle long text
              columnStyles: {
                // Make sure text wraps in cells
                ...headers.reduce((acc, _, i) => {
                  acc[i] = { cellWidth: 'auto' };
                  return acc;
                }, {})
              },
              // Reduce font size for tables with many columns
              styles: {
                fontSize: headers.length > 5 ? 8 : 10,
                cellPadding: 2
              }
            });
            
            yPosition = doc.lastAutoTable.finalY + 15;
          }
        });
      }
      
      // Add total score at the end
      doc.addPage();
      yPosition = 15;
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("Summary", centerX, yPosition, { align: 'center' });
      yPosition += 15;
      
      // Create a summary table showing category scores
      const summaryHeaders = ["Category", "Score"];
      const summaryData = [];
      
      if (report.data && Array.isArray(report.data)) {
        report.data.forEach(category => {
          if (category.score && category.entry && category.entry.length > 0) {
            summaryData.push([
              getCategoryTitle(category.model),
              formatValue(category.score)
            ]);
          }
        });
      }
      
      // Add the summary table if we have data
      if (summaryData.length > 0) {
        autoTable(doc, {
          startY: yPosition,
          head: [summaryHeaders],
          body: summaryData,
          theme: 'grid',
          headStyles: { fillColor: [0, 41, 70], textColor: [255, 255, 255] }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
      }
      
      // Add total score
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Cumulative Score: ${report.obtainedScore || 'N/A'}`, centerX, yPosition, { align: 'center' });
      
      // Add date of report generation
      yPosition += 20;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Report generated on: ${formatDate(new Date())}`, centerX, yPosition, { align: 'center' });
      
      // Save the PDF
      const userName = report.UserId && report.UserId.name ? report.UserId.name.replace(/\s+/g, '_') : 'user';
      doc.save(`Academic_Report_${userName}_${report._id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div 
      className={`flex items-center justify-center gap-2 cursor-pointer hover:text-[#618fa8] ${buttonClass}`}
      onClick={generatePDF}
    >
      <span className='flex items-center justify-center'>
        <Download className={`w-5 h-5 ${iconClass}`} />
      </span>
      {buttonText}
    </div>
  );
};

export default ReportPDFGenerator;