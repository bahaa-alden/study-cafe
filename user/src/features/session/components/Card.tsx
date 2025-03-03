import {
  CardContent,
  Typography,
  Stack,
  Tooltip,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState, FC, useEffect } from "react";
import { getCurrencySign } from "utils/transforms";
import { DessertAddForm } from "./DessertAddForm";
import { EndForm } from "./EndForm";
import { useTranslation } from "react-i18next";
import CakeIcon from "@mui/icons-material/Cake";

export const SessionCard: FC<{ item: any }> = ({ item }) => {
  const [activeDessertSession, setActiveDessertSession] = useState<
    string | null
  >(null);

  const theme = useTheme();
  const { t } = useTranslation("session");
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (item.startTime && item.endTime === "Ongoing") {
      const startTimestamp = new Date(item.startTime).getTime();

      if (!isNaN(startTimestamp)) {
        const interval = setInterval(() => {
          const diff = Date.now() - startTimestamp;
          setElapsedTime(formatElapsedTime(diff));
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [item.startTime, item.endTime]);

  return (
    <CardContent>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "black", pt: "5px" }}
      >
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Start: <strong>{formatDate(item.startTime)}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        End: End:{" "}
        <strong>
          {item.endTime !== "Ongoing" ? formatDate(item.endTime) : elapsedTime}
        </strong>
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Desserts: <strong>{item.desserts}</strong>
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", mt: 1, color: teal[700] }}
      >
        Subtotal: {item.subtotal} {getCurrencySign("SYP")}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", mt: 1, color: teal[700] }}
      >
        Additional Cost: {item.additionalCost} {getCurrencySign("SYP")}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", mt: 1, color: teal[700] }}
      >
        Total Price: {item.price} {getCurrencySign("SYP")}
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 1, pt: 2 }}
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
};

const formatElapsedTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
