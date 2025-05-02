import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UseUserSpecificReport } from "@/Apis/Superadmin/Reportss/EachReport";
// import { UseUserSpecificReport } from "@/hooks/UseUserSpecificReport";


// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to capitalize model names for display
const formatModelName = (name) => {
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={`${statusColors[status] || "bg-gray-100 text-gray-800"}`} variant={`${status}`}>
      {status}
    </Badge>
  );
};

export default function EachReportTable() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getUserSpecificReport } = UseUserSpecificReport();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("userInfo")) || {};

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await getUserSpecificReport(userId);
        setData(response);
        console.log( "ssSC", response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center text-red-600">
          <p>Error loading report: {error}</p>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <p className="text-gray-600">No report data available for this user.</p>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  const report = data.data;
  // const user = report.user;
  const reportData = report.data;

  console.log("dggd",report)
  console.log("ffsf",user)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      {/* User Info Card */}
      <Card className="mb-8 shadow-lg">
        <CardHeader className="bg-[#002946] text-white ">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Check Reports</CardTitle>
            <StatusBadge status={report.is_submitted} />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <img 
                  src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"} 
                  alt={user.name} 
                  className="h-20 w-20 rounded-full mr-4 border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-2xl font-bold">{user.name}</h3>
                  <p className="text-gray-600">{user.designation}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{user.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Campus</p>
                <p className="font-medium">{user.campus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-[#005b88de]">{user.emailId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{user.mobileNo}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Score</p>
                <p className="text-2xl font-bold text-[#005b88de]">{report.obtainedScore.toFixed(1)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Submission Date</p>
                <p className="text-lg font-medium">{formatDate(report.createdAt)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-lg font-medium">{formatDate(report.updatedAt)}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-lg font-medium">{reportData.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Data Tabs */}
      <Tabs defaultValue={reportData[0]?.model} className="w-full">
        <TabsList className="mb-4 flex overflow-x-auto">
          {reportData.map((category) => (
            <TabsTrigger 
              key={category.model} 
              value={category.model}
              className="px-4 py-2"
            >
              {formatModelName(category.model)}
              <span className="ml-2 bg-blue-100 text-[#002946] text-xs font-medium rounded-full px-2.5 py-0.5">
                {category.entry.length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {reportData.map((category) => (
          <TabsContent key={category.model} value={category.model}>
            <Card>
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle>{formatModelName(category.model)}</CardTitle>
                  <div className="text-sm font-medium">
                    Category Score: <span className="text-[#005b88de]">{category.score}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        {category.entry[0] && Object.keys(category.entry[0]).filter(key => 
                          !key.includes('_id') && 
                          !key.includes('score') && 
                          key !== 'drive_link'
                        ).map((key) => (
                          <TableHead key={key} className="whitespace-nowrap">
                            {key.replace(/_/g, ' ')}
                          </TableHead>
                        ))}
                        <TableHead>Score</TableHead>
                        <TableHead>Document</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.entry.map((item, index) => (
                        <TableRow key={item._id || index}>
                          {Object.entries(item).filter(([key]) => 
                            !key.includes('_id') && 
                            !key.includes('score') && 
                            key !== 'drive_link'
                          ).map(([key, value]) => (
                            <TableCell key={key} className="whitespace-nowrap">
                              {key.includes('Date') ? formatDate(value) : value}
                            </TableCell>
                          ))}
                          <TableCell className="font-medium text-[#005b88de]">
                            {Object.entries(item).find(([key]) => key.includes('score'))?.[1] || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {item.drive_link ? (
                              <a 
                                href={item.drive_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#005b88de] hover:text-[#002946] flex items-center"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" /> View
                              </a>
                            ) : (
                              <span className="text-gray-400">No document</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}