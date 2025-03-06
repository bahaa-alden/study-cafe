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
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { transformFiled, transformKey } from "utils/transforms";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

export const StatisticsChart: FC<{ fromDate?: Dayjs; toDate?: Dayjs }> = ({
  fromDate,
  toDate,
}) => {
  const { t: tCommon } = useTranslation();

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
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {tCommon("Revenue by Day")}
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
                name={tCommon("Sessions Revenue")}
              />
              <Bar
                dataKey="dessertsRevenue"
                fill="#82ca9d"
                name={tCommon("Desserts Revenue")}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {tCommon("Revenue by Month")}
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
                name={tCommon("Sessions Revenue")}
              />
              <Bar
                dataKey="dessertsRevenue"
                fill="#82ca9d"
                name={tCommon("Desserts Revenue")}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {tCommon("Sessions by Status")}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.sessionsByStatus}
                dataKey="count"
                nameKey={({ _id }) => tCommon(_id)}
                outerRadius={120}
                fill="#8884d8"
                label={({ cx, cy, midAngle, outerRadius, name, index }) => {
                  const RADIAN = Math.PI / 180;
                  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
                  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

                  // Increase the offsets for the x2, y2, xText, and yText to make the line taller
                  const x2 =
                    cx + (outerRadius + 40) * Math.cos(-midAngle * RADIAN); // Increased from +20 to +40
                  const y2 =
                    cy + (outerRadius + 40) * Math.sin(-midAngle * RADIAN); // Increased from +20 to +40
                  const xText =
                    cx + (outerRadius + 60) * Math.cos(-midAngle * RADIAN); // Increased from +40 to +60
                  const yText =
                    cy + (outerRadius + 60) * Math.sin(-midAngle * RADIAN); // Increased from +40 to +60

                  return (
                    <>
                      {/* Line extending outside */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={colors[index % colors.length]} // Match label color with slice color
                        strokeWidth={2}
                      />
                      {/* Label text at the end of the line */}
                      <text
                        x={xText}
                        y={yText}
                        fill={colors[index % colors.length]} // Match text color with slice color
                        fontSize={14}
                        fontWeight="bold"
                        textAnchor={xText > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${tCommon(name)}`}
                      </text>
                    </>
                  );
                }}
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
            {tCommon("Desserts Sales")}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.dessertsByMonth[0].data}
                dataKey="revenue"
                nameKey={transformKey("name")}
                outerRadius={120}
                fill="#82ca9d"
                label={({ cx, cy, midAngle, outerRadius, name, index }) => {
                  const RADIAN = Math.PI / 180;
                  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
                  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

                  // Increase the offsets for the x2, y2, xText, and yText to make the line taller
                  const x2 =
                    cx + (outerRadius + 40) * Math.cos(-midAngle * RADIAN); // Increased from +20 to +40
                  const y2 =
                    cy + (outerRadius + 40) * Math.sin(-midAngle * RADIAN); // Increased from +20 to +40
                  const xText =
                    cx + (outerRadius + 60) * Math.cos(-midAngle * RADIAN); // Increased from +40 to +60
                  const yText =
                    cy + (outerRadius + 60) * Math.sin(-midAngle * RADIAN); // Increased from +40 to +60

                  return (
                    <>
                      {/* Line extending outside */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={colors[index % colors.length]} // Match label color with slice color
                        strokeWidth={2}
                      />
                      {/* Label text at the end of the line */}
                      <text
                        x={xText}
                        y={yText}
                        fill={colors[index % colors.length]} // Match text color with slice color
                        fontSize={14}
                        fontWeight="bold"
                        textAnchor={xText > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {transformFiled(name)}
                      </text>
                    </>
                  );
                }}
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
};
