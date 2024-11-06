import { useEffect, useState } from 'react';
import { IOrder } from '../../data/interfaces/IOrder';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../shared/CustomInput';
import { OrdersTableRow } from './OrdersTableRow';
import { CustomTableContainer } from '../shared/CustomTableContainer';
import { IEnterCommissionsRow } from '../payments/enter-commissions/EnterCommissions';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { getOrders } from '../../store/slices/dataSlice';

export interface IOrderHeader {
  label: string;
  id: keyof IOrder;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const orderHeaders: IOrderHeader[] = [
  { label: 'PO #', align: 'left', id: 'poNumber' },
  { label: 'Order #', align: 'left', id: 'orderNumber' },
  { label: 'Source', align: 'center', id: 'source' },
  { label: 'Vendor', align: 'left', id: 'vendorName' },
  { label: 'Amount', align: 'right', id: 'amount', type: 'currency' },
  { label: 'Balance', align: 'right', id: 'balance', type: 'currency' },
  { label: 'Order Date', align: 'center', id: 'orderDate', type: 'date' },
  { label: 'Ship Date', align: 'center', id: 'shipDate', type: 'date' },
  { label: 'Customer', align: 'left', id: 'customerName' },
  { label: 'Address', align: 'left', id: 'shipAddress' },
  { label: 'City', align: 'left', id: 'shipCity' },
  { label: 'State', align: 'center', id: 'shipState' },
  { label: 'Zip', align: 'center', id: 'shipZip' },
  { label: 'Rep', align: 'left', id: 'rep' },
  { label: 'Writing Rep', align: 'left', id: 'writingRep' },
  { label: 'Status', align: 'center', id: 'status' },
];

export enum EOrderButtons {
  directOrder = 'Create Direct Order',
  newCustomer = 'Add New Customer',
}

export function OrdersTable(props: IOrdersTableProps) {
  const rows = useAppSelector(getOrders);
  const [searchText, setSearchText] = useState(props.initialSearchText || '');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    setSearchText(props.initialSearchText || '');
  }, [props.initialSearchText]);

  useEffect(() => {
    setSelectedRow(null);
    setPage(0);
    if (searchText === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
        )
      );
    }
  }, [rows, searchText]);

  const confirmMatch = (type?: EOrderButtons) => {
    switch (type) {
      case EOrderButtons.directOrder:
        props.onConfirmMatch?.(undefined, type);
        break;
      case EOrderButtons.newCustomer:
        props.onConfirmMatch?.(undefined, type);
        break;
      default:
        if (selectedRow === null) {
          setSelectedRow(0);
          return;
        } else {
          props.onConfirmMatch?.(filteredRows[selectedRow]);
        }
        break;
    }
    setSearchText('');
    setSelectedRow(null);
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
      tabIndex={0}
      header={
        <Stack direction='row' alignItems='center' gap={2}>
          <Typography variant='h5' fontWeight='bold' p={2}>
            {props.header || 'View Orders'}
          </Typography>
          {selectedRow !== null && (
            <Button variant='outlined' sx={{ my: 2 }} onClick={() => confirmMatch()}>
              Confirm Match
            </Button>
          )}
        </Stack>
      }
      taskBar={
        <Stack direction='row' justifyContent='space-between' p={1} gap={3}>
          <CustomInput
            type='search'
            size='small'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ marginTop: 0 }}
            onKeyDown={(event) => {
              if (props.clickable) {
                if (event.key === 'Enter') {
                  confirmMatch();
                } else if (event.key === 'Tab') {
                  event.preventDefault();
                  setSelectedRow((prevRow) =>
                    prevRow === null ? 0 : prevRow + 1 === filteredRows.length ? 0 : prevRow + 1
                  );
                }
              }
            }}
          />
          <Stack direction='row' gap={2} alignItems='center'>
            {Object.values(EOrderButtons).map((button) => (
              <Button
                key={button}
                variant='contained'
                onClick={() => confirmMatch(button)}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {button}
              </Button>
            ))}
          </Stack>
        </Stack>
      }
      pagination={{
        count: filteredRows.length,
        page,
        rowsPerPage,
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {orderHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header.align || 'left'}
                sx={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <OrdersTableRow
              key={index}
              row={row}
              headers={orderHeaders}
              selected={selectedRow === index}
              onClick={props.clickable ? () => setSelectedRow(index) : undefined}
              onKeyDown={(event) => {
                if (props.clickable) {
                  if (event.key === 'Enter') {
                    confirmMatch();
                  } else if (event.key === 'Tab') {
                    event.preventDefault();
                    setSelectedRow((prevRow) =>
                      prevRow === null ? 0 : prevRow + 1 === filteredRows.length ? 0 : prevRow + 1
                    );
                  }
                }
              }}
            />
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}

interface IOrdersTableProps {
  initialSearchText?: string;
  clickable?: boolean;
  onConfirmMatch?: (order?: IOrder, type?: EOrderButtons) => void;
  header?: string;
  commissionRow?: IEnterCommissionsRow;
}
