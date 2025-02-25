import { Stack } from "@mui/material";
import { Details } from "features/home";
export default function HomePage() {
  return (
    <Stack gap={1}>
      <Details />
      <Stack direction={{ md: "row" }} mt={5}></Stack>
    </Stack>
  );
}
