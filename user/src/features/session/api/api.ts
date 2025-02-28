import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams, WithId } from "types/api";
import { DessertAction, Session, SessionAction } from "./type";
import { paginateParams } from "utils/apiHelpers";
import { storage } from "utils/storage";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Session> }>(
      API_ROUTES.SESSIONS.GET_ALL,
      {
        params: paginateParams(params),
        headers: { "organization-id": storage.getOrg() },
      }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: Session }>(
      API_ROUTES.SESSIONS.GET(id),
      { headers: { "organization-id": storage.getOrg() } }
    );
    return data.data;
  },
  edit: async ({ id, ...body }: WithId<SessionAction>) => {
    const { data } = await axios.patch<Session>(
      API_ROUTES.SESSIONS.EDIT(id),
      body,
      { headers: { "organization-id": storage.getOrg() } }
    );
    return data;
  },
  add: async (body: SessionAction) => {
    const { data } = await axios.post(API_ROUTES.SESSIONS.ADD, body, {
      headers: { "organization-id": storage.getOrg() },
    });
    return data;
  },
  end: async (id: string) => {
    const { data } = await axios.post(
      API_ROUTES.SESSIONS.END(id),
      {},
      { headers: { "organization-id": storage.getOrg() } }
    );
    return data;
  },
  addDessert: async ({ id, ...body }: WithId<DessertAction>) => {
    const { data } = await axios.post(
      API_ROUTES.SESSIONS.ADD_DESSERT(id),
      body,
      { headers: { "organization-id": storage.getOrg() } }
    );
    return data;
  },
};

export default API;
