import { Card, CardContent, Typography, Button } from "@mui/material";
import { FC } from "react";
import { Plan } from "../api/type";
import { Star, StarBorder, Diamond } from "@mui/icons-material"; // Use Star and Diamond icons

export const PlanCard: FC<{ plan: Plan }> = ({ plan }) => {
  const renderPlanIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'silver':
        return <StarBorder sx={{ fontSize: 40, color: "#C0C0C0" }} />;
      case 'gold':
        return <Star sx={{ fontSize: 40, color: "#FFD700" }} />;
      case 'diamond':
        return <Diamond sx={{ fontSize: 40, color: "#00aaff" }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        textAlign: "center",
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
        width: "100%",
        maxWidth: 400, // Proper width for better readability
        minWidth: 280, // Prevents extreme shrinking
        margin: "auto",
      }}
    >
      <CardContent>
        {renderPlanIcon(plan.title)} {/* Render icon based on plan */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          {plan.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {plan.description}
        </Typography>
        <Typography variant="h4" sx={{ my: 2, fontWeight: "bold" }}>
          ${plan.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plan.duration}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            py: 1,
            width: "100%", // Full-width button
            borderRadius: 3,
            fontSize: "1rem",
          }}
        >
          Purchase
        </Button>
      </CardContent>
    </Card>
  );
};
