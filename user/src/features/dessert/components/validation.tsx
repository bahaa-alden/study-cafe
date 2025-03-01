import z from "lib/zod";
import { DessertAction } from "../api/type";
import { DessertType } from "constants/enums";

export const dessertDefaultForm: DessertAction = {
  name: "",
  type: DessertType.drink,
  price: 0,
};

export const dessertSchema: z.ZodType<DessertAction> = z.object({
  name: z.string().nonempty(),
  type: z.nativeEnum(DessertType),
  price: z.number(),
});
