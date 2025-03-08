"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planController = exports.PlanController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const plan_repository_1 = require("../database/repositories/plan.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
class PlanController {
    // Get all Plans by author
    getPlans = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                // filters
                dateFrom: req.valid.query.dateFrom,
                dateTo: req.valid.query.dateTo,
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const plans = await plan_repository_1.planRepository.findForAdmin(options);
        res.ok({ message: 'success', data: plans });
    });
    // Get plan by Id for authenticated user
    getPlan = (0, asyncHandler_1.default)(async (req, res) => {
        const plan = (0, record_1.needRecord)(await plan_repository_1.planRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Plan not found'));
        res.ok({ message: 'success', data: plan });
    });
    // Create plan handler
    createPlan = (0, asyncHandler_1.default)(async (req, res, next) => {
        const newPlan = req.valid.body;
        const plan = await plan_repository_1.planRepository.insert(newPlan);
        if (plan === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({ message: 'Plan has been created', data: plan });
    });
    // Update plan by Id for authenticated user
    updatePlan = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const plan = (0, record_1.needRecord)(await plan_repository_1.planRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Plan not found'));
        const data = await plan_repository_1.planRepository.patchById(plan.id, updateBody);
        res.ok({ message: 'Plan has been updated', data });
    });
    // Delete plan by Id for authenticated user
    deletePlan = (0, asyncHandler_1.default)(async (req, res) => {
        const plan = (0, record_1.needRecord)(await plan_repository_1.planRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Plan not found'));
        await plan_repository_1.planRepository.deleteById(plan.id);
        res.noContent({ message: 'Plan deleted successfully' });
    });
}
exports.PlanController = PlanController;
exports.planController = new PlanController();
//# sourceMappingURL=plan.controller.js.map