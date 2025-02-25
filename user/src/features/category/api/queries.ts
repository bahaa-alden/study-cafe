import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";
import { CategoryAllParams } from "./type";
export const keys = createQueryKeys("category", {
  all: (params: CategoryAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
  select: {
    queryFn: () => API.select(),
    queryKey: [""],
  },
});
export const queries = {
  useAll: (params: CategoryAllParams) => useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) => useQuery({ ...keys.details(id), enabled: !!id }),
  useSelect: () => useQuery(keys.select),

  useAdd: () => useMutation(API.add),
  useEdit: () => useMutation(API.edit),
  useRemove: () => useMutation(API.remove),
};
