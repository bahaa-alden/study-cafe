import { Stack } from "@mui/material";
import { StatisticsChart } from "features/statistics";
import { FC } from "react";

export const StatisticsPage: FC<{}> = ({}) => {
  return (
    <Stack gap={1}>
      <StatisticsChart />
    </Stack>
  );
};
