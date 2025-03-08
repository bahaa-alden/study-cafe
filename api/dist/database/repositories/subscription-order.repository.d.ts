import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type ISubscriptionOrder } from '../models/subscription-order.model';
export interface SubscriptionOrderFilterOptions {
    organizationId?: string;
}
export interface SubscriptionOrderFindOptions extends FindOptions<SubscriptionOrderFilterOptions> {
    order: OrderOptions;
}
export declare class SubscriptionOrderRepository extends BaseRepository<ISubscriptionOrder> {
    constructor();
    findById(id: string): Promise<ISubscriptionOrder | null>;
    findForAdmin(options: SubscriptionOrderFindOptions): Promise<PaginatedList<ISubscriptionOrder>>;
}
export declare const subscriptionOrderRepository: SubscriptionOrderRepository;
