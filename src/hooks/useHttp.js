import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

const ErrorHandleContext = createContext();
export const useErrorHandle = () => useContext(ErrorHandleContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showErrorPopup } = useErrorHandle();
  const navigate = useNavigate();
  const location = useLocation();

  const baseURL = "http://localhost:5000";

  const handleResponse = async (response) => {
    if ([401, 403].includes(response.status)) {
      const errorText = await response.text();
      let errorMessage;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || `Error ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
      }

      showErrorPopup(errorMessage);
      localStorage.clear();

      const path = location.pathname;
      if (path.includes("superadmin")) {
        navigate("/login/superadmin");
      } else if (path.includes("psudosuperadmin")) {
        navigate("/login/psudosuperadmin");
      } else {
        navigate("/login/user");
      }

      return null;
    }

    return response.json();
  };

  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/${url}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(response);
    } catch (err) {
      showErrorPopup(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const postReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${baseURL}/${url}`, {
        method: "POST",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        showErrorPopup(
          resData?.message?.includes("phone")
            ? "Invalid phone number!!"
            : resData?.message || "Please fill out the form accurately."
        );
      }

      return resData;
    } catch (err) {
      showErrorPopup(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { getReq, postReq, loading, error, setError };
};
