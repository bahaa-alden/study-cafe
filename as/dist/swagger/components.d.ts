export declare const Error: {
    type: string;
    properties: {
        status: {
            type: string;
        };
        message: {
            type: string;
        };
    };
};
export declare const DuplicateEmail: {
    description: string;
    content: {
        'application/json': {
            schema: {
                $ref: string;
            };
            example: {
                status: string;
                message: string;
            };
        };
    };
};
export declare const Unauthorized: {
    description: string;
    content: {
        'application/json': {
            schema: {
                $ref: string;
            };
            example: {
                status: string;
                message: string;
            };
        };
    };
};
export declare const Forbidden: {
    description: string;
    content: {
        'application/json': {
            schema: {
                $ref: string;
            };
            example: {
                status: string;
                message: string;
            };
        };
    };
};
export declare const NotFound: {
    description: string;
    content: {
        'application/json': {
            schema: {
                $ref: string;
            };
            example: {
                status: string;
                message: string;
            };
        };
    };
};
