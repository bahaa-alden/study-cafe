export interface Options {
    locale?: string;
    preserveConsecutiveUppercase?: boolean;
}
export declare const camelCase: (input: string | string[], options?: Options) => string;
export declare const pascalCase: (input: string | string[], options?: Options) => string;
