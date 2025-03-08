import { Model, Document as MongooseDocument, FilterQuery, UpdateQuery } from 'mongoose';
import { PaginationOptions } from '../../utils/pagination';
import { OrderOptions } from '../../utils/order';
export interface FindOptions<T> {
    order: OrderOptions;
    pagination: PaginationOptions;
    filter?: T;
    search?: string;
}
export declare class BaseRepository<T extends MongooseDocument> {
    model: Model<T>;
    constructor(model: Model<T>);
    insert(data: object): Promise<T>;
    findAll(): Promise<T[]>;
    findOneBy(query: FilterQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findByIds(ids: string[]): Promise<T[]>;
    findBy(query: FilterQuery<T>): Promise<T[]>;
    patchById(id: string, data: UpdateQuery<T>): Promise<T | null>;
    updateMany(ids: string[], requestData: object): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteById(id: string): Promise<T | null>;
}
