import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { AppBar } from "features/layout";
import { OblongTable, OrganizationEditForm } from "features/organizations";
import { useState } from "react";

export default function OrganizationsPage() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState<boolean>(isLargeScreen);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Stack gap={1}>
      <AppBar
        open={open}
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
      />
      <OblongTable />
      <OrganizationEditForm />
    </Stack>
  );
}
