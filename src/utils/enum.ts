export enum UserStatus {
  active = 'active',
  disactive = 'disactive',
}

export enum CarCategory {
  truck = 'truck',
}

export enum RoleCode {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export enum Env {
  production = 'production',
  development = 'development',
  test = 'test',
}

// <creating-enum-type />

export enum DessertType {
  drink = 'drink',
  meal = 'meal',
}

export enum PaymentStatus {
  failed = 'failed',
  pending = 'pending',
  success = 'success',
}

export enum SubscriptionStatus {
  pending = 'pending',
  active = 'active',
  expired = 'expired',
  cancelled = 'cancelled',
}

export enum PlanDuration {
  month = 'month',
  year = 'year',
  free = 'free',
}

export enum SessionStatus {
  started = 'started',
  ended = 'ended',
  cancelled = 'cancelled',
}

export enum OrgStatus {
  approved = 'approved',
  refused = 'refused',
  pending = 'pending',
}
