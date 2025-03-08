"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformObject = transformObject;
const lodash_1 = require("lodash");
function transformObject(obj, lang, fields) {
    if (!obj || typeof obj !== 'object')
        return obj;
    // If obj is a Mongoose document, extract `_doc`
    const source = obj._doc ? obj._doc : obj;
    let transformed = { ...source };
    // Replace _id with id
    if (transformed._id) {
        transformed.id = transformed._id.toString();
        transformed = (0, lodash_1.omit)(transformed, ['deletedAt', '__v', '_id']);
    }
    fields.forEach((field) => {
        if (transformed[field] && typeof transformed[field] === 'object') {
            if (!transformed[field].ar && !transformed[field].en) {
                transformed[field] = transformObject(transformed[field], lang, fields);
            }
            else {
                // Assign the requested language value
                transformed[field] =
                    transformed[field][lang] || transformed[field]['en'] || null;
            }
        }
    });
    return transformed;
}
//# sourceMappingURL=transform.js.map