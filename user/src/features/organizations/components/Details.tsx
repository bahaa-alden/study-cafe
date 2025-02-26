import WebIcon from "@mui/icons-material/Web";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { organizationQueries } from "..";
import { CountCard } from "./CountCard";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { getPage } from "utils/apiHelpers";
import PaginationButtons from "components/tables/PaginationTable/PaginationButtons";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import { useHandlePageChange } from "components/tables/PaginationTable/useHandlePageChange";

export default function OrganizationsPage() {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const query = organizationQueries.useAll({ search, page });
  const { data, isError, fetchNextPage, fetchPreviousPage } = query;

  const currentPage = getPage(data, page);
  const handlePageChange = useHandlePageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: [],
  });
  // Transform data into card-friendly format
  const dataCard = useMemo(
    () =>
      currentPage?.map((e) => ({
        icon: <WebIcon sx={{ fill: "#F47560" }} />,
        label: e.name.toLocaleUpperCase(),
        secLabel: e.recentSubscription.status,
        count: e.sessionHourlyRate,
        fadedLabel: e.recentSubscription.expiresDate,
        fadedCount: 1,
      })) || [],
    [currentPage]
  );

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        My Organizations
      </Typography>

      {/* Error Handling */}
      {isError && (
        <Box display="flex" justifyContent="center">
          <SomethingWentWrong />
        </Box>
      )}

      {/* Data Grid */}
      {!isError && (
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {dataCard.map((card, i) => (
            <Box
              key={card.label}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "30px", // Oblong shape
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: { xs: "100%", sm: "100%", md: "50%" },
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <CountCard index={i} {...card} />
            </Box>
          ))}
        </Stack>
      )}

      {/* Pagination Controls */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, justifyContent: "center" }}
      >
        <PaginationButtons
          page={page}
          handleChangePage={handlePageChange}
          data={data}
        />
      </Stack>
    </Box>
  );
}
