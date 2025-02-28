import { ISession } from '../../../database/models/session.model';
import { SessionStatus } from '../../../utils/enum';

export const calculateCost = async (
  session: ISession,
  organizationHourlyRate: number,
) => {
  session.endTime = new Date();
  session.status = SessionStatus.ended;
  session.additionalCost = session.desserts.reduce(
    (sum, element) => sum + element.dessert.price * element.count,
    0,
  );

  const durationInHours =
    (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 3600);

  session.subtotal =
    Math.max(
      organizationHourlyRate,
      Math.ceil(durationInHours * organizationHourlyRate),
    ) * session.numberOfPersons;

  // Total cost including additional cost
  session.totalCost = session.subtotal + session.additionalCost;

  await session.save({ validateBeforeSave: false });
  return session;
};
