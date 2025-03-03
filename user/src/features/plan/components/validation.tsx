import z from "lib/zod";
import { PlanAction } from "../api/type";
import { PlanDuration } from "constants/enums";

export const planDefaultForm: PlanAction = {
  duration: PlanDuration.free,
  price: 0,
  title: "",
};

export const planSchema: z.ZodType<PlanAction> = z.object({
  duration: z.nativeEnum(PlanDuration),
  price: z.number(),
  title: z.string().nonempty(),
});
