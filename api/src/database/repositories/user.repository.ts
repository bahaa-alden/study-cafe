import { BaseRepository, FindOptions } from './base.repository';
import { OrderDirection, OrderOptions } from '../../utils/order';
import { FilterQuery } from 'mongoose';
import User, { IUser } from '../models/user.model';
import { RoleCode } from '../../utils/enum';

export interface UserOrderOptions extends OrderOptions {
  column: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserFilterOptions {
  dateFrom?: Date;
  dateTo?: Date;
  role?: RoleCode;
}

export interface FindUserOptions extends FindOptions<UserFilterOptions> {
  order: UserOrderOptions;
}

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findForUser(options: FindUserOptions): Promise<IUser[]> {
    const { pagination, order, search, filter } = options;
    const query: FilterQuery<IUser> = { deletedAt: null };
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = filter.dateFrom;
      }
      if (filter.dateTo) {
        query.createdAt.$lte = filter.dateTo;
      }
    }

    if (filter?.role === RoleCode.USER) {
      query.role = RoleCode.USER;
    }

    if (search) {
      query.$or = [
        { email: { $regex: new RegExp(search, 'i') } },
        { name: { $regex: new RegExp(search, 'i') } },
      ];
    }

    return await this.model
      .find(query)
      .skip(pagination.pageSize * (pagination.page - 1))
      .limit(pagination.pageSize)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      });
  }

  async exists(email: string): Promise<boolean> {
    const doc = await this.model.findOne({ email }).where({ deletedAt: null });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async existsName(name: string): Promise<boolean> {
    const doc = await this.model.findOne({ name }).where({ deletedAt: null });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async findPrivateProfileById(id: string): Promise<IUser | null> {
    return await this.model.findById(id).where({ deletedAt: null });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return await this.model
      .findById(id)
      .where({ deletedAt: null })
      .select('+email +password');
  }

  // find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model
      .findOne({ email })
      .where({ deletedAt: null })
      .select('+email +password +name');
  }

  async findByUsername(name: string): Promise<IUser | null> {
    return await this.model.findOne({ name }).where({ deletedAt: null });
  }
}
export const userRepository = new UserRepository();
