"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_order_routes_1 = require("./routes/subscription-order.routes");
const dessert_routes_1 = require("./routes/dessert.routes");
const payment_routes_1 = require("./routes/payment.routes");
const plan_routes_1 = require("./routes/plan.routes");
const subscription_routes_1 = require("./routes/subscription.routes");
const session_routes_1 = require("./routes/session.routes");
const organization_routes_1 = require("./routes/organization.routes");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
//R <dont remove this line>
const user_routes_1 = require("./routes/user.routes");
const config_1 = require("./config");
const helmet_1 = require("helmet");
const passport = require("passport");
const errHandler_1 = require("./middlewares/errHandler");
const custom_middleware_1 = require("./middlewares/custom.middleware");
const Logger_1 = require("./core/Logger");
const swagger_1 = require("./swagger/swagger");
const ApiError_1 = require("./core/ApiError");
const path_1 = require("path");
class Server {
    app;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.mongo();
    }
    routes() {
        this.app.use('/api/v1/subscription-orders', subscription_order_routes_1.subscriptionOrderRoutes.router);
        this.app.use('/api/v1/desserts', dessert_routes_1.dessertRoutes.router);
        this.app.use('/api/v1/payments', payment_routes_1.paymentRoutes.router);
        this.app.use('/api/v1/plans', plan_routes_1.planRoutes.router);
        this.app.use('/api/v1/subscriptions', subscription_routes_1.subscriptionRoutes.router);
        this.app.use('/api/v1/sessions', session_routes_1.sessionRoutes.router);
        this.app.use('/api/v1/organizations', organization_routes_1.organizationRoutes.router);
        this.app.use('/api/v1/users', user_routes_1.userRoutes.router);
        this.app.use(express.static((0, path_1.join)(__dirname, '..', 'public')));
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger_1.default, {
            swaggerOptions: { persistAuthorization: true },
        }));
        // Docs in JSON format
        this.app.get('/docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swagger_1.default);
        });
        //ROUTES <dont remove this line>
        this.app.all('*', (req, res, next) => {
            next(new ApiError_1.NotFoundError(`Can't find ${req.originalUrl} on this server!`));
        });
        this.app.use(errHandler_1.default);
    }
    config() {
        this.app.use(custom_middleware_1.default);
        this.app.set('port', config_1.env_vars.port || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use((0, helmet_1.default)());
        this.app.use(passport.initialize());
    }
    mongo() {
        const connection = mongoose.connection;
        connection.on('connected', () => {
            Logger_1.default.info('Mongo Connection Established');
        });
        connection.on('reconnected', () => {
            Logger_1.default.info('Mongo Connection Reestablished');
        });
        connection.on('disconnected', () => {
            Logger_1.default.info('Mongo Connection Disconnected');
            Logger_1.default.info('Trying to reconnect to Mongo ...');
            setTimeout(() => {
                mongoose.connect(config_1.env_vars.mongoose.url);
            }, 3000);
        });
        connection.on('close', () => {
            Logger_1.default.info('Mongo Connection Closed');
        });
        connection.on('error', (error) => {
            Logger_1.default.info('Mongo Connection ERROR: ' + error);
        });
        const run = async () => {
            await mongoose.connect(config_1.env_vars.mongoose.url);
        };
        run().catch((error) => Logger_1.default.error(error));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            Logger_1.default.info(`API is running at http://localhost:${this.app.get('port')}`);
            Logger_1.default.info(`swagger is running at http://localhost:${this.app.get('port')}/docs`);
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map