import { Box } from "@mantine/core";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "In Draft", value: 400 },
//   { name: "Pending Submission", value: 300 },
//   { name: "Held Application", value: 300 },
//   { name: "Archived", value: 200 },
//   { name: "Submitted To RPA", value: 200 },
// ];

const DashboardPieChart = ({data}) => {

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#663399"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Box>
        <ResponsiveContainer width={350} height={200} className="text-center">
          <PieChart >
            <Legend layout="vertical" verticalAlign="bottom" align="right" />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};
export default DashboardPieChart;
