import { Box, Card, Stack, Typography, Button } from "@mui/material";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import { SessionStatus } from "constants/enums";

type CardTableProps<T> = {
  title: string;
  data: Array<T & { id: string; status: SessionStatus }>;
  renderCardContent: (
    item: T & { id: string; status: SessionStatus }
  ) => JSX.Element;
  isError: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
};

export const CardTable = <T,>({
  title,
  data,
  renderCardContent,
  isError,
  isFetchingNextPage, // Set a fixed height
  fetchNextPage,
  hasNextPage,
}: CardTableProps<T>) => {
  // Determine if cards should have a fixed height based on the status
  const isAllNotEnded = data.every(
    (item) => item.status !== SessionStatus.ended
  );

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
          {data.map((item) => (
            <Card
              key={item["id"]}
              sx={{
                borderRadius: "25px",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                width: { xs: "90%", sm: "100%", md: "25%" }, // Ensures uniform width
                minHeight: "250px", // Set a base min-height
                height: isAllNotEnded ? "250px" : "auto", // Ensures equal height if needed
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

      {/* Load More Button */}
      {hasNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D77A61",
              color: "#fff",
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#C96C56" },
            }}
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
};
