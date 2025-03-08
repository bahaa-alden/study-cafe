import { ISession } from '../../../database/models/session.model';
export declare const calculateCost: (session: ISession, organizationHourlyRate: number) => Promise<ISession>;
