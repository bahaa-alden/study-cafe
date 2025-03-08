import { DessertType } from './../../utils/enum';
import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type IDessert } from '../models/dessert.model';
export interface DessertFilterOptions {
    type?: DessertType;
    organizationId?: string;
}
export interface DessertFindOptions extends FindOptions<DessertFilterOptions> {
    order: OrderOptions;
}
export declare class DessertRepository extends BaseRepository<IDessert> {
    constructor();
    findByIdWithOrg(id: string, organizationId: string): Promise<IDessert | null>;
    findForAdmin(options: DessertFindOptions): Promise<PaginatedList<IDessert>>;
}
export declare const dessertRepository: DessertRepository;
