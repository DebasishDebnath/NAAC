import React, { useEffect, useState } from 'react'
import { GetRequests } from '@/Apis/Superadmin/Request/GetRequests'
import RequestTable from '@/components/Table/RequestTable'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@headlessui/react'
const Requests = () => {
  const [requests, setRequests] = useState([])
const {fetchData} = GetRequests()
  useEffect(() => {
    const getRequest = async()=>{
      try {
        const response = await fetchData();
        setRequests(response)
      } catch (error) {
        console.log("Error fetching Requests!!", error)
      }
    }
    getRequest()
  }, [])
   const [searchTerm, setSearchTerm] = useState('');
      const [filteredReports, setFilteredReports] = useState([]);
      const [showFilters, setShowFilters] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState('');
      const [selectedSubReport, setSelectedSubReport] = useState('');
  
      useEffect(() => {
          if (requests) {
              setFilteredReports(requests);
          }
      }, [requests]);
  
      // Function to handle search
      const handleSearch = (e) => {
          e.preventDefault();
          filterReports();
      };
  
      // Function to normalize model names by replacing spaces with underscores
      const normalizeModelName = (modelName) => {
          if (!modelName) return '';
          return modelName.replace(/ /g, '_').toLowerCase();
      };
  
      // Function to filter reports based on search, category, and sub-report
      const filterReports = () => {
          if (!requests?.data) return;
  
          let results = [...requests.data];
  
          // Filter by search term
          if (searchTerm.trim() !== '') {
              const term = searchTerm.toLowerCase();
              const normalizedTerm = normalizeModelName(searchTerm);
              
              results = results.filter((report) => {
                  // Normalize model name for comparison if it exists
                  const normalizedModel = report.model ? normalizeModelName(report.model) : '';
                  
                  // Search in multiple fields - adjust these based on your actual data structure
                  return (
                      (report.title && report.title.toLowerCase().includes(term)) ||
                      (report.description && report.description.toLowerCase().includes(term)) ||
                      (report.author && report.author.toLowerCase().includes(term)) ||
                      (report.reportId && report.reportId.toString().includes(term)) ||
                      (normalizedModel.includes(normalizedTerm))
                  );
              });
          }
  
          // Filter by category if selected
          if (selectedCategory) {
              results = results.filter(report => report.category === selectedCategory);
          }
  
          // Filter by sub-report if selected
          if (selectedSubReport) {
              results = results.filter(report => report.subReport === selectedSubReport);
          }
  
          setFilteredReports(results);
      };
  
      // UseEffect to reset reports when searchTerm or filters change
      useEffect(() => {
          filterReports();
      }, [searchTerm, selectedCategory, selectedSubReport]);

  return (


    <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
    <h1 className='flex font-bold text-4xl pb-10 text-[#002946]'>Requests</h1>
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-6">
        <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
                className="pl-10 pr-24 py-4 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002946]"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
                className="absolute right-[2px] top-[3px] py-1 px-4  bg-[#002946] text-white rounded-lg shadow-md hover:bg-[#003b61] transition duration-300 ease-in-out"
                type="submit"
            >
                Search
            </Button>
        </form>

        <div className="flex gap-4 items-start md:items-center">
            {/* Filter button could be enabled if you want to implement the filter functionality */}
            {/* <Button
                variant="outline"
                className="flex items-center gap-2 border border-gray-300 p-2"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter className="h-4 w-4" />
                Filters
            </Button> */}
        </div>
    </div>

    {/* Add the filter panel here if you want to implement it */}
    {/* {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Category I">Category I</option>
                        <option value="Category II">Category II</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub Report</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedSubReport}
                        onChange={(e) => setSelectedSubReport(e.target.value)}
                    >
                        <option value="">All Sub Reports</option>
                        <option value="SubReport A">SubReport A</option>
                        <option value="SubReport B">SubReport B</option>
                    </select>
                </div>
            </div>
        </div>
    )} */}

    <RequestTable requests={filteredReports}  />
</div>
  )
}
export default Requests