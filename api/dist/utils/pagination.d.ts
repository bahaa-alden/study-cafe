export interface PaginatedList<T> {
    total: number;
    results: T[];
}
export interface PaginatedAggregateList<T> {
    total: [{
        totalCount: number;
    }];
    results: T[];
}
export interface PaginationOptions {
    page: number;
    pageSize: number;
}
export declare const defaultPaginationParams: (page: number, pageSize: number) => PaginationOptions;
