import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type IPlan } from '../models/plan.model';
export interface PlanFilterOptions {
    dateFrom?: Date;
    dateTo?: Date;
}
export interface PlanFindOptions extends FindOptions<PlanFilterOptions> {
    order: OrderOptions;
}
export declare class PlanRepository extends BaseRepository<IPlan> {
    constructor();
    findForAdmin(options: PlanFindOptions): Promise<PaginatedList<IPlan>>;
}
export declare const planRepository: PlanRepository;
