"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");
const config_1 = require("../config");
let dir = config_1.env_vars.log_dir;
if (!dir)
    dir = path.resolve('logs');
// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir);
}
const logLevel = config_1.env_vars.env === 'development' ? 'debug' : 'warn';
const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    // @ts-ignore
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.json()),
});
exports.default = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            level: logLevel,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.prettyPrint()),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false, // do not exit on handled exceptions
});
//# sourceMappingURL=Logger.js.map