import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type ISubscription } from '../models/subscription.model';
export interface SubscriptionFilterOptions {
    organizationId?: string;
}
export interface SubscriptionFindOptions extends FindOptions<SubscriptionFilterOptions> {
    order: OrderOptions;
}
export declare class SubscriptionRepository extends BaseRepository<ISubscription> {
    constructor();
    findById(id: string): Promise<ISubscription | null>;
    findForAdmin(options: SubscriptionFindOptions): Promise<PaginatedList<ISubscription>>;
}
export declare const subscriptionRepository: SubscriptionRepository;
