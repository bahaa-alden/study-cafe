"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const lodash_1 = require("lodash");
const bcrypt = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    // <creating-property-schema />
    status: {
        type: String,
        enum: Object.values(enum_1.UserStatus),
        default: enum_1.UserStatus.active,
    },
    name: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(enum_1.RoleCode),
        default: enum_1.RoleCode.USER,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'User',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['__v', '_id', 'password', 'deletedAt']),
    },
});
userSchema.index({ email: 1 });
userSchema.pre('save', async function save(next) {
    // If the password is not modified, skip hashing
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = new Date();
    next();
});
// check password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        callback(err, isMatch);
    });
};
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map