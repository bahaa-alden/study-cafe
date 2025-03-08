"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgStatus = exports.SessionStatus = exports.PlanDuration = exports.SubscriptionStatus = exports.PaymentStatus = exports.DessertType = exports.SubscriptionOrderStatus = exports.Env = exports.RoleCode = exports.CarCategory = exports.UserStatus = exports.getValuesOf = exports.getKeysOf = void 0;
const getKeysOf = (obj) => Object.keys(obj).filter((key) => Number.isNaN(Number(key)));
exports.getKeysOf = getKeysOf;
const getValuesOf = (obj) => (0, exports.getKeysOf)(obj).map((key) => obj[key]);
exports.getValuesOf = getValuesOf;
var UserStatus;
(function (UserStatus) {
    UserStatus["active"] = "active";
    UserStatus["disactive"] = "disactive";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var CarCategory;
(function (CarCategory) {
    CarCategory["truck"] = "truck";
})(CarCategory || (exports.CarCategory = CarCategory = {}));
var RoleCode;
(function (RoleCode) {
    RoleCode["USER"] = "USER";
    RoleCode["ADMIN"] = "ADMIN";
})(RoleCode || (exports.RoleCode = RoleCode = {}));
var Env;
(function (Env) {
    Env["production"] = "production";
    Env["development"] = "development";
    Env["test"] = "test";
})(Env || (exports.Env = Env = {}));
// <creating-enum-type />
var SubscriptionOrderStatus;
(function (SubscriptionOrderStatus) {
    SubscriptionOrderStatus["approved"] = "approved";
    SubscriptionOrderStatus["refused"] = "refused";
    SubscriptionOrderStatus["pending"] = "pending";
})(SubscriptionOrderStatus || (exports.SubscriptionOrderStatus = SubscriptionOrderStatus = {}));
var DessertType;
(function (DessertType) {
    DessertType["drink"] = "drink";
    DessertType["meal"] = "meal";
})(DessertType || (exports.DessertType = DessertType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["failed"] = "failed";
    PaymentStatus["pending"] = "pending";
    PaymentStatus["success"] = "success";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["pending"] = "pending";
    SubscriptionStatus["active"] = "active";
    SubscriptionStatus["expired"] = "expired";
    SubscriptionStatus["cancelled"] = "cancelled";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var PlanDuration;
(function (PlanDuration) {
    PlanDuration["month"] = "month";
    PlanDuration["year"] = "year";
    PlanDuration["free"] = "free";
})(PlanDuration || (exports.PlanDuration = PlanDuration = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["all"] = "";
    SessionStatus["started"] = "started";
    SessionStatus["ended"] = "ended";
    SessionStatus["cancelled"] = "cancelled";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
var OrgStatus;
(function (OrgStatus) {
    OrgStatus["approved"] = "approved";
    OrgStatus["refused"] = "refused";
    OrgStatus["pending"] = "pending";
})(OrgStatus || (exports.OrgStatus = OrgStatus = {}));
//# sourceMappingURL=enum.js.map