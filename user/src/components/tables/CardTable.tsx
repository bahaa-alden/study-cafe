import { Box, Card, Stack, Typography, Button } from "@mui/material";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";

type CardTableProps<T> = {
  title: string;
  data: Array<T & { id: string }>;
  renderCardContent: (item: T & { id: string }) => JSX.Element; // A function to render the card content dynamically
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
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: CardTableProps<T>) => {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
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
            alignItems: "center",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {data.map((item) => (
            <Card
              key={item["id"]}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: { xs: "100%", sm: "45%", md: "30%" },
                minHeight: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {renderCardContent(item)}
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
              backgroundColor: "#F47560",
              color: "#fff",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#d96050" },
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
