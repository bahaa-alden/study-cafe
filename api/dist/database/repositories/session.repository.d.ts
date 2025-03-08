import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type ISession } from '../models/session.model';
export interface SessionFilterOptions {
    dateFrom?: Date;
    dateTo?: Date;
    status?: string;
    organizationId: string;
}
interface OrganizationStatistics {
    totalSessions: number;
    totalRevenue: number;
    sessionsByStatus: Array<{
        _id: string;
        count: number;
    }>;
    revenueByDay: Array<{
        date: string;
        totalRevenue: number;
    }>;
    dessertsByDay: Array<{
        date: string;
        desserts: Array<{
            name: string;
            totalSold: number;
            totalRevenue: number;
        }>;
    }>;
    revenueByMonth: Array<{
        date: string;
        totalRevenue: number;
    }>;
    dessertsByMonth: Array<{
        date: string;
        desserts: Array<{
            name: string;
            totalSold: number;
            totalRevenue: number;
        }>;
    }>;
}
export interface SessionFindOptions extends FindOptions<SessionFilterOptions> {
    order: OrderOptions;
}
export declare class SessionRepository extends BaseRepository<ISession> {
    constructor();
    findByIdWithOrg(id: string, organizationId: string): Promise<ISession | null>;
    findById(id: string): Promise<ISession | null>;
    findForAdmin(options: SessionFindOptions): Promise<PaginatedList<ISession>>;
    getOrganizationStatistics(organizationId: string, fromDate?: Date, toDate?: Date): Promise<OrganizationStatistics>;
}
export declare const sessionRepository: SessionRepository;
export {};
