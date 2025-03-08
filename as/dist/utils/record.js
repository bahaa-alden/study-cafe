"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existRecord = exports.needRecord = void 0;
const ApiError_1 = require("../core/ApiError");
const needRecord = (record, err = new ApiError_1.NotFoundError()) => {
    if (!record) {
        throw err;
    }
    return record;
};
exports.needRecord = needRecord;
const existRecord = (record, err = new ApiError_1.ConflictError('Already exists')) => {
    if (record) {
        throw err;
    }
};
exports.existRecord = existRecord;
//# sourceMappingURL=record.js.map