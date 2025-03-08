"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsdoc = require("swagger-jsdoc");
const subscription_order_swagger_1 = require("./routes/subscription-order.swagger");
const dessert_swagger_1 = require("./routes/dessert.swagger");
const payment_swagger_1 = require("./routes/payment.swagger");
const plan_swagger_1 = require("./routes/plan.swagger");
const subscription_swagger_1 = require("./routes/subscription.swagger");
const session_swagger_1 = require("./routes/session.swagger");
const organization_swagger_1 = require("./routes/organization.swagger");
const auth_swagger_1 = require("./routes/auth.swagger");
const config_1 = require("../config");
const components_1 = require("./components");
const users_swagger_1 = require("./routes/users.swagger");
const options = {
    url: '',
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Docs',
            version: '1.0.0',
            description: 'This is an API store application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: `${config_1.env_vars.env === 'development'
                    ? `http://localhost:${config_1.env_vars.port}`
                    : config_1.env_vars.apiUrl}/api/v1`,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                SubscriptionOrder: subscription_order_swagger_1.SubscriptionOrder,
                createSubscriptionOrder: subscription_order_swagger_1.createSubscriptionOrder,
                updateSubscriptionOrder: subscription_order_swagger_1.updateSubscriptionOrder,
                Dessert: dessert_swagger_1.Dessert,
                createDessert: dessert_swagger_1.createDessert,
                updateDessert: dessert_swagger_1.updateDessert,
                Payment: payment_swagger_1.Payment,
                createPayment: payment_swagger_1.createPayment,
                updatePayment: payment_swagger_1.updatePayment,
                Plan: plan_swagger_1.Plan,
                createPlan: plan_swagger_1.createPlan,
                updatePlan: plan_swagger_1.updatePlan,
                Subscription: subscription_swagger_1.Subscription,
                createSubscription: subscription_swagger_1.createSubscription,
                updateSubscription: subscription_swagger_1.updateSubscription,
                Session: session_swagger_1.Session,
                createSession: session_swagger_1.createSession,
                updateSession: session_swagger_1.updateSession,
                addDessert: session_swagger_1.addDessert,
                Organization: organization_swagger_1.Organization,
                createOrganization: organization_swagger_1.createOrganization,
                updateOrganization: organization_swagger_1.updateOrganization,
                refuseOrganization: organization_swagger_1.refuseOrganization,
                approveOrganization: organization_swagger_1.approveOrganization,
                signUp: auth_swagger_1.signUp,
                createUser: users_swagger_1.createUser,
                updateMe: users_swagger_1.updateMe,
                User: users_swagger_1.User,
                Error: components_1.Error,
            },
            securitySchemes: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter the token : abcde12345".',
                },
            },
            responses: {
                DuplicateEmail: components_1.DuplicateEmail,
                Forbidden: components_1.Forbidden,
                NotFound: components_1.NotFound,
                Unauthorized: components_1.Unauthorized,
                201: {
                    description: 'created',
                },
                200: {
                    description: 'ok',
                },
                204: {
                    description: 'No content',
                },
                400: {
                    description: 'Bad request',
                },
                401: {
                    description: 'Unauthorized',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    apis: ['./dist/swagger/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map