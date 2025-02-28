import { Stack } from "@mui/material";
import {
  OrganizationTable,
  OrganizationEditForm,
} from "features/organizations";

export default function OrganizationsPage() {
  return (
    <Stack gap={1}>
      <OrganizationTable />
      <OrganizationEditForm />
    </Stack>
  );
}
