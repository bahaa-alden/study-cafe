import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import { subscriptionQueries } from "..";
import useTableHeader from "../hooks/useTableHeaders";
import { Role } from "constants/enums";
import { storage } from "utils/storage";
import { diffInDays, transformFiled } from "utils/transforms";

type Props = {};
export const Table: FC<Props> = ({}) => {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const role = storage.getRole();
  const query =
    role === Role.admin
      ? subscriptionQueries.useAll({
          search,
          page,
        })
      : subscriptionQueries.useMine({
          search,
          page,
        });

  const { data } = query;
  const tableHeaders = useTableHeader();
  const currentPage = getPage(data, page);

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
              {transformFiled(row.plan.title)}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.status}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {row.payment.amount}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {!row.expiresDate || diffInDays(row.expiresDate) <= 0
                ? "Subscription Expired"
                : `${diffInDays(row.expiresDate)} day(s)`}
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};
