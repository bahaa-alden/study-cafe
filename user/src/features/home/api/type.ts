import { SubscriptionStatus } from "constants/enums";
import { APIListParams } from "types/api";

export type Organization = {
  sessionHourlyRate: number;
  recentSubscription: {
    expiresDate: string;
    startsDate?: string;
    status: SubscriptionStatus;
  };
  name: string;
};

export type ByDay = {
  day: string;
  comments?: number;
  products: number;
  soldProducts?: number;
};

export type Profit = {
  totalValue: number;
  date: string;
};

export type SalesPerCategory = {
  categoryCount: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  categoryName: string;
  categoryPercentage: number;
};

export type OrganizationAllParams = APIListParams;
