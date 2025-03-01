import WebIcon from "@mui/icons-material/Web";
import { Avatar, Box, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC, useMemo } from "react";
import { getPage } from "utils/apiHelpers";
import { organizationQueries } from "..";
import { CardTable } from "components/tables/CardTable";
import { Link } from "react-router-dom"; // Ensure to import Link correctly
import EditIconButton from "components/buttons/EditIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { storage } from "utils/storage";
import { isThereNext, isTherePrev } from "constants/apiList";
import AddFab from "components/buttons/AddFab";
import { green, red, pink } from "@mui/material/colors";
import { diffInDays } from "utils/transforms";

type Props = {};

export const OrganizationTable: FC<Props> = () => {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const { edit, add } = useEventSearchParams();
  const query = organizationQueries.useAll({ search, page });
  const { data } = query;

  const currentPage = getPage(data, page);

  const dataCard = useMemo(
    () =>
      currentPage?.map((e) => ({
        id: e.id,
        icon: <WebIcon sx={{ fontSize: 50, fill: "#F47560" }} />,
        name: e.name.toLocaleUpperCase(),
        status: e.recentSubscription?.status,
        sessionHourlyRate: e.sessionHourlyRate,
        expiresDate: e.recentSubscription?.expiresDate,
      })) || [],
    [currentPage]
  );

  const renderCardContent = (item: any) => (
    <CardContent>
      {item.expiresDate ? (
        <Link
          to={`${item.id}/sessions`}
          style={{
            textDecoration: "none",
            display: "inline-block",
            width: "100%",
          }}
          onClick={() => storage.setOrg(item.id)}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontSize: "30px",
              mb: 2,
            }}
          >
            {item.icon}
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            {item.name}
          </Typography>
        </Link>
      ) : (
        <Box
          style={{
            textDecoration: "none",
            display: "inline-block",
            width: "100%",
            cursor: "not-allowed",
            opacity: 0.5,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontSize: "30px",
              mb: 2,
            }}
          >
            {item.icon}
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            {item.name}
          </Typography>
        </Box>
      )}
      {/* Status & Expiry */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Tooltip title={`Status: ${item.status}`}>
          {item.status === "active" ? (
            <CheckCircleIcon sx={{ color: green[500], fontSize: 21 }} />
          ) : (
            <CancelIcon sx={{ color: red[500], fontSize: 21 }} />
          )}
        </Tooltip>
        <Typography variant="body2" color="text.secondary" fontSize={16}>
          Expires after:{" "}
          {isNaN(diffInDays(item.expiresDate))
            ? 0
            : diffInDays(item.expiresDate)}{" "}
          day
          {diffInDays(item.expiresDate) !== 1 ? "s" : ""}
        </Typography>
      </Stack>

      {/* Hourly Rate */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <AccessTimeIcon sx={{ color: pink[500], fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {item.sessionHourlyRate} LSI/hour
        </Typography>
      </Stack>
      <ButtonsStack>
        <EditIconButton onClick={() => edit(item.id)} />
      </ButtonsStack>
    </CardContent>
  );

  return (
    <>
      <AddFab hideOnScroll onClick={() => add()} />
      <CardTable
        title="Organization Subscriptions"
        pageData={dataCard || []}
        renderCardContent={renderCardContent}
        infiniteQuery={query}
        pageNumber={page}
        isThereNext={isThereNext(data?.pages[0].total ?? 0, page)}
        isTherePrev={isTherePrev(page)}
      />
    </>
  );
};
