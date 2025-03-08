"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStringSchema = void 0;
exports.createLocalStringSchema = createLocalStringSchema;
const mongoose_1 = require("mongoose");
const enum_1 = require("./enum");
exports.localStringSchema = new mongoose_1.Schema({
    en: {
        type: String,
    },
    ar: {
        type: String,
    },
}, { _id: false });
function createLocalStringSchema(enumType) {
    const schemaDefinition = {
        en: {
            type: String,
            enum: (0, enum_1.getValuesOf)(enumType),
        },
        ar: {
            type: String,
            enum: (0, enum_1.getValuesOf)(enumType),
        },
    };
    return new mongoose_1.Schema(schemaDefinition, { _id: false });
}
//# sourceMappingURL=types.js.map