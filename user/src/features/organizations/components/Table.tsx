import WebIcon from "@mui/icons-material/Web";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC, useMemo } from "react";
import { getPage } from "utils/apiHelpers";
import { organizationQueries } from "..";
import { CardTable } from "components/tables/CardTable";
import { pink, green, red } from "@mui/material/colors";
import { Link } from "react-router-dom"; // Ensure to import Link correctly
WebIcon
import EditIconButton from "components/buttons/EditIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { storage } from "utils/storage";
import { diffInDays } from "utils/transforms";

type Props = {};

export const OrganizationTable: FC<Props> = () => {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const { edit } = useEventSearchParams();
  const query = organizationQueries.useAll({ search, page });
  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  const currentPage = getPage(data, page);

  // Process data into card format
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
    <>
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
            // bgcolor: pink[500],
            width: 56,
            height: 56,
            fontSize: "30px",
            mb: 1,
          }}
        >
          {item.icon} {/* Replace with dynamic icon */}
        </Avatar>

        {/* Organization Name */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          {item.name}
        </Typography>

        {/* Status & Expiry */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Tooltip title={`Status: ${item.status}`}>
            {item.status === "active" ? (
              <CheckCircleIcon sx={{ color: green[500], fontSize: 24 }} />
            ) : (
              <CancelIcon sx={{ color: red[500], fontSize: 24 }} />
            )}
          </Tooltip>
          <Typography variant="body2" color="text.secondary" fontSize={16}>
            Expires after: {diffInDays(item.expiresDate)} day
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
      </Link>
      <ButtonsStack>
        <EditIconButton onClick={() => edit(item.id)} />
      </ButtonsStack>
    </>
  );

  return (
    <CardTable
      title="Organization Subscriptions"
      data={dataCard || []}
      renderCardContent={renderCardContent}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
