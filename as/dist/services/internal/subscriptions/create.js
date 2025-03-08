"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionService = createSubscriptionService;
const ApiError_1 = require("../../../core/ApiError");
const organization_repository_1 = require("../../../database/repositories/organization.repository");
const payment_repository_1 = require("../../../database/repositories/payment.repository");
const plan_repository_1 = require("../../../database/repositories/plan.repository");
const subscription_repository_1 = require("../../../database/repositories/subscription.repository");
const enum_1 = require("../../../utils/enum");
const record_1 = require("../../../utils/record");
const get_expires_at_1 = require("./get-expires-at");
async function createSubscriptionService(data) {
    const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findById(data.organizationId), new ApiError_1.NotFoundError('Organization not found'));
    const plan = (0, record_1.needRecord)(await plan_repository_1.planRepository.findById(data.planId), new ApiError_1.NotFoundError('Plan not found'));
    data.expiresDate = data.expiresDate ?? (0, get_expires_at_1.getExpiresAt)(plan.duration);
    data.status = data.status ?? enum_1.SubscriptionStatus.active;
    const subscription = await subscription_repository_1.subscriptionRepository.insert(data);
    if (subscription === null) {
        throw new ApiError_1.InternalError();
    }
    organization.recentSubscriptionId = subscription.id;
    await organization_repository_1.organizationRepository.patchById(organization.id, organization);
    await payment_repository_1.paymentRepository.insert({
        status: enum_1.PaymentStatus.success,
        amount: data.price ?? plan.price,
        subscriptionId: subscription.id,
        organizationId: organization.id,
    });
    return subscription;
}
//# sourceMappingURL=create.js.map