import { IUser } from '../database/models/user.model';
export default class Email {
    private to;
    private firstName;
    private url;
    private from;
    constructor(user: IUser, url: string);
    private sendEmail;
    sendWelcome(): Promise<void>;
    sendPasswordReset(resetCode: string): Promise<void>;
}
