import React, { useEffect, useState } from "react";
import { fetchDashboard } from "@/Apis/Superadmin/Dashboard/fetchDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Overview } from "./overview";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function SuperadminDashboard() {
  const { fetchDashboardsuperadmin } = fetchDashboard();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    totalSubmission: 0,
    approvedCount: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashboardsuperadmin();
        if (response) {
          console.log(response, "dsfdsf");
          setDashboardData(response);
        } else {
          console.error("Dashboard fetch failed:", response.message);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.userCount}</div>
          </CardContent>
          <div className="flex items-end justify-end mr-5">
            <Button
              variant="destructive"
              className="hover:bg-slate-200 hover:text-black"
              onClick={() => navigate("/superadmin/users/user")}
            >
              View
            </Button>
          </div>
        </Card>

        {/* Total Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16v16H4z" stroke="none" />
              <path d="M8 8h8M8 12h6M8 16h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalSubmission}
            </div>
          </CardContent>
          <div className="flex items-end justify-end mr-5">
            <Button
              variant="destructive"
              className="hover:bg-slate-200 hover:text-black"
              onClick={() => navigate("/superadmin/reports")}
            >
              View
            </Button>
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.reviewCount}
            </div>
          </CardContent>
          <div className="flex items-end justify-end mr-5">
            <Button
              variant="destructive"
              className="hover:bg-slate-200 hover:text-black"
              onClick={() => navigate("/superadmin/requests")}
            >
              View
            </Button>
          </div>
        </Card>

        {/* Approved */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.approvedCount}
            </div>
          </CardContent>
          <div className="flex items-end justify-end mr-5 ">
            <Button
              variant="destructive"
              className="hover:bg-slate-200 hover:text-black"
              onClick={() => navigate("/superadmin/reports")}
            >
              View
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>
                    You got {dashboardData.totalSubmission} Submissions this
                    month.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SuperadminDashboard;
