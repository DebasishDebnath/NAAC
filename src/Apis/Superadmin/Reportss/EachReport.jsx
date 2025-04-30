import React from "react";
import { useHttp } from "@/hooks/useHttp";

export const UseUserSpecificReport = () => {
  const { getReq } = useHttp();
  const token = sessionStorage.getItem("token");

  const getUserSpecificReport = async (userId) => {
    if (!userId) {
      console.error("User ID is required");
      throw new Error("User ID is required");
    }

    try {
      const response = await getReq(
        `api/v2/superAdmin/getUserSpecificContribution/${userId}`, 
        token
      );
      console.log("User Specific Report Fetch:", response);
      return response;
    } catch (error) {
      console.error("Error fetching user specific report:", error);
      throw error;
    }
  };

  return { getUserSpecificReport };
};