import {
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { green, red, pink, grey } from "@mui/material/colors";
import EditIconButton from "components/buttons/EditIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "utils/storage";
import { diffInDays } from "utils/transforms";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // Subscription icon
import useEventSearchParams from "hooks/useEventSearchParams";

export const OrganizationCard: FC<{ item: any }> = ({ item }) => {
  const { edit } = useEventSearchParams();
  const navigate = useNavigate();

  const subscriptionExpired =
    !item.expiresDate || diffInDays(item.expiresDate) <= 0;

  return (
    <CardContent>
      {item.expiresDate && !subscriptionExpired ? (
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
              backgroundColor: grey[400],
            }}
          >
            {item.icon}
          </Avatar>

          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: grey[600] }}
          >
            {item.name}
          </Typography>
        </Box>
      )}

      {/* Status & Expiry */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Tooltip title={`Status: ${item.status}`}>
          {item.status === "active" && !subscriptionExpired ? (
            <CheckCircleIcon sx={{ color: green[500], fontSize: 21 }} />
          ) : (
            <CancelIcon sx={{ color: red[500], fontSize: 21 }} />
          )}
        </Tooltip>
        <Typography variant="body2" color="text.secondary" fontSize={16}>
          {subscriptionExpired
            ? "Subscription Expired"
            : `Expires in ${diffInDays(item.expiresDate)} day(s)`}
        </Typography>
      </Stack>

      {/* Hourly Rate */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <AccessTimeIcon sx={{ color: pink[500], fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {item.sessionHourlyRate} LSI/hour
        </Typography>
      </Stack>

      {/* Buttons */}
      <ButtonsStack>
        <EditIconButton onClick={() => edit(item.id)} />
        {subscriptionExpired && (
          <Tooltip title="Subscribe to a plan">
            <IconButton
              onClick={() => {
                storage.setOrg(item.id);
                navigate("/plans");
              }}
            >
              <NotificationsActiveIcon sx={{ color: "#1834e9" }} />
            </IconButton>
          </Tooltip>
        )}
      </ButtonsStack>
    </CardContent>
  );
};
