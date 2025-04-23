import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const EmailListManager = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAddEmail = () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (emails.includes(email)) {
      setError("This email is already in the list.");
      return;
    }

    setEmails([...emails, email]);
    setEmail("");
    setError("");
  };

  const handleDeleteEmail = (targetEmail) => {
    setEmails(emails.filter((e) => e !== targetEmail));
  };

  const filteredEmails = emails.filter((e) =>
    e.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Email List</h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleAddEmail}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Email
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <input
        type="text"
        placeholder="Search emails..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full max-w-md focus:outline-none focus:ring focus:border-blue-500"
      />

      <div className="w-full max-w-md">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-left text-gray-700">
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteEmail(email)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Email"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-gray-400 py-4 italic">
                  No emails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailListManager;
