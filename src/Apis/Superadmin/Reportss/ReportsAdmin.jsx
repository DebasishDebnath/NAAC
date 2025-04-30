import { useHttp } from "@/hooks/useHttp";
import React from "react";

export const UseReportsAdmin = () => {
  const { getReq } = useHttp();
  const token = sessionStorage.getItem("token");

  const ReportsAdmin = async (page = 1, limit = 10, status = "Approved") => {
    try {
      const response = await getReq(
        `api/v2/superAdmin/getContribution?page=${page}&limit=${limit}&status=${status}`, 
        token
      );
      console.log("Reports Admin Fetch:", response);
      return response;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  };

  return { ReportsAdmin };
};