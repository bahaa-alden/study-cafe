import { OrgStatus } from './../../utils/enum';

import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Organization, { type IOrganization } from '../models/organization.model';

export interface OrganizationFilterOptions {
  dateFrom?: Date;
  dateTo?: Date;

  status?: OrgStatus;

  userId?: string;
}

export interface OrganizationFindOptions
  extends FindOptions<OrganizationFilterOptions> {
  order: OrderOptions;
}

export class OrganizationRepository extends BaseRepository<IOrganization> {
  constructor() {
    super(Organization);
  }

  async findByIdWithUser(id: string, userId: string) {
    return await this.findOneBy({
      _id: id,
      userId,
      status: OrgStatus.approved,
    });
  }

  async findForAdmin(
    options: OrganizationFindOptions,
  ): Promise<PaginatedList<IOrganization>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<IOrganization> = { deletedAt: null };

    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    if (filter?.status) {
      query.status = filter.status;
    }

    if (search) {
      query.$or = [];
    }

    if (filter?.userId) {
      query.userId = filter.userId;
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

export const organizationRepository = new OrganizationRepository();
