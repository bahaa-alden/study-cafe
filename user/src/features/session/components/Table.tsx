import { FC, useMemo } from "react";
import { Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getPage } from "utils/apiHelpers";
import { CardTable } from "components/tables/CardTable";
import { sessionQueries } from "..";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { isThereNext, isTherePrev } from "constants/apiList";
import { SessionCard } from "./Card";
import { SessionStatus } from "constants/enums";
import { Dayjs } from "dayjs";

type Props = {
  filters: {
    dateFrom?: Dayjs;
    dateTo?: Dayjs;
    status?: SessionStatus;
  };
};

export const SessionTable: FC<Props> = ({ filters }) => {
  // State for filters
  const { dateFrom, dateTo, status } = filters;
  // Get query params
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const query = sessionQueries.useAll({
    search,
    page,
    dateFrom,
    dateTo,
    status,
  });
  const { data } = query;
  const currentPage = getPage(data, page);
  const dataCard = useMemo(
    () =>
      currentPage?.map((session) => ({
        id: session.id,
        icon: <AccessTimeIcon sx={{ fontSize: 50, color: "white" }} />,
        name: `Session #${session.user?.name || session.username || "Unknown"}`,
        status: session.status,
        startTime: session.startTime || "Not Started",
        endTime: session.endTime || "Ongoing",
        price: session.totalCost || "0",
        subtotal: session.subtotal || "0",
        additionalCost: session.additionalCost || "0",
        organization: session.organization?.name || "N/A",
        desserts:
          session.desserts
            ?.map((d) => `${d.dessert.name} x${d.count}`)
            .join(", ") || "None",
      })) || [],
    [currentPage]
  );

  return (
    <>
      <Stack spacing={0} width={"100%"}>
        <CardTable
          title="Study Café Sessions"
          pageData={dataCard || []}
          CardContent={SessionCard}
          infiniteQuery={query}
          pageNumber={page}
          isThereNext={isThereNext(data?.pages[0].total ?? 0, page)}
          isTherePrev={isTherePrev(page)}
        />
      </Stack>
    </>
  );
};

export default SessionTable;
