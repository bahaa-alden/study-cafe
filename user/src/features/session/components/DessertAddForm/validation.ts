import z from "lib/zod";
import { SessionDessertAction } from "./type";

export const dessertFormDefault: SessionDessertAction = {
  count: 1,
  dessert: null,
};

const dessertSchema: z.ZodType<SessionDessertAction> = z.object({
  count: z.number(),
  dessert: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export default dessertSchema;
