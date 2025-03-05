import { OrganizationStatus, SubscriptionStatus } from "constants/enums";
import { APIListParams, Payload } from "types/api";

export type Organization = {
  id: string;
  sessionHourlyRate: number;
  recentSubscription: {
    expiresDate: string;
    startsDate?: string;
    status: SubscriptionStatus;
  };
  status: OrganizationStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationAllParams = APIListParams;

export type OrganizationAction = {
  name: string;
  sessionHourlyRate: number;
};

export type OrganizationAddPayload = Payload<undefined, OrganizationAction>;
export type OrganizationEditPayload = OrganizationAddPayload;
export type OrganizationSelect = Pick<Organization, "id" | "name">;
