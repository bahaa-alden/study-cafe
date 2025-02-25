import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams } from "types/api";
import { Organization } from "./type";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Organization> }>(
      API_ROUTES.ORGANIZATIONS.GET_ALL,
      { params }
    );
    return data.data;
  },
};

export default API;
