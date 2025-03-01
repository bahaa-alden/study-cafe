import { Stack } from "@mui/material";
import {
  OrganizationTable,
  OrganizationEditForm,
  OrganizationAddForm,
} from "features/organizations";

export default function OrganizationsPage() {
  return (
    <Stack gap={1}>
      <OrganizationTable />
      <OrganizationAddForm />
      <OrganizationEditForm />
    </Stack>
  );
}
