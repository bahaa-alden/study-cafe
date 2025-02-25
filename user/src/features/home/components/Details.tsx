import WebIcon from "@mui/icons-material/Web";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { homeQueries } from "..";
import { CountCard } from "./CountCard";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { getPage } from "utils/apiHelpers";
export default function Details() {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const query = homeQueries.useAll({
    search,
    page,
  });
  const { data } = query;

  const currentPage = getPage(data, page);

  const dataCard = useMemo(
    () =>
      currentPage.map((e) => ({
        icon: <WebIcon sx={{ fill: "#F47560" }} />,
        label: e.name.toLocaleUpperCase(),
        secLabel: e.recentSubscription.status,
        count: e.sessionHourlyRate,
        fadedLabel: e.recentSubscription.expiresDate,
        fadedCount: 1,
      })),
    [currentPage]
  );
  return (
    <Stack
      sx={{
        gap: 2,
        width: 1,
        ">*": { flex: { xs: "100%", md: "45%", lg: 1 } },
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      {dataCard.map((card, i) => (
        <CountCard key={card.label} index={i} {...card} />
      ))}
    </Stack>
  );
}
