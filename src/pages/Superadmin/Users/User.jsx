import { MailIcon, BriefcaseIcon } from "lucide-react";
import { UserFetch } from "@/Apis/Superadmin/AllUserFetch/UserFetch";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function PeopleList() {
  const { GetAllsuperadmin } = UserFetch();
  const [allUsers, setAllUsers] = useState([]); // Store all fetched users
  const [displayedUsers, setDisplayedUsers] = useState([]); // Users to display after filtering
  const [page, setPage] = useState(1);
  const limit = 12;
  const [totalPages, setTotalPages] = useState(1);
  const [copiedText, setCopiedText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [filteredTotalPages, setFilteredTotalPages] = useState(1);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  // Fetch users from the backend
  const fetchAllUsers = async (currentPage) => {
    setIsLoading(true);
    try {
      const response = await GetAllsuperadmin("", currentPage, limit);
      if (response?.success) {
        setAllUsers(response.data || []);
        setDisplayedUsers(response.data || []);
        const pages = response.pagination?.totalPages;
        setTotalPages(typeof pages === "number" ? pages : 1);
        setFilteredTotalPages(typeof pages === "number" ? pages : 1);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setDisplayedUsers(allUsers);
      setFilteredTotalPages(totalPages);
      setCurrentSearchPage(1);
      return;
    }
    const searchLower = searchTerm.toLowerCase();
    const filtered = allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.emailId?.toLowerCase().includes(searchLower)
    );

    // Implement client-side pagination for filtered results
    const totalFilteredPages = Math.ceil(filtered.length / limit) || 1;
    setFilteredTotalPages(totalFilteredPages);

    // Ensure current page is valid
    const validPage = Math.min(currentSearchPage, totalFilteredPages);
    if (currentSearchPage !== validPage) {
      setCurrentSearchPage(validPage);
    }

    const startIndex = (validPage - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedUsers(filtered.slice(startIndex, endIndex));
  };


  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchAllUsers(page);
      setHasFetchedOnce(true);
    }
  }, [page]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim()) {
        setCurrentSearchPage(1);
        filterUsers();
      } else {
        if (hasFetchedOnce) {
          fetchAllUsers(page);
        }
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // useEffect(() => {
  //   if (searchTerm.trim()) {
  //     filterUsers();
  //   }
  // }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 1000);
  };

  const handlePrevious = () => {
    if (searchTerm.trim()) {
      if (currentSearchPage > 1) {
        setCurrentSearchPage(currentSearchPage - 1);
      }
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };

  const handleNext = () => {
    if (searchTerm.trim()) {
      if (currentSearchPage < filteredTotalPages) {
        setCurrentSearchPage(currentSearchPage + 1);
      }
    } else {
      if (page < totalPages) {
        setPage(page + 1);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="text-black font-medium text-xl ml-10">All Users</div>
        <div className="py-4 px-4 sm:px-8 flex w-[30%] items-end justify-end">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            disabled={
              (searchTerm ? currentSearchPage === 1 : page === 1) || isLoading
            }
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            <GrFormPrevious />
          </button>
          <span className="text-gray-700">
            Page {searchTerm ? currentSearchPage : page} of{" "}
            {searchTerm ? filteredTotalPages : totalPages}
            {searchTerm && (
              <span className="ml-2 text-sm text-blue-500">
                (Search results)
              </span>
            )}
          </span>
          <button
            onClick={handleNext}
            disabled={
              (searchTerm
                ? currentSearchPage === filteredTotalPages
                : page === totalPages) || isLoading
            }
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
