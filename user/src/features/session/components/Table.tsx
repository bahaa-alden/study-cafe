import { FC, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Stack,
  Tooltip,
  Typography,
  CardContent,
  useTheme,
  Grid,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CakeIcon from "@mui/icons-material/Cake";
import { teal } from "@mui/material/colors";
import { getPage } from "utils/apiHelpers";
import { CardTable } from "components/tables/CardTable";
import { sessionQueries } from "..";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { EndForm } from "./EndForm";
import { getCurrencySign } from "utils/transforms";
import { isThereNext, isTherePrev } from "constants/apiList";
import { DessertAddForm } from "./DessertAddForm";
import { useTranslation } from "react-i18next";
import SearchFilter from "components/inputs/SearchFilter";
import FilterRow from "components/layout/FilterRow";
import AddFab from "components/buttons/AddFab";
import useEventSearchParams from "hooks/useEventSearchParams";

type Props = {};

export const SessionTable: FC<Props> = () => {
  const [activeDessertSession, setActiveDessertSession] = useState<
    string | null
  >(null);

  const theme = useTheme();
  const { t } = useTranslation("session");
  const { add } = useEventSearchParams();

  // Get query params
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();

  const query = sessionQueries.useAll({
    search,
    page,
  });
  const { data } = query;
  const currentPage = getPage(data, page);

  const dataCard = useMemo(
    () =>
      currentPage?.map((session) => ({
        id: session.id,
        icon: <AccessTimeIcon sx={{ fontSize: 50, color: "white" }} />,
        name: `Session #${session.user?.name}`,
        status: session.status,
        startTime: session.startTime || "Not Started",
        endTime: session.endTime || "Ongoing",
        price: session.totalCost || "0",
      })) || [],
    [currentPage]
  );

  const renderCardContent = (item: any) => (
    <CardContent>
      <Avatar
        sx={{
          bgcolor: theme.palette.grey[600],
          width: 64,
          height: 64,
          fontSize: "34px",
          mb: 2,
        }}
      >
        {item.icon}
      </Avatar>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
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
        End:
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

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 3, p: 2 }}
      >
        <div>
          <EndForm id={item.id} status={item.status} />
        </div>
        <Tooltip title={t("addDessert")}>
          <Button
            variant="contained"
            sx={{
              width: "110px",
              height: "40px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              backgroundColor: theme.palette.grey[600],
              "&:hover": { backgroundColor: theme.palette.grey[800] },
            }}
            onClick={() =>
              setActiveDessertSession(
                activeDessertSession === item.id ? null : item.id
              )
            }
            startIcon={<CakeIcon sx={{ color: "white" }} />}
            disabled={item.status === "ended"}
          >
            {t("form.dessert")}
          </Button>
        </Tooltip>
        {activeDessertSession === item.id && (
          <DessertAddForm
            data={item}
            isAddDessertActive={!!activeDessertSession}
            setActiveDessertSession={setActiveDessertSession}
          />
        )}
      </Stack>
    </CardContent>
  );

  return (
    <>
      <Stack spacing={0}>
        <AddFab hideOnScroll onClick={() => add()} />
        <FilterRow>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SearchFilter />
          </Grid>
        </FilterRow>

        <CardTable
          title="Study Café Sessions"
          pageData={dataCard || []}
          renderCardContent={renderCardContent}
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
