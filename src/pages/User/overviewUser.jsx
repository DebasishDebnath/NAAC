import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Journal Publications",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  { name: "Books Publication", total: Math.floor(Math.random() * 5000) + 1000 },
  {
    name: "Books Chapter / Conference Proceedings",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  { name: "Editor of Book", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Translation Work", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Consultancy", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Patent Status", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Research Project", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Award/Fellowship", total: Math.floor(Math.random() * 5000) + 1000 },
  {
    name: "Event Organiser / Participation",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Development of Innovative Pedagogy",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Design of New Curriculam and Courses (ICT Based)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Development of Complete MOOC's in 4 Quadrant (4 Credit Course)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "MOOCs (development in 4 quadrant) per module / lecture",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Content Writer/Subject Matter Expert for each Module of MOOCs (At Least One Quadrant)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Course Coordinator for MOOCs",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Development of E-Content in 4 quadrants for a Complete Course / E-Book",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "E-Content (developed in 4 quadrants) Per Module",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Contribution to development of E-Content module in Complete Course / E-Book (at least one quadrant)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Editor of E-Content for Complete Course / E-Book",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Status as Guide - Ph.D. Guidance (Degree Awarded)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Status as Guide - Ph.D. Guidance (for Pursuing Students)",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "M.Phil./P.G Dissertation Guidance",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Online AI Courses",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function OverviewUser() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-20}
          height={50}
          textAnchor="end"
          tickFormatter={(name) =>
            name.length > 15 ? `${name.slice(0, 15)}...` : name
          }
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "3px",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifySelf: "center",
          }}
          formatter={(value, name, props) => {
            return [`: ${value}`];
          }}
        />
        <Bar dataKey="total" fill="#002946" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
