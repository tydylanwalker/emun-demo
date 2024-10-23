import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { orders } from "@/data/orders";
import { text } from "stream/consumers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableHeaders = [
  {
    text: "id",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Customer",
    align: "right",
    fieldName: "id",
  },
  {
    text: "PO #",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Source",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Vendor",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Amount",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Balance",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Order Date",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Ship Date",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Ship City",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Ship State",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Rep",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Writing Rep",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Generated From",
    align: "right",
    fieldName: "id",
  },
  {
    text: "Status",
    align: "right",
    fieldName: "id",
  },
];

export function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.results.map((order, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {order.companyName}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{order.}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
