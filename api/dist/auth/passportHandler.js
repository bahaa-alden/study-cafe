"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const ApiError_1 = require("../core/ApiError");
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const config_1 = require("../config");
const user_repository_1 = require("../database//repositories/user.repository");
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
// local passport strategy for login
passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    const user = await user_repository_1.userRepository.findByEmail(email);
    if (!user)
        done(new ApiError_1.AuthFailureError('Invalid email or password.'));
    else {
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(new ApiError_1.AuthFailureError(err.message));
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(new ApiError_1.AuthFailureError('Invalid email or password.'));
        });
    }
}));
// jwt passport strategy for protect routes
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.env_vars.jwt.secret,
}, async (jwtToken, done) => {
    const user = await user_repository_1.userRepository.findByEmail(jwtToken.email.toLowerCase());
    if (!user)
        return done(new ApiError_1.AuthFailureError());
    return done(undefined, user);
}));
//# sourceMappingURL=passportHandler.js.map