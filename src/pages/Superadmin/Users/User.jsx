import { MailIcon, BriefcaseIcon } from "lucide-react";
import { UserFetch } from "@/Apis/Superadmin/AllUserFetch/UserFetch";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { fetchUserSearch } from "@/Apis/Superadmin/SearchUser/UserSearch";

function PeopleList() {
  const { fetchUserSearchsuperadmin } = fetchUserSearch();
  const { GetAllsuperadmin } = UserFetch();
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [copiedText, setCopiedText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  // Fetch users from the backend
  const fetchAllUsers = async (currentPage) => {
    setIsLoading(true);
    try {
      const response = await GetAllsuperadmin("", currentPage, limit);
      if (response) {
        setAllUsers(response.data || []);
        setDisplayedUsers(response.data || []);
        const pages = response.pagination?.totalPages;
        setTotalPages(typeof pages === "number" ? pages : 1);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // If search term is empty, return to normal pagination view
      setIsSearchMode(false);
      fetchAllUsers(page);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchUserSearchsuperadmin(searchTerm);
      // Handle the response directly without checking success flag
      // Based on console logs, response seems to be the array of users
      if (response && Array.isArray(response)) {
        setIsSearchMode(true);
        setSearchResults(response);
        setDisplayedUsers(response); // Directly set displayed users
        setSearchPage(1); // Reset to first page of search results
        console.log("Search results found:", response.length);
      } else if (response?.data && Array.isArray(response.data)) {
        // Alternative structure if response is wrapped in data property
        setIsSearchMode(true);
        setSearchResults(response.data);
        setDisplayedUsers(response.data); // Directly set displayed users
        setSearchPage(1);
        console.log("Search results found:", response.data.length);
      } else {
        console.error("Invalid search response format:", response);
        setIsSearchMode(true);
        setSearchResults([]);
        setDisplayedUsers([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setDisplayedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      fetchAllUsers(page);
    }
  }, [page, isSearchMode]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Clear search mode if field is emptied
    if (!e.target.value.trim()) {
      setIsSearchMode(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 1000);
  };

  const handlePrevious = () => {
    if (isSearchMode) {
      if (searchPage > 1) {
        setSearchPage(searchPage - 1);
      }
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };

  const handleNext = () => {
    if (isSearchMode) {
      const maxSearchPages = Math.ceil(searchResults.length / limit);
      if (searchPage < maxSearchPages) {
        setSearchPage(searchPage + 1);
      }
    } else {
      if (page < totalPages) {
        setPage(page + 1);
      }
    }
  };

  // Paginate search results on client side - only if we have more than one page of results
  useEffect(() => {
    if (isSearchMode && searchResults.length > limit) {
      const startIndex = (searchPage - 1) * limit;
      const endIndex = startIndex + limit;
      setDisplayedUsers(searchResults.slice(startIndex, endIndex));
    }
  }, [searchResults, searchPage, isSearchMode, limit]);

  const getCurrentPage = () => (isSearchMode ? searchPage : page);

  const getMaxPages = () => {
    if (isSearchMode) {
      return Math.ceil(searchResults.length / limit) || 1;
    }
    return totalPages;
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="text-black font-medium text-xl ml-10">All Users</div>
        <div className="py-4 px-4 sm:px-8 flex w-[30%] items-end justify-end">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 px-4 sm:px-8 items-center justify-center min-h-[50%]">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="mx-auto flex flex-wrap gap-6 justify-start">
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-[400px] flex rounded-xl bg-white shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center p-6 space-x-4">
                    <img
                      src={user.profilePic || "/default-avatar.png"}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                    />
                    <div className="w-64">
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-lg font-semibold text-gray-900 truncate"
                          title={user.name}
                        >
                          {user.name}
                        </h3>
                        <FaCopy
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => handleCopy(user.name)}
                        />
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <BriefcaseIcon className="w-4 h-4 mr-1" />
                        {user.designation}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MailIcon className="w-4 h-4 mr-1" />
                        <p
                          className="truncate max-w-[180px]"
                          title={user.emailId}
                        >
                          {user.emailId}
                        </p>
                        <FaCopy
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => handleCopy(user.emailId)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full mt-4">
                No users found.
              </div>
            )}
          </div>
        )}

        {copiedText && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            Copied: {copiedText}
          </div>
        )}
      </div>

      {displayedUsers.length > 0 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={getCurrentPage() === 1 || isLoading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            <GrFormPrevious />
          </button>
          <span className="text-gray-700">
            Page {getCurrentPage()} of {getMaxPages()}
            {isSearchMode && (
              <span className="ml-2 text-sm text-blue-500">
                (Search results)
              </span>
            )}
          </span>
          <button
            onClick={handleNext}
            disabled={getCurrentPage() === getMaxPages() || isLoading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            <GrFormNext />
          </button>
        </div>
      )}
    </>
  );
}

export default PeopleList;
