import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  SubscriptionPlanFindOptions,
  subscriptionPlanRepository,
} from '../database/repositories/subscription-plan.repository';
import {
  ISubscriptionPlanAllSchema,
  ISubscriptionPlanIdSchema,
  ISubscriptionPlanCreateSchema,
  ISubscriptionPlanUpdateSchema,
} from '../schemas/subscription-plan.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class SubscriptionPlanController {
  // Get all SubscriptionPlans by author
  public getSubscriptionPlans = asyncHandler(
    async (
      req: ParsedRequest<void, ISubscriptionPlanAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SubscriptionPlanFindOptions = {
        filter: {
          // filters
        },
        search: req.valid.query.search,
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const subscriptionPlans =
        await subscriptionPlanRepository.findForAdmin(options);

      res.ok({ message: 'success', data: subscriptionPlans });
    },
  );

  // Get subscriptionPlan by Id for authenticated user
  public getSubscriptionPlan = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionPlanIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscriptionPlan = needRecord(
        await subscriptionPlanRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionPlan not found'),
      );

      res.ok({ message: 'success', data: subscriptionPlan });
    },
  );

  // Create subscriptionPlan handler
  public createSubscriptionPlan = asyncHandler(
    async (
      req: ParsedRequest<ISubscriptionPlanCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newSubscriptionPlan = req.valid.body;
      const subscriptionPlan =
        await subscriptionPlanRepository.insert(newSubscriptionPlan);
      if (subscriptionPlan === null) {
        throw new InternalError();
      }
      res.created({
        message: 'SubscriptionPlan has been created',
        data: subscriptionPlan,
      });
    },
  );

  // Update subscriptionPlan by Id for authenticated user
  public updateSubscriptionPlan = asyncHandler(
    async (
      req: ParsedRequest<
        ISubscriptionPlanUpdateSchema,
        void,
        ISubscriptionPlanIdSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const subscriptionPlan = needRecord(
        await subscriptionPlanRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionPlan not found'),
      );

      const data = await subscriptionPlanRepository.patchById(
        subscriptionPlan.id,
        updateBody,
      );

      res.ok({ message: 'SubscriptionPlan has been updated', data });
    },
  );

  // Delete subscriptionPlan by Id for authenticated user
  public deleteSubscriptionPlan = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionPlanIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscriptionPlan = needRecord(
        await subscriptionPlanRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionPlan not found'),
      );

      await subscriptionPlanRepository.deleteById(subscriptionPlan.id);
      res.noContent({ message: 'SubscriptionPlan deleted successfully' });
    },
  );
}

export const subscriptionPlanController = new SubscriptionPlanController();
