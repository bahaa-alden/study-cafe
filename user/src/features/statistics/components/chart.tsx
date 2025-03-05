import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { statisticsQueries } from "..";
import { Dayjs } from "dayjs";
import { useState } from "react";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

export function StatisticsChart() {
  const [fromDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();

  const query = statisticsQueries.useStatistics({
    fromDate,
    toDate,
  });

  const { data } = query;
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        padding: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Revenue by Day
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.revenueByDay}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sessionsRevenue"
                fill="#8884d8"
                name="Session Revenue"
              />
              <Bar
                dataKey="dessertsRevenue"
                fill="#82ca9d"
                name="Dessert Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Revenue by Month
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.revenueByMonth}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sessionsRevenue"
                fill="#8884d8"
                name="Session Revenue"
              />
              <Bar
                dataKey="dessertsRevenue"
                fill="#82ca9d"
                name="Dessert Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sessions by Status
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.sessionsByStatus}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data?.sessionsByStatus.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Desserts Sales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.dessertsByMonth[0].data}
                dataKey="revenue"
                nameKey="name"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {data?.dessertsByMonth[0].data?.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
