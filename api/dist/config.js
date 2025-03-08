"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_vars = void 0;
const dotenv = require("dotenv");
const path = require("path");
const zod_1 = require("zod");
const enum_1 = require("./utils/enum");
dotenv.config({ path: path.join(__dirname, '../.env') });
const numericIdRegex = /^\d+$/u;
const envVarsSchema = (0, zod_1.object)({
    API_URL: (0, zod_1.string)({ message: 'API_URL is required' }),
    APP_NAME: (0, zod_1.string)({ message: 'APP NAME is required' }),
    EMAIL_FROM: (0, zod_1.string)({ message: 'EMAIL FROM is required' }),
    EMAIL_API_KEY: (0, zod_1.string)({ message: 'EMAIL API KEY is required' }),
    NODE_ENV: (0, zod_1.nativeEnum)(enum_1.Env).default(enum_1.Env.development),
    LOG_DIR: (0, zod_1.string)(),
    PORT: (0, zod_1.string)().regex(numericIdRegex).default('3000'),
    MONGODB_URL: (0, zod_1.string)({ message: 'Mongo DB url is required' }),
    JWT_SECRET: (0, zod_1.string)({ message: 'JWT secret key is required' }),
    JWT_ACCESS_EXPIRATION: (0, zod_1.string)().describe('minutes after which access tokens expire'),
    SMTP_HOST: (0, zod_1.string)({ message: 'SMTP_HOST is required' }),
    SMTP_PORT: (0, zod_1.string)().regex(numericIdRegex, {
        message: 'SMTP_PORT must be a number',
    }),
    SMTP_USER: (0, zod_1.string)({ message: 'SMTP_USER is required' }),
    SMTP_PASS: (0, zod_1.string)({ message: 'SMTP_PASS is required' }),
    SMTP_SECURE: (0, zod_1.string)()
        .transform((data) => data === 'true')
        .default('false'),
}).passthrough();
const envVars = envVarsSchema.parse(process.env);
exports.env_vars = {
    apiUrl: envVars.API_URL,
    app_name: envVars.APP_NAME,
    email_key: envVars.EMAIL_API_KEY,
    sender: envVars.EMAIL_FROM,
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    log_dir: envVars.LOG_DIR,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpiration: envVars.JWT_ACCESS_EXPIRATION,
    },
    smtp: {
        host: envVars.SMTP_HOST,
        port: Number(envVars.SMTP_PORT),
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASS,
        secure: envVars.SMTP_SECURE,
    },
};
//# sourceMappingURL=config.js.map