import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { OrganizationAllParams } from "./type";
import { useInfiniteQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("organizations", {
  all: (params: OrganizationAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
});
export const queries = {
  useAll: (params: OrganizationAllParams) => useInfiniteQuery(keys.all(params)),
};
