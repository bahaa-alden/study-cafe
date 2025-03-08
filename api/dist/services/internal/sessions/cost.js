"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCost = void 0;
const enum_1 = require("../../../utils/enum");
const calculateCost = async (session, organizationHourlyRate) => {
    session.status = enum_1.SessionStatus.ended;
    session.endTime = new Date();
    session.additionalCost = session.desserts.reduce((sum, element) => sum + element.dessert.price * element.count, 0);
    if (session.totalCost === null) {
        const durationInHours = (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 3600);
        session.subtotal =
            Math.max(organizationHourlyRate, Math.ceil(durationInHours * organizationHourlyRate)) * session.numberOfPersons;
        // Total cost including additional cost
        session.totalCost = session.subtotal + session.additionalCost;
    }
    else {
        session.totalCost = session.additionalCost;
    }
    await session.save({ validateBeforeSave: false });
    return session;
};
exports.calculateCost = calculateCost;
//# sourceMappingURL=cost.js.map