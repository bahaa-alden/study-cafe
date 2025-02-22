import { Router } from 'express';
import validator from '../middlewares/validator';
import sessionSchema from '../schemas/session.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { sessionController } from '../controllers/session.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import organizationSchema from '../schemas/organization.schema';
const { USER, ADMIN } = RoleCode;

export class SessionRoutes {
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

    // GET ALL SESSIONS
    this.router.get(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        query: sessionSchema.sessionAll,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.getSessions,
    );

    // GET SESSION BY ID
    this.router.get(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: sessionSchema.sessionId,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.getSession,
    );

    // CREATE SESSION
    this.router.post(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        body: sessionSchema.sessionCreate,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.createSession,
    );

    // End SESSION
    this.router.post(
      '/:id/end',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        body: sessionSchema.sessionEnd,
        params: sessionSchema.sessionId,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.endSession,
    );

    // UPDATE SESSION BY ID
    this.router.patch(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: sessionSchema.sessionId,
        body: sessionSchema.sessionUpdate,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.updateSession,
    );

    // DELETE SESSION BY ID
    this.router.delete(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: sessionSchema.sessionId,
        headers: organizationSchema.organizationHeader,
      }),
      sessionController.deleteSession,
    );
  }
}

export const sessionRoutes = new SessionRoutes();
