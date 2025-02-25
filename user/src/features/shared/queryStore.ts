import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { accountKeys } from "features/account";
import { categoryKeys } from "features/category";
import { userKeys } from "features/user";

export const queryStore = mergeQueryKeys(accountKeys, categoryKeys, userKeys);
