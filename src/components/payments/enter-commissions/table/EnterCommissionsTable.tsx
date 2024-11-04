import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { IEnterCommissionsRow } from '../EnterCommissions';
import { EnterCommissionsTableTaskBar } from './EnterCommissionsTableTaskBar';
import { useEffect, useState } from 'react';
import { EnterCommissionsTableRow } from './EnterCommissionsTableRow';
import { IOrder } from '../../../../data/interfaces/IOrder';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { getEnterCommissionsRows, setEnterCommissionsRows } from '../../../../store/slices/enterCommissionsSlice';
import { enterCommissionHeaders } from '../../../../data/interfaces/IEnterCommissionsHeader';

export function EnterCommissionsTable() {
  const dispatch = useAppDispatch();
  const commissionRows = useAppSelector(getEnterCommissionsRows);
  const [rowsWithErrors, setRowsWithErrors] = useState<IEnterCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const renderedRows = onlyShowErrors ? rowsWithErrors : commissionRows;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    setPage(0);
    const errors = commissionRows.filter((row) => Object.values(row).some((field) => field.error));
    if (errors.length === 0) setOnlyShowErrors(false);
    setRowsWithErrors(errors);
  }, [commissionRows]);

  const updateRows = (order: IOrder, rowToUpdate: IEnterCommissionsRow) => {
    const index = commissionRows.findIndex((row) => row === rowToUpdate);

    if (index !== -1) {
      const updatedRows = [...commissionRows];
      updatedRows[index] = {
        ...updatedRows[index],
        poNumber: {
          value: order.poNumber,
        },
        customerId: {
          value: order.customerId,
        },
        customerName: {
          value: order.customerName,
        },
        customerAddress: {
          value: order.shipAddress,
        },
        customerCity: {
          value: order.shipCity,
        },
        customerState: {
          value: order.shipState,
        },
        customerZip: {
          value: order.shipZip,
        },
        orderDate: {
          value: order.orderDate,
        },
        rep: {
          value: order.rep,
        },
        writingRep: {
          value: order.writingRep,
        },
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CustomTableContainer
      taskBar={
        <EnterCommissionsTableTaskBar
          totalRows={commissionRows.length}
          rowsWithErrors={rowsWithErrors.length}
          onlyShowErrors={onlyShowErrors}
          setOnlyShowErrors={setOnlyShowErrors}
        />
      }
      pagination={{
        count: renderedRows.length,
        page,
        rowsPerPage,
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align={'center'} sx={{ cursor: 'default' }}>
              <Checkbox checked={true} onChange={() => {}} />
            </TableCell>
            {enterCommissionHeaders.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <EnterCommissionsTableRow key={index} row={row} onConfirmMatch={updateRows} toggleChecked={toggleChecked} />
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
