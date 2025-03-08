/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
export declare const User: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        email: {
            type: string;
            format: string;
        };
        name: {
            type: string;
        };
        role: {
            type: string;
            enum: unknown[];
        };
        status: {
            type: string;
        };
    };
    example: {
        id: string;
        email: string;
        name: string;
        role: string;
        status: string;
    };
};
export declare const createUser: {
    type: string;
    properties: {
        name: {
            type: string;
        };
        email: {
            type: string;
        };
        password: {
            type: string;
        };
        role: {
            type: string;
            enum: unknown[];
        };
    };
    example: {
        name: string;
        email: string;
        password: string;
        role: string;
    };
};
export declare const updateMe: {
    type: string;
    properties: {
        name: {
            type: string;
        };
        email: {
            type: string;
        };
    };
    example: {
        name: string;
        email: string;
    };
};
