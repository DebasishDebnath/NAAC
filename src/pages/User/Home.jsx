import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { OverviewUser } from "./overviewUser";
import SubmittedReports from "./SubmittedReports";

function Home() {
  return (
    <div>
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-2 w-[100%]"
      >
        <TabsContent value="overview" className="space-y-4 w-[100%]">
          <div className="grid grid-cols-1 gap-1 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-7 w-full h-[100%]">
              <CardHeader>
                <CardTitle>Your Score Based on your past Submissions</CardTitle>
              </CardHeader>
              <CardContent className="pl-4 w-[100%]">
                <OverviewUser />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <SubmittedReports />
    </div>
  );
}

export default Home;
