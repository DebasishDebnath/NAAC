import { useState, useEffect } from "react";
import { Trash2, Search, Mail, Plus } from "lucide-react";
import { addEmail } from "@/Apis/Superadmin/AddEmail/Addemail";
import { fetchEmails } from "@/Apis/Superadmin/GetEmail/GetEmail";

export default function ImprovedEmailList() {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emails, setEmails] = useState([]);

  const { addEmailsuperadmin } = addEmail();
  const { fetchEmailsuperadmin } = fetchEmails();
  useEffect(() => {
    console.log(emails);
  }, [emails]);

  useEffect(() => {
    const fetchEmailsList = async () => {
      try {
        setLoading(true);
        const response = await fetchEmailsuperadmin();

        // Check if response.data is an array and has the expected structure
        setEmails(response);
      } catch (error) {
        console.error("Error fetching emails:", error);
        setError("An error occurred while fetching emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailsList();
  }, []);

  const handleAddEmail = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (emails.includes(email)) {
      setError("Email already exists in the list");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await addEmailsuperadmin({ email });

      if (response.success) {
        setEmail("");
        setEmails((prevEmails) => [...prevEmails, email]);
      } else {
        setError(response.message || "Failed to add email");
      }
    } catch (error) {
      console.error("Error adding email:", error);
      setError("An error occurred while adding the email");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter((e) => e !== emailToDelete));
  };

  const filteredEmails = emails.filter((email) =>
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Email List</h1>

      <div className="w-full mb-6">
        <div className="flex items-center mb-1">
          <Mail className="text-gray-500 mr-2" size={20} />
          <label className="flex font-medium text-gray-700">
            Add New Email <div className="text-red-500 ml-1">*</div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-2">
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
            />
          </div>
          <button
            onClick={handleAddEmail}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center justify-center whitespace-nowrap ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? (
              "Adding..."
            ) : (
              <>
                <Plus size={18} className="mr-2" />
                Add Email
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
            {error}
          </p>
        )}
      </div>

      <div className="w-full mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-4 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading && !error && emails.length === 0 ? (
        <div className="w-full text-center py-8">
          <p className="text-gray-500">Loading emails...</p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email Address
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 w-20">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-800">{email}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteEmail(email)}
                        className="text-gray-400 hover:text-red-600 transition p-1 rounded-full hover:bg-red-50"
                        title="Delete Email"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-gray-400 py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Mail size={32} className="mb-2 opacity-30" />
                      <p className="text-sm">No emails found</p>
                      {searchTerm && (
                        <p className="text-xs mt-1">
                          Try a different search term
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {emails.length > 0 && (
        <div className="w-full mt-4 text-right text-sm text-gray-500">
          Showing {filteredEmails.length} of {emails.length} email
          {emails.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
