"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dessertController = exports.DessertController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const dessert_repository_1 = require("../database/repositories/dessert.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
class DessertController {
    // Get all Desserts by author
    getDesserts = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                // filters
                type: req.valid.query.type,
                organizationId: req.valid.headers['organization-id'],
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const desserts = await dessert_repository_1.dessertRepository.findForAdmin(options);
        res.ok({ message: 'success', data: desserts });
    });
    // Get dessert by Id for authenticated user
    getDessert = (0, asyncHandler_1.default)(async (req, res) => {
        const dessert = (0, record_1.needRecord)(await dessert_repository_1.dessertRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Dessert not found'));
        res.ok({ message: 'success', data: dessert });
    });
    // Create dessert handler
    createDessert = (0, asyncHandler_1.default)(async (req, res, next) => {
        const newDessert = req.valid.body;
        (0, record_1.existRecord)(await dessert_repository_1.dessertRepository.findOneBy({
            'name.en': newDessert.name.en,
            'name.ar': newDessert.name.ar,
            type: newDessert.type,
            organizationId: req.valid.headers['organization-id'],
        }), new ApiError_1.ConflictError(`Dessert with name "${newDessert.name}" already exists`));
        const dessert = await dessert_repository_1.dessertRepository.insert({
            ...newDessert,
            organizationId: req.valid.headers['organization-id'],
        });
        if (dessert === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({ message: 'Dessert has been created', data: dessert });
    });
    // Update dessert by Id for authenticated user
    updateDessert = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const dessert = (0, record_1.needRecord)(await dessert_repository_1.dessertRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Dessert not found'));
        const data = await dessert_repository_1.dessertRepository.patchById(dessert.id, updateBody);
        res.ok({ message: 'Dessert has been updated', data });
    });
    // Delete dessert by Id for authenticated user
    deleteDessert = (0, asyncHandler_1.default)(async (req, res) => {
        const dessert = (0, record_1.needRecord)(await dessert_repository_1.dessertRepository.findByIdWithOrg(req.valid.params.id, req.valid.headers['organization-id']), new ApiError_1.NotFoundError('Dessert not found'));
        await dessert_repository_1.dessertRepository.deleteById(dessert.id);
        res.noContent({ message: 'Dessert deleted successfully' });
    });
}
exports.DessertController = DessertController;
exports.dessertController = new DessertController();
//# sourceMappingURL=dessert.controller.js.map