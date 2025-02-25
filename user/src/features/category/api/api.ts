import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, WithId } from "types/api";
import { paginateParams } from "utils/apiHelpers";
import {
  Category,
  CategoryAction,
  CategoryAllParams,
  CategorySelect,
} from "./type";

const API = {
  add: async (body: CategoryAction) => {
    const { data } = await axios.post(API_ROUTES.CATEGORIES.ADD, body);
    return data;
  },
  getAll: async (params: CategoryAllParams) => {
    const { data } = await axios.get<APIList<Category>>(
      API_ROUTES.CATEGORIES.GET_ALL,
      {
        params: paginateParams(params),
      }
    );
    return data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<Category>(API_ROUTES.CATEGORIES.GET(id));
    return data;
  },
  edit: async ({ _id: id, ...body }: WithId<CategoryAction>) => {
    const { data } = await axios.patch<Category>(
      API_ROUTES.CATEGORIES.EDIT(id),
      body
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.CATEGORIES.DELETE(id));
    return data;
  },
  select: async () => {
    const { data } = await axios.get<{ data: CategorySelect[] }>(
      API_ROUTES.CATEGORIES.GET_ALL,
      {
        params: { fields: "name" },
      }
    );
    return data.data;
  },
};

export default API;
