import { Dayjs } from "dayjs";

interface SessionStatus {
  _id: string;
  count: number;
}

interface RevenueByTime {
  _id: string;
  revenue: number;
  dessertsRevenue: number;
  sessionsRevenue: number;
}

interface DessertData {
  name: string;
  count: number;
  revenue: number;
}

interface DessertsByTime {
  _id: string;
  data: DessertData[];
}

export interface RevenueStats {
  totalSessions: number;
  totalRevenue: number;
  sessionsByStatus: SessionStatus[];
  revenueByDay: RevenueByTime[];
  revenueByMonth: RevenueByTime[];
  dessertsByDay: DessertsByTime[];
  dessertsByMonth: DessertsByTime[];
}

export type StatisticsParams = {
  fromDate?: Dayjs;
  toDate?: Dayjs;
};
