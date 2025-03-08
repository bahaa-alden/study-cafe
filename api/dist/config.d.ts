import { Env } from './utils/enum';
export declare const env_vars: {
    apiUrl: string;
    app_name: string;
    email_key: string;
    sender: string;
    env: Env;
    port: string;
    log_dir: string;
    mongoose: {
        url: string;
    };
    jwt: {
        secret: string;
        accessExpiration: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        secure: boolean;
    };
};
