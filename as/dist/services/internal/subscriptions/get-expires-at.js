"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiresAt = void 0;
const enum_1 = require("../../../utils/enum");
const getExpiresAt = (duration, date = new Date()) => {
    const msInDay = 24 * 60 * 60 * 1000;
    // const freeDaysInMs = freeDays * msInDay
    switch (duration) {
        case enum_1.PlanDuration.month:
            return new Date(date.getTime() + 30 * msInDay);
        case enum_1.PlanDuration.year:
            return new Date(date.getTime() + 365 * msInDay);
        default:
            return new Date(date.getTime() + 7 * msInDay);
    }
};
exports.getExpiresAt = getExpiresAt;
//# sourceMappingURL=get-expires-at.js.map