import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import SubscriptionPlan, {
  type ISubscriptionPlan,
} from '../models/subscription-plan.model';

export interface SubscriptionPlanFilterOptions {
  //filters
}

export interface SubscriptionPlanFindOptions
  extends FindOptions<SubscriptionPlanFilterOptions> {
  order: OrderOptions;
}

export class SubscriptionPlanRepository extends BaseRepository<ISubscriptionPlan> {
  constructor() {
    super(SubscriptionPlan);
  }

  async findForAdmin(
    options: SubscriptionPlanFindOptions,
  ): Promise<PaginatedList<ISubscriptionPlan>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<ISubscriptionPlan> = { deletedAt: null };
    if (search) {
      query.$or = [];
    }

    const total = await this.model.where(query).countDocuments();
    const results = await this.model
      .find(query)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      })
      .limit(pagination.pageSize)
      .skip((pagination.page - 1) * pagination.pageSize);

    return { results, total };
  }
}

export const subscriptionPlanRepository = new SubscriptionPlanRepository();
