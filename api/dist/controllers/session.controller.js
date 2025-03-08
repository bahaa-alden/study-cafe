"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = exports.SessionController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const session_repository_1 = require("../database/repositories/session.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
const organization_repository_1 = require("../database/repositories/organization.repository");
const user_repository_1 = require("../database/repositories/user.repository");
const enum_1 = require("../utils/enum");
const cost_1 = require("../services/internal/sessions/cost");
const dessert_repository_1 = require("../database/repositories/dessert.repository");
class SessionController {
    // Get all Sessions by author
    getSessions = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                status: req.valid.query.status,
                dateFrom: req.valid.query.dateFrom,
                dateTo: req.valid.query.dateTo,
                organizationId: req.valid.headers['organization-id'],
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const sessions = await session_repository_1.sessionRepository.findForAdmin(options);
        res.ok({ message: 'success', data: sessions });
    });
    // Get session by Id for authenticated user
    getSession = (0, asyncHandler_1.default)(async (req, res) => {
        const session = (0, record_1.needRecord)(await session_repository_1.sessionRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Session not found'));
        res.ok({ message: 'success', data: session });
    });
    // Create session handler
    createSession = (0, asyncHandler_1.default)(async (req, res, next) => {
        const { username, numberOfPersons } = req.valid.body;
        const organization = (0, record_1.needRecord)(await organization_repository_1.organizationRepository.findByIdWithUser(req.valid.headers['organization-id'], req.user.id));
        let user = await user_repository_1.userRepository.findOneBy({ name: username });
        // If the user doesn't exist, create a new user
        if (!user) {
            user = await user_repository_1.userRepository.insert({
                name: username,
            });
        }
        // Get the start of the day for 7 days ago
        const now = new Date();
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0); // Set to 00:00 AM
        // Check if the user has 7 sessions in the last 7 days
        const recentSessions = await session_repository_1.sessionRepository.model.countDocuments({
            userId: user.id,
            startTime: { $gte: sevenDaysAgo, $lte: now },
            status: enum_1.SessionStatus.ended,
            subtotal: { $exists: true },
        });
        // Determine if the session is free
        const isFreeSession = recentSessions >= 7;
        const session = await session_repository_1.sessionRepository.insert({
            userId: user.id,
            organizationId: organization.id,
            startTime: now,
            totalCost: isFreeSession ? 0 : null,
            numberOfPersons,
            username: user.name,
        });
        if (session === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({ message: 'Session has been created', data: session });
    });
    // Update session by Id for authenticated user
    updateSession = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const session = (0, record_1.needRecord)(await session_repository_1.sessionRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Session not found'));
        const data = await session_repository_1.sessionRepository.patchById(session.id, updateBody);
        res.ok({ message: 'Session has been updated', data });
    });
    // Delete session by Id for authenticated user
    deleteSession = (0, asyncHandler_1.default)(async (req, res) => {
        const session = (0, record_1.needRecord)(await session_repository_1.sessionRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Session not found'));
        await session_repository_1.sessionRepository.deleteById(session.id);
        res.noContent({ message: 'Session deleted successfully' });
    });
    endSession = (0, asyncHandler_1.default)(async (req, res) => {
        let session = (0, record_1.needRecord)(await session_repository_1.sessionRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError(`Session not found`));
        if (session.status !== enum_1.SessionStatus.started) {
            throw new ApiError_1.BadRequestError(`Session is already ${session.status}`);
        }
        // BadRequestErrorIf session is not free, calculate the cost
        session = await (0, cost_1.calculateCost)(session, session.organization.sessionHourlyRate);
        res.ok({ data: session, message: 'done' });
    });
    addDessert = (0, asyncHandler_1.default)(async (req, res) => {
        const dessertId = req.valid.body.dessertId;
        const session = (0, record_1.needRecord)(await session_repository_1.sessionRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError(`Session not found`));
        if (session.status === enum_1.SessionStatus.ended) {
            throw new ApiError_1.BadRequestError('Session already ended');
        }
        const dessert = (0, record_1.needRecord)(await dessert_repository_1.dessertRepository.findByIdWithOrg(dessertId, req.valid.headers['organization-id']), new ApiError_1.NotFoundError(`Dessert with id: ${dessertId} not found`));
        session.desserts.push({ dessert, ...req.valid.body });
        await session.save({ validateBeforeSave: false });
        res.ok({ data: session, message: 'done' });
    });
}
exports.SessionController = SessionController;
exports.sessionController = new SessionController();
//# sourceMappingURL=session.controller.js.map