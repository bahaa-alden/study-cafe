import { FC, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Stack,
  Tooltip,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CakeIcon from "@mui/icons-material/Cake";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { cyan, teal, grey } from "@mui/material/colors";
import { getPage } from "utils/apiHelpers";
import { CardTable } from "components/tables/CardTable";
import { SessionAddForm, sessionQueries } from "..";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { EndForm } from "./EndForm";
import { getCurrencySign } from "utils/transforms";

type Props = {};

export const SessionTable: FC<Props> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const query = sessionQueries.useAll({ search, page });

  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  const currentPage = getPage(data, page);

  // Convert API data into card format
  const dataCard = useMemo(
    () =>
      currentPage?.map((session) => ({
        id: session.id,
        icon: <AccessTimeIcon sx={{ fontSize: 50, color: teal[600] }} />,
        name: `Session #${session.user?.name}`,
        status: session.status,
        startTime: session.startTime || "Not Started",
        endTime: session.endTime || "Ongoing",
        price: session.totalCost || "0",
      })) || [],
    [currentPage]
  );

  const handleAddDessert = (id: string) => {
    console.log("Adding dessert to session", id);
  };

  const renderCardContent = (item: any) => (
    <CardContent>
      <Avatar
        sx={{
          bgcolor: teal[500],
          width: 64,
          height: 64,
          fontSize: "34px",
          mb: 2,
        }}
      >
        {item.icon}
      </Avatar>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: grey[800] }}>
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Start:{" "}
        <strong>
          {new Date(item.startTime).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        End:{" "}
        <strong>
          {item.endTime !== "Ongoing"
            ? new Date(item.endTime).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : item.endTime}
        </strong>
      </Typography>

      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", mt: 1, color: teal[700] }}
      >
        Price: {item.price} {getCurrencySign("SYP")}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Box title="End Session">
          <EndForm id={item.id}  />
        </Box>

        <Tooltip title="Add Dessert">
          <Button
            variant="contained"
            sx={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              backgroundColor: cyan[600],
              "&:hover": { backgroundColor: cyan[800] },
            }}
            onClick={() => handleAddDessert(item.id)}
            startIcon={<CakeIcon />}
            disabled={item.status === "ended"}
          >
            Dessert
          </Button>
        </Tooltip>
      </Stack>
    </CardContent>
  );

  return (
    <Stack spacing={3}>
      {/* Static Card for Creating a New Session */}
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: 3,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 7,
            transform: "scale(1.02)",
          },
          textAlign: "center",
          backgroundColor: grey[50],
        }}
      >
        <CardContent>
          <Avatar
            sx={{
              bgcolor: teal[500],
              width: 64,
              height: 64,
              fontSize: "34px",
              mb: 2,
            }}
          >
            <AddCircleIcon />
          </Avatar>

          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: grey[800] }}
          >
            Start a New Session
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click below to create a new session in the Study Café.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: teal[600],
              "&:hover": { backgroundColor: teal[800] },
            }}
            startIcon={<AddCircleIcon />}
            onClick={() => setIsActive(!isActive)}
          >
            Create Session
          </Button>
        </CardContent>
      </Card>
      <SessionAddForm isActive={isActive} setIsActive={setIsActive} />

      {/* Dynamic Session Cards */}
      <CardTable
        title="Study Café Sessions"
        data={dataCard || []}
        renderCardContent={renderCardContent}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Stack>
  );
};

export default SessionTable;
