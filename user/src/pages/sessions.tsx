import { Stack } from "@mui/material";
import { SessionTable } from "features/session";

export default function SessionsPage() {
  return (
    <Stack gap={1}>
      <SessionTable />
    </Stack>
  );
}
