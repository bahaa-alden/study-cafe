import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import { useHandlePageChange } from "./PaginationTable/useHandlePageChange";
import NoData from "components/feedback/NoData";
import { APIList } from "types/api";

type CardTableProps<T> = {
  title: string;
  infiniteQuery: UseInfiniteQueryResult<APIList<unknown>, unknown>;
  renderCardContent: (item: T & { id: string }) => JSX.Element;
  pageData: Array<T & { id: string }>;
  pageNumber: number;
  isThereNext: boolean;
  isTherePrev: boolean;
};

export const CardTable = <T,>({
  title,
  infiniteQuery,
  renderCardContent,
  pageData,
  pageNumber,
  isThereNext,
  isTherePrev,
}: CardTableProps<T>) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    data,
    isSuccess,
    isError,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = infiniteQuery;
  const handlePageChange = useHandlePageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: [],
  });
  console.log(isTherePrev, isThereNext);
  const noData = !data?.pages[0].results.length && isSuccess;
  return (
    <Box sx={{ p: 4, width: "100%", fontFamily: "MontserratArabic" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#5E3B3B",
        }}
      >
        {title}
      </Typography>
      {noData && (
        <Box sx={{ mx: "auto", my: 2 }}>
          <NoData />
        </Box>
      )}
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
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {pageData.map((item) => (
            <Card
              key={item["id"]}
              sx={{
                borderRadius: "25px",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                padding: "2px",
                width: { xs: "100%", sm: "65%", md: "300px" }, // Ensures uniform width
                minHeight: "300px", // Set a base min-height
                height: {
                  xs: "250px",
                  sm: "300px",
                  md: "300px",
                }, // Ensures equal height if needed
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between", // Ensures even spacing
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                {renderCardContent(item)}
              </Box>
            </Card>
          ))}
        </Stack>
      )}

      <Stack
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            onClick={() => handlePageChange(null, pageNumber - 1)}
            disabled={
              !isTherePrev || isFetchingNextPage || isFetchingPreviousPage
            }
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#5E3B3B",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
              opacity:
                !isTherePrev || isFetchingNextPage || isFetchingPreviousPage
                  ? 0.5
                  : 1,
            }}
          >
            {isFetchingPreviousPage ? "Loading..." : "Previous"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            onClick={() => handlePageChange(null, pageNumber + 1)}
            disabled={
              !isThereNext || isFetchingNextPage || isFetchingPreviousPage
            }
            style={{
              padding: "10px 40px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#5E3B3B",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
              opacity:
                !isThereNext || isFetchingNextPage || isFetchingPreviousPage
                  ? 0.5
                  : 1,
            }}
          >
            {isFetchingNextPage ? "Loading..." : "Next"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
