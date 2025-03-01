import { Stack } from "@mui/material";
import { SessionAddForm, SessionTable } from "features/session";

export default function SessionsPage() {
  return (
    <>
      <Stack gap={1}>
        <SessionTable />
        <SessionAddForm />
      </Stack>
    </>
  );
}
