"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const passport = require("passport");
require("../auth/passportHandler");
const config_1 = require("../config");
const crypto_1 = require("crypto");
const jwt = require("jsonwebtoken");
const user_repository_1 = require("../database/repositories/user.repository");
const ApiError_1 = require("../core/ApiError");
const record_1 = require("../utils/record");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const email_node_1 = require("../config/email-node");
// import { InternalErrorResponse } from '../core/ApiResponse';
class AuthController {
    // SignUp user handler
    registerUser = (0, asyncHandler_1.default)(async (req, res, next) => {
        const { email, password, name } = req.valid.body;
        (0, record_1.existRecord)(await user_repository_1.userRepository.exists(email), new ApiError_1.ConflictError('User already exist'));
        const user = await user_repository_1.userRepository.insert({
            name,
            email,
            password,
        });
        const token = jwt.sign({ email: req.body.email }, config_1.env_vars.jwt.secret, {
            expiresIn: config_1.env_vars.jwt.accessExpiration,
        });
        res.created({
            message: 'user created',
            data: {
                token,
                user,
            },
        });
    });
    // passport local strategy handler
    authenticateUser(req, res, next) {
        passport.authenticate('local', { session: false }, function (err, user, info) {
            if (err)
                return next(err);
            if (user) {
                const token = jwt.sign({ email: req.valid.body.email }, config_1.env_vars.jwt.secret, {
                    expiresIn: config_1.env_vars.jwt.accessExpiration,
                });
                res.ok({ message: 'loggenin', data: { token, user } });
            }
        })(req, res, next);
    }
    // return authenticated user details
    me(req, res, next) {
        res.ok({ message: 'success', data: req.user });
    }
    forgotPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
        // 1) Get user based on POSTed email
        const user = (0, record_1.needRecord)(await user_repository_1.userRepository.findByEmail(req.valid.body.email), new ApiError_1.NotFoundError('user not found'));
        // 2) Generate the random reset token
        const resetToken = (0, crypto_1.randomBytes)(3).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save({ validateBeforeSave: false });
        // 3) Send it to user's email
        try {
            await new email_node_1.default(user, '').sendPasswordReset(resetToken);
            res.ok({
                message: 'Token sent to email!',
                data: {
                    message: 'Token sent to email!',
                },
            });
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            console.log(err);
            return next(new ApiError_1.InternalError());
        }
    });
    resetPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
        // 1) Get user based on POSTed email
        const user = (0, record_1.needRecord)(await user_repository_1.userRepository.findOneBy({
            passwordResetToken: req.valid.body.token,
        }), new ApiError_1.NotFoundError('user not found'));
        if (user.passwordResetExpires && user.passwordResetExpires < new Date())
            throw new ApiError_1.TokenExpiredError();
        user.password = req.valid.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        const token = jwt.sign({ email: user.email }, config_1.env_vars.jwt.secret, {
            expiresIn: config_1.env_vars.jwt.accessExpiration,
        });
        res.ok({ message: 'reset password is succeed', data: { token, user } });
    });
    updateMyPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
        const user = (0, record_1.needRecord)(await user_repository_1.userRepository.findByEmail(req.user.email), new ApiError_1.NotFoundError('user not found'));
        const isMatch = await new Promise((resolve, reject) => {
            user.comparePassword(req.valid.body.passwordCurrent, (err, isMatch) => {
                if (err)
                    return reject(err);
                resolve(isMatch);
            });
        });
        if (!isMatch) {
            return next(new ApiError_1.AuthFailureError('Invalid password.'));
        }
        user.password = req.valid.body.password;
        await user.save();
        const token = jwt.sign({ email: user.email }, config_1.env_vars.jwt.secret, {
            expiresIn: config_1.env_vars.jwt.accessExpiration,
        });
        res.ok({ message: 'update password is succesed', data: { token, user } });
    });
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map