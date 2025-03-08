import { OrgStatus } from './../../utils/enum';
import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type IOrganization } from '../models/organization.model';
export interface OrganizationFilterOptions {
    dateFrom?: Date;
    dateTo?: Date;
    status?: OrgStatus;
    userId?: string;
}
export interface OrganizationFindOptions extends FindOptions<OrganizationFilterOptions> {
    order: OrderOptions;
}
export declare class OrganizationRepository extends BaseRepository<IOrganization> {
    constructor();
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, IOrganization> & IOrganization & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    findByIdWithUser(id: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, IOrganization> & IOrganization & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    findForAdmin(options: OrganizationFindOptions): Promise<PaginatedList<IOrganization>>;
}
export declare const organizationRepository: OrganizationRepository;
