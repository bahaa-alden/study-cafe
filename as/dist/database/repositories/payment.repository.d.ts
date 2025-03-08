import { type PaginatedList } from '../../utils/pagination';
import { type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import { type IPayment } from '../models/payment.model';
export interface PaymentFilterOptions {
    dateFrom?: Date;
    dateTo?: Date;
    organizationId?: string;
}
export interface PaymentFindOptions extends FindOptions<PaymentFilterOptions> {
    order: OrderOptions;
}
export declare class PaymentRepository extends BaseRepository<IPayment> {
    constructor();
    findById(id: string): Promise<IPayment | null>;
    findForAdmin(options: PaymentFindOptions): Promise<PaginatedList<IPayment>>;
}
export declare const paymentRepository: PaymentRepository;
