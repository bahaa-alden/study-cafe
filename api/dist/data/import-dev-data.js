"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const user_repository_1 = require("../database/repositories/user.repository");
const enum_1 = require("../utils/enum");
dotenv.config({ path: __dirname + '/../../.env' });
const DB = process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27017/study-cafe';
mongoose.connect(DB).then(() => console.log('DB connection successes'));
const importData = async () => {
    try {
        await user_repository_1.userRepository.insert({
            name: 'admin',
            password: process.env.ADMIN_PASSWORD,
            email: process.env.ADMIN_EMAIL,
            role: enum_1.RoleCode.ADMIN,
        });
        console.log('imported');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
};
const deleteData = async () => {
    try {
        await user_repository_1.userRepository.model.findOneAndDelete({
            email: process.env.ADMIN_EMAIL,
        });
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
};
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
//# sourceMappingURL=import-dev-data.js.map