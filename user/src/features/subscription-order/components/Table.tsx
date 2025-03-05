import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import { subscriptionOrderQueries } from "..";
import useTableHeader from "../hooks/useTableHeaders";
import { useQueryClient } from "@tanstack/react-query";
import { queryStore } from "features/shared";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { useTranslation } from "react-i18next";
import { Role, SubscriptionOrderStatus } from "constants/enums";
import { storage } from "utils/storage";
import i18n from "lib/i18next";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

type Props = {};
export const Table: FC<Props> = ({}) => {
  const { t } = useTranslation("subscription-order");
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const queryClient = useQueryClient();
  const role = storage.getRole();
  const query =
    role === Role.admin
      ? subscriptionOrderQueries.useAll({
          search,
          page,
        })
      : subscriptionOrderQueries.useMine({
          search,
          page,
        });

  const approve = subscriptionOrderQueries.useApprove();
  const refuse = subscriptionOrderQueries.useRefuse();

  const { data } = query;
  const tableHeaders = useTableHeader();
  const currentPage = getPage(data, page);
  const successSnackbar = useSuccessSnackbar();

  const handelApprove = async (id: string) => {
    approve.mutate(
      { id },
      {
        onSuccess: () => {
          role === Role.admin
            ? queryClient.invalidateQueries(
                queryStore["subscription-orders"].all._def
              )
            : queryClient.invalidateQueries(
                queryStore["subscription-orders"].mine._def
              );

          queryClient.invalidateQueries(
            queryStore["subscription-orders"].details(id)
          );
          successSnackbar(t("message.success.approve"));
        },
      }
    );
  };

  const handelRefuse = async (id: string) => {
    refuse.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            queryStore["subscription-orders"].all._def
          );
          queryClient.invalidateQueries(
            queryStore["subscription-orders"].details(id)
          );
          successSnackbar(t("message.success.refuse"));
        },
      }
    );
  };

  return (
    <PaginationTable
      sx={{
        "td:nth-of-type(2) .MuiSkeleton-root": {
          m: 0,
        },
      }}
      pageNumber={page}
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
              <TableCell
                key={cellHeader}
                sx={{
                  "&.MuiTableCell-root": {
                    textAlign: "center",
                  },
                }}
              >
                {cellHeader}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      skeleton={true}
      cellCount={tableHeaders.length}
      infiniteQuery={query}
    >
      <TableBody>
        {currentPage.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.organization.name}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {i18n.language === "en"
                ? row.plan.title["en"]
                : row.plan.title["ar"]}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.plan.price}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.status}</TableCell>
            {row.status === SubscriptionOrderStatus.pending &&
              role === Role.admin && (
                <TableCell>
                  <ButtonsStack>
                    <Tooltip title={t("approve")}>
                      <IconButton
                        onClick={() => handelApprove(row.id)}
                        disabled={approve.isLoading}
                      >
                        <CheckCircleIcon
                          sx={{ color: green[500], fontSize: 21 }}
                        />
                      </IconButton>
                    </Tooltip>
                    <RemoveIconButton
                      onClick={() => handelRefuse(row.id)}
                      disabled={refuse.isLoading}
                    />
                  </ButtonsStack>
                </TableCell>
              )}
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};
