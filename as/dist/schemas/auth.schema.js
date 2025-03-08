"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validator_1 = require("../middlewares/validator");
const credentialSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
})
    .strict();
const authSchema = zod_1.z.object({
    authorization: validator_1.zodAuthBearer,
});
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const forgotPasswordSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
})
    .strict();
const resetPasswordSchema = zod_1.z
    .object({
    password: zod_1.z.string(),
    token: zod_1.z.string().max(6).min(6),
})
    .strict();
const updateMyPasswordSchema = zod_1.z
    .object({
    passwordCurrent: zod_1.z.string(),
    password: zod_1.z.string(),
})
    .strict();
exports.default = {
    credential: credentialSchema,
    auth: authSchema,
    signup: signupSchema,
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
    updateMyPassword: updateMyPasswordSchema,
};
//# sourceMappingURL=auth.schema.js.map