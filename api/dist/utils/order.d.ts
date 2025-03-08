export interface OrderOptions {
    column: string;
    direction: OrderDirection;
}
export declare enum OrderDirection {
    asc = "asc",
    desc = "desc"
}
export declare const defaultOrderParams: (column: string, direction: string) => OrderOptions;
