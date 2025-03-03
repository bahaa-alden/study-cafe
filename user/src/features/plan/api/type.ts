import { PlanDuration } from "constants/enums";
import { APIListParams, Payload } from "types/api";

export type Plan = {
  id: string;
  duration: PlanDuration;
  price: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type PlanAllParams = APIListParams;

export type PlanAction = {
  duration: PlanDuration;
  price: number;
  title: string;
};

export type PlanAddPayload = Payload<undefined, PlanAction>;
export type PlanEditPayload = PlanAddPayload;
export type PlanSelect = Pick<Plan, "id">;
