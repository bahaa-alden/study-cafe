import { TypeOf, z } from 'zod';
declare const credentialSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type ICredentialSchema = TypeOf<typeof credentialSchema>;
declare const authSchema: z.ZodObject<{
    authorization: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    authorization: string;
}, {
    authorization: string;
}>;
export type IAuthSchema = TypeOf<typeof authSchema>;
declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type ISignupSchema = TypeOf<typeof signupSchema>;
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type IForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>;
declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    token: z.ZodString;
}, "strict", z.ZodTypeAny, {
    password: string;
    token: string;
}, {
    password: string;
    token: string;
}>;
export type IResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;
declare const updateMyPasswordSchema: z.ZodObject<{
    passwordCurrent: z.ZodString;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    password: string;
    passwordCurrent: string;
}, {
    password: string;
    passwordCurrent: string;
}>;
export type IUpdateMyPasswordSchema = TypeOf<typeof updateMyPasswordSchema>;
declare const _default: {
    credential: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
    auth: z.ZodObject<{
        authorization: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        authorization: string;
    }, {
        authorization: string;
    }>;
    signup: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
    }, {
        name: string;
        email: string;
        password: string;
    }>;
    forgotPassword: z.ZodObject<{
        email: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
    resetPassword: z.ZodObject<{
        password: z.ZodString;
        token: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        password: string;
        token: string;
    }, {
        password: string;
        token: string;
    }>;
    updateMyPassword: z.ZodObject<{
        passwordCurrent: z.ZodString;
        password: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        password: string;
        passwordCurrent: string;
    }, {
        password: string;
        passwordCurrent: string;
    }>;
};
export default _default;
