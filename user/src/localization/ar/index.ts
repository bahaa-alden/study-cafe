import zod from "zod-i18n-map/locales/ar/zod.json";
import admin from "./admin.json";
import category from "./category.json";
import city from "./city.json";
import common from "./common.json";
import employee from "./employee.json";
import home from "./home.json";
import layout from "./layout.json";
import user from "./user.json";
import validation from "./validation.json";
import warehouse from "./warehouse.json";
import auth from "./auth.json";
import organization from "./organization.json";
import session from "./session.json";
import dessert from "./dessert.json";

const language = {
  organization,
  common,
  validation,
  layout,
  zod,
  employee,
  admin,
  category,
  user,
  city,
  warehouse,
  home,
  auth,
  session,
  dessert
} as const;
export default language;
