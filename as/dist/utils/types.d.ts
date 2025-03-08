import { Schema } from 'mongoose';
export type Fn<T> = () => T;
export interface ILocalString {
    en?: string;
    ar?: string;
}
export interface ILocalStringEnum<T> {
    en?: T;
    ar?: T;
}
export declare const localStringSchema: Schema;
export declare function createLocalStringSchema<T>(enumType: Record<string, string>): Schema;
