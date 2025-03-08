"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const user_repository_1 = require("../database//repositories/user.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
class UserController {
    // return authenticated user details
    me(req, res, next) {
        res.ok({ message: 'success', data: req.user });
    }
    updateMe = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        if (updateBody.email) {
            (0, record_1.existRecord)(await user_repository_1.userRepository.exists(updateBody.email), new ApiError_1.ConflictError('User already exist'));
        }
        if (updateBody.name) {
            (0, record_1.existRecord)(await user_repository_1.userRepository.existsName(updateBody.name), new ApiError_1.ConflictError('User already exist'));
        }
        const data = await user_repository_1.userRepository.patchById(req.user.id, updateBody);
        res.ok({ message: 'User has been updated', data });
    });
    deleteMe = (0, asyncHandler_1.default)(async (req, res, next) => {
        await user_repository_1.userRepository.deleteById(req.user.id);
        res.noContent({ message: 'User has been updated' });
    });
    get = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                dateFrom: req.valid.query.dateFrom,
                dateTo: req.valid.query.dateTo,
                role: req.user.role,
            },
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
            search: req.valid.query.search,
        };
        const users = await user_repository_1.userRepository.findForUser(options);
        res.ok({ message: 'success', data: users });
    });
    getOne = (0, asyncHandler_1.default)(async (req, res, next) => {
        const user = (0, record_1.needRecord)(await user_repository_1.userRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('user not found'));
        res.ok({ message: 'Get User Successfully', data: user });
    });
    updateOne = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const data = (0, record_1.needRecord)(await user_repository_1.userRepository.patchById(req.user.id, updateBody), new ApiError_1.NotFoundError('user not found'));
        res.ok({ message: 'User has been updated', data });
    });
    deleteOne = (0, asyncHandler_1.default)(async (req, res, next) => {
        const user = (0, record_1.needRecord)(await user_repository_1.userRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('user not found'));
        await user_repository_1.userRepository.deleteById(user.id);
        res.noContent({ message: 'User has been updated' });
    });
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map