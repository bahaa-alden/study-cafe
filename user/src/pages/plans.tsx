import { Button, Stack } from "@mui/material";
import { PlanTable } from "features/plan";
import { useNavigate } from "react-router-dom";

export default function PlansPage() {
  const navigate = useNavigate();

  return (
    <Stack
      gap={2}
      position="relative"
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      sx={{
        textAlign: "center", // Ensure text is centered
      }}
    >
      <PlanTable />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/my-organizations")}
        sx={{
          alignSelf: "center", // Center the button horizontally
        }}
      >
        Back to My Organizations
      </Button>
    </Stack>
  );
}
