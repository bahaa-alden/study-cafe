import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams, WithId } from "types/api";
import { Organization, OrganizationAction } from "./type";
import { paginateParams } from "utils/apiHelpers";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Organization> }>(
      API_ROUTES.ORGANIZATIONS.GET_ALL,
      { params: paginateParams(params) }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: Organization }>(
      API_ROUTES.ORGANIZATIONS.GET(id)
    );
    return data.data;
  },
  edit: async ({ id, ...body }: WithId<OrganizationAction>) => {
    const { data } = await axios.patch<Organization>(
      API_ROUTES.ORGANIZATIONS.EDIT(id),
      body
    );
    return data;
  },
};

export default API;
