import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t: tCommon } = useTranslation();
  const { t } = useTranslation("subscription-order", { keyPrefix: "table" });
  return [
    t("organization"),
    t("plan"),
    t("status"),
    t("price"),
    tCommon("action"),
  ];
};

export default useTableHeader;
