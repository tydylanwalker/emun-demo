import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Popover, Typography } from '@mui/material';
import { IEnterCommissionsRow } from '../EnterCommissions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { getEnterCommissionsRows, setEnterCommissionsRows } from '../../../../store/slices/enterCommissionsSlice';
import { enterCommissionHeaders } from '../../../../data/interfaces/IEnterCommissionsHeader';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';
import { EnterCommissionsTableRow } from './EnterCommissionsTableRow';
import { EnterCommissionsTableTaskBar } from './EnterCommissionsTableTaskBar';
import { IOrder } from '../../../../data/interfaces/IOrder';

export function EnterCommissionsTable() {
  const dispatch = useAppDispatch();
  const commissionRows = useAppSelector(getEnterCommissionsRows);
  const [rowsWithErrors, setRowsWithErrors] = useState<IEnterCommissionsRow[]>([]);
  const [matchedRows, setMatchedRows] = useState<IEnterCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For Popover
  const [selectedRow, setSelectedRow] = useState<IEnterCommissionsRow | null>(null); // Track the selected row for popup content

  const renderedRows = onlyShowErrors ? rowsWithErrors : commissionRows;

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
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>
            {selectedRow && (
              <>
                <div>PO Number: {selectedRow.poNumber.value}</div>
                <div>Customer Name: {selectedRow.customerName.value}</div>
                <div>Order Date: {selectedRow.orderDate.value}</div>
              </>
            )}
          </Typography>
        </Popover>
      </>
    </CustomTableContainer>
  );
}
