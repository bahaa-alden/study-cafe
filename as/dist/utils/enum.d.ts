export declare const getKeysOf: <K extends string, V>(obj: { [key in K]: V; }) => K[];
export declare const getValuesOf: <K extends string, V>(obj: { [key in K]: V; }) => V[];
export declare enum UserStatus {
    active = "active",
    disactive = "disactive"
}
export declare enum CarCategory {
    truck = "truck"
}
export declare enum RoleCode {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare enum Env {
    production = "production",
    development = "development",
    test = "test"
}
export declare enum SubscriptionOrderStatus {
    approved = "approved",
    refused = "refused",
    pending = "pending"
}
export declare enum DessertType {
    drink = "drink",
    meal = "meal"
}
export declare enum PaymentStatus {
    failed = "failed",
    pending = "pending",
    success = "success"
}
export declare enum SubscriptionStatus {
    pending = "pending",
    active = "active",
    expired = "expired",
    cancelled = "cancelled"
}
export declare enum PlanDuration {
    month = "month",
    year = "year",
    free = "free"
}
export declare enum SessionStatus {
    all = "",
    started = "started",
    ended = "ended",
    cancelled = "cancelled"
}
export declare enum OrgStatus {
    approved = "approved",
    refused = "refused",
    pending = "pending"
}
