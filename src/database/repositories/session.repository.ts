import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Session, { type ISession } from '../models/session.model';

export interface SessionFilterOptions {
  //filters
  dateFrom?: Date;
  dateTo?: Date;

  organizationId: string;
}

export interface SessionFindOptions extends FindOptions<SessionFilterOptions> {
  order: OrderOptions;
}

export class SessionRepository extends BaseRepository<ISession> {
  constructor() {
    super(Session);
  }

  findByIdWithOrg(
    id: string,
    organizationId: string,
  ): Promise<ISession | null> {
    return this.model
      .findOne({ _id: id, organizationId, deletedAt: null })
      .populate('organization');
  }

  findById(id: string): Promise<ISession | null> {
    return this.model
      .findById(id)
      .where({ deletedAt: null })
      .populate('organization');
  }

  async findForAdmin(
    options: SessionFindOptions,
  ): Promise<PaginatedList<ISession>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<ISession> = { deletedAt: null };
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    if (search) {
      query.$or = [];
    }

    if (filter?.organizationId) {
      query.organizationId = filter.organizationId;
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

export const sessionRepository = new SessionRepository();
