import { Router } from 'express';
import validator from '../middlewares/validator';
import subscriptionPlanSchema from '../schemas/subscription-plan.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { subscriptionPlanController } from '../controllers/subscription-plan.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';
const { USER, ADMIN } = RoleCode;

export class SubscriptionPlanRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authMiddleware.authenticateJWT,
    );

    // GET ALL SUBSCRIPTIONPLANS
    this.router.get(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ query: subscriptionPlanSchema.subscriptionPlanAll }),
      subscriptionPlanController.getSubscriptionPlans,
    );

    // GET SUBSCRIPTIONPLAN BY ID
    this.router.get(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionPlanSchema.subscriptionPlanId }),
      subscriptionPlanController.getSubscriptionPlan,
    );

    // CREATE SUBSCRIPTIONPLAN
    this.router.post(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ body: subscriptionPlanSchema.subscriptionPlanCreate }),
      subscriptionPlanController.createSubscriptionPlan,
    );

    // UPDATE SUBSCRIPTIONPLAN BY ID
    this.router.patch(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: subscriptionPlanSchema.subscriptionPlanId,
        body: subscriptionPlanSchema.subscriptionPlanUpdate,
      }),
      subscriptionPlanController.updateSubscriptionPlan,
    );

    // DELETE SUBSCRIPTIONPLAN BY ID
    this.router.delete(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionPlanSchema.subscriptionPlanId }),
      subscriptionPlanController.deleteSubscriptionPlan,
    );
  }
}

export const subscriptionPlanRoutes = new SubscriptionPlanRoutes();
