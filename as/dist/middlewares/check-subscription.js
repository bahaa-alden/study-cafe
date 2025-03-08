"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubscriptionMiddleware = void 0;
const ApiError_1 = require("../core/ApiError");
const Logger_1 = require("../core/Logger");
const subscription_repository_1 = require("../database/repositories/subscription.repository");
const enum_1 = require("../utils/enum");
const record_1 = require("../utils/record");
const organization_repository_1 = require("../database/repositories/organization.repository");
const asyncHandler_1 = require("./asyncHandler");
exports.checkSubscriptionMiddleware = (0, asyncHandler_1.default)(async (req, res, next) => {
    const org = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findOneBy({
        _id: req.valid.headers['organization-id'],
        status: enum_1.OrgStatus.approved,
        userId: req.user.id,
    }), new ApiError_1.NotFoundError('No active subscription found'));
    const subscription = (0, record_1.needRecord)(await subscription_repository_1.subscriptionRepository.findById(org.recentSubscriptionId), new ApiError_1.NotFoundError('No active subscription found'));
    if (subscription.expiresDate.getTime() < Date.now()) {
        if (subscription.status !== enum_1.SubscriptionStatus.expired) {
            await subscription_repository_1.subscriptionRepository.patchById(subscription.id, {
                status: enum_1.SubscriptionStatus.expired,
            });
        }
        Logger_1.default.info(`Organization ${subscription.organizationId} subscription has expired`);
        throw new ApiError_1.BadRequestError('Your subscription has expired. Please renew or create a new one.');
    }
    next();
});
//# sourceMappingURL=check-subscription.js.map