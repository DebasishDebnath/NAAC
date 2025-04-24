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

    let variant = "info";
    if (response.data?.success === true) variant = "success";
    else if (response.data?.success === false || response.status >= 400) variant = "error";
    else if (response.status >= 200 && response.status < 300) variant = "success";

    showNotification(message, variant);
    return response.data;
  };

  const requestWrapper = async (method, url, token = "", data = null, isFormData = false) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const config = {
        method,
        url: `${baseURL}/${url}`,
        headers,
        data,
        validateStatus: () => true,
      };

      // Remove data key for GET/DELETE requests
      if (["get", "delete"].includes(method)) {
        delete config.data;
      }

      const response = await axios(config);
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

  const getReq = (url, token = "") => requestWrapper("get", url, token);
  const postReq = (url, token = "", data, isFormData = false) => requestWrapper("post", url, token, data, isFormData);
  const patchReq = (url, token = "", data, isFormData = false) => requestWrapper("patch", url, token, data, isFormData);
  const putReq = (url, token = "", data, isFormData = false) => requestWrapper("put", url, token, data, isFormData);
  const deleteReq = (url, token = "", data = null) => requestWrapper("delete", url, token, data);

  return {
    getReq,
    postReq,
    patchReq,
    putReq,
    deleteReq,
    loading,
    error,
    setError,
  };
};
