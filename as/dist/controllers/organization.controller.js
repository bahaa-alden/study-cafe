"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationController = exports.OrganizationController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const organization_repository_1 = require("../database/repositories/organization.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
const enum_1 = require("../utils/enum");
const session_repository_1 = require("../database/repositories/session.repository");
class OrganizationController {
    // Get all Organizations by author
    getOrganizations = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                dateFrom: req.valid.query.dateFrom,
                dateTo: req.valid.query.dateTo,
                status: req.valid.query.status,
                userId: req.user.role === enum_1.RoleCode.USER ? req.user.id : undefined,
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const organizations = await organization_repository_1.organizationRepository.findForAdmin(options);
        res.ok({ message: 'success', data: organizations });
    });
    // Get organization by Id for authenticated user
    getOrganization = (0, asyncHandler_1.default)(async (req, res) => {
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Organization not found'));
        res.ok({ message: 'success', data: organization });
    });
    // Create organization handler
    createOrganization = (0, asyncHandler_1.default)(async (req, res, next) => {
        const newOrganization = req.valid.body;
        if (!newOrganization.userId) {
            newOrganization.userId = req.user.id;
        }
        const organization = await organization_repository_1.organizationRepository.insert(newOrganization);
        if (organization === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({
            message: 'Organization has been created',
            data: organization,
        });
    });
    // Update organization by Id for authenticated user
    updateOrganization = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findByIdWithUser(req.valid.params.id, req.user.id), new ApiError_1.NotFoundError('Organization not found'));
        const data = await organization_repository_1.organizationRepository.patchById(organization.id, updateBody);
        res.ok({ message: 'Organization has been updated', data });
    });
    // Delete organization by Id for authenticated user
    deleteOrganization = (0, asyncHandler_1.default)(async (req, res) => {
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Organization not found'));
        await organization_repository_1.organizationRepository.deleteById(organization.id);
        res.noContent({ message: 'Organization deleted successfully' });
    });
    approve = (0, asyncHandler_1.default)(async (req, res, next) => {
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Organization not found'));
        await organization_repository_1.organizationRepository.patchById(organization.id, {
            status: enum_1.OrgStatus.approved,
        });
        res.ok({ message: 'Organization has been approved' });
    });
    refuse = (0, asyncHandler_1.default)(async (req, res, next) => {
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Organization not found'));
        await organization_repository_1.organizationRepository.patchById(organization.id, {
            status: enum_1.OrgStatus.refused,
        });
        res.ok({ message: 'Organization has been refused' });
    });
    statistics = (0, asyncHandler_1.default)(async (req, res) => {
        const data = await session_repository_1.sessionRepository.getOrganizationStatistics(req.valid.headers['organization-id'], req.valid.query.fromDate, req.valid.query.toDate);
        res.ok({ message: 'ok', data });
    });
}
exports.OrganizationController = OrganizationController;
exports.organizationController = new OrganizationController();
//# sourceMappingURL=organization.controller.js.map