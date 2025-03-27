import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Popover, Typography, Box } from '@mui/material';
import { IEnterCommissionsRow } from '../EnterCommissions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { getEnterCommissionsRows, setEnterCommissionsRows } from '../../../../store/slices/enterCommissionsSlice';
import { enterCommissionHeaders } from '../../../../data/interfaces/IEnterCommissionsHeader';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';
import { EnterCommissionsTableRow } from './EnterCommissionsTableRow';
import { EnterCommissionsTableTaskBar } from './EnterCommissionsTableTaskBar';
import { IOrder } from '../../../../data/interfaces/IOrder';
import { OrdersTableRow } from '../../../orders/OrdersTableRow';
import { getOrders } from '../../../../store/slices/dataSlice';
import { IOrderHeader } from '../../../orders/OrdersTable';

export const orderHeaders: IOrderHeader[] = [
  { label: 'PO #', align: 'left', id: 'poNumber' },
  { label: 'Source', align: 'center', id: 'source' },
  { label: 'Vendor', align: 'left', id: 'vendorName' },
  { label: 'Amount', align: 'right', id: 'amount', type: 'currency' },
  { label: 'Customer', align: 'left', id: 'customerName' },
  { label: 'Address', align: 'left', id: 'shipAddress' },
  { label: 'City', align: 'left', id: 'shipCity' },
  { label: 'State', align: 'center', id: 'shipState' },
  { label: 'Zip', align: 'center', id: 'shipZip' },
  { label: 'Rep', align: 'left', id: 'rep' },
];

export function EnterCommissionsTable() {
  const dispatch = useAppDispatch();
  const commissionRows = useAppSelector(getEnterCommissionsRows);
  const [rowsWithErrors, setRowsWithErrors] = useState<IEnterCommissionsRow[]>([]);
  const [matchedRows, setMatchedRows] = useState<IEnterCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For Popover
  const [selectedRow, setSelectedRow] = useState<IEnterCommissionsRow | null>(null); // Track the selected row for popup content
  const orders = useAppSelector(getOrders);
  const renderedRows = onlyShowErrors ? rowsWithErrors : commissionRows;

  useEffect(() => {
    const rowsWithErrors: IEnterCommissionsRow[] = [];
    const matchedRows: IEnterCommissionsRow[] = [];

    commissionRows.forEach((row) => {
      if (Object.values(row).some((field) => field.error)) {
        rowsWithErrors.push(row);
      } else {
        matchedRows.push(row);
      }
    });

    if (rowsWithErrors.length === 0) setOnlyShowErrors(false);

    setRowsWithErrors(rowsWithErrors);
    setMatchedRows(matchedRows);
  }, [commissionRows]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, row: IEnterCommissionsRow) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the popover
    setSelectedRow(row); // Set the row that was clicked for displaying in the popup
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Close the popover
    setSelectedRow(null); // Clear selected row
  };

  const updateRows = (order: IOrder, rowToUpdate: IEnterCommissionsRow) => {
    const index = commissionRows.findIndex((row) => row === rowToUpdate);

    if (index !== -1) {
      const updatedRows = [...commissionRows];
      updatedRows[index] = {
        ...updatedRows[index],
        poNumber: { value: order.poNumber },
        customerId: { value: order.customerId },
        customerName: { value: order.customerName },
        customerAddress: { value: order.shipAddress },
        customerCity: { value: order.shipCity },
        customerState: { value: order.shipState },
        customerZip: { value: order.shipZip },
        orderDate: { value: order.orderDate },
        rep: { value: order.rep },
        writingRep: { value: order.writingRep },
      };
      dispatch(setEnterCommissionsRows(updatedRows));
    }
  };

  const toggleChecked = (rowToUpdate: IEnterCommissionsRow) => {
    const index = commissionRows.findIndex((row) => row === rowToUpdate);

    if (index !== -1) {
      const updatedRows = [...commissionRows];
      updatedRows[index] = {
        ...updatedRows[index],
        checked: {
          value: !rowToUpdate.checked.value,
        },
      };
      dispatch(setEnterCommissionsRows(updatedRows));
    }
  };

  return (
    <CustomTableContainer
      taskBar={
        <EnterCommissionsTableTaskBar
          matchedRows={matchedRows}
          rowsWithErrors={rowsWithErrors}
          onlyShowErrors={onlyShowErrors}
          setOnlyShowErrors={setOnlyShowErrors}
        />
      }
    >
      <>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'> </TableCell>
              {/* Map headers for table columns */}
              {enterCommissionHeaders.map((header, index) => (
                <TableCell key={index} align={header.align || 'left'}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedRows.map((row, index) => (
              <EnterCommissionsTableRow
                key={index}
                row={row}
                onConfirmMatch={updateRows}
                toggleChecked={toggleChecked}
                onPopoverOpen={handlePopoverOpen} // Pass the popover open handler
              />
            ))}
          </TableBody>
        </Table>

        {/* Popover for displaying details when icon is clicked */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            width: '40vw', // Set fixed width
            maxWidth: '40vw', // Optional: limit max width to prevent expansion
            height: 'auto', // Adjust height as needed
          }}
        >
          <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Typography paddingTop={1} paddingLeft={1}>
              Potential Matches
            </Typography>
            <TableRow>
              {orderHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  align={header.align || 'left'}
                  sx={{
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap', // Prevent text from wrapping to next line
                    overflow: 'hidden', // Hide any overflow text
                    textOverflow: 'ellipsis', // Show ellipsis (...) for overflow text
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
            {orders.slice(0, 2).map((row, index) => (
              <OrdersTableRow key={index} row={row} headers={orderHeaders} selected={false} shrinkText={true} />
            ))}
          </div>
        </Popover>
      </>
    </CustomTableContainer>
  );
}
