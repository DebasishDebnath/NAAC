import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  // const baseURL = "http://192.168.90.24:8000";
  const baseURL = "http://192.168.1.167:8000";


  const handleResponse = async (response) => {
    // Default message if none is provided
    let message = 
      response.data?.message || 
      (response.data?.success === true ? "Operation successful" : `Status ${response.status}: ${response.statusText}`);
  
    if ([401, 403].includes(response.status)) {
      showNotification(message, "error");
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
  
    // Always show notification for every response
    let variant = "info";
    
    if (response.data?.success === true) {
      variant = "success";
    } else if (response.data?.success === false) {
      variant = "error";
    } else if (response.status >= 400) {
      variant = "error";
    } else if (response.status >= 200 && response.status < 300) {
      variant = "success";
    }
    
    showNotification(message, variant);
  
    return response.data;
  };
  

  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true, // Allow handling error responses manually
      });
      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message || err.message || "An unexpected error occurred.",
        "error"
      );
      return null;
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

      const response = await axios.post(`${baseURL}/${url}`, data, {
        headers,
        validateStatus: () => true,
      });

      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message || err.message || "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getReq, postReq, loading, error, setError };
};

export const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = (message, variant = "default") => {
    if (!message) return;

    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess: (msg) => showNotification(msg, "success"),
        showError: (msg) => showNotification(msg, "error"),
        showInfo: (msg) => showNotification(msg, "info"),
        showWarning: (msg) => showNotification(msg, "warning"),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};