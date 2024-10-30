import { useEffect, useState } from 'react';
import { IOrder, orders } from '../../data/ordersMock';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { CustomInput } from '../shared/CustomInput';
import { OrdersTableRow } from './OrdersTableRow';

export interface IOrderHeader {
  label: string;
  id: keyof IOrder;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const orderHeaders: IOrderHeader[] = [
  {
    label: 'Order #',
    align: 'left',
    id: 'orderNumber',
  },
  {
    label: 'Customer',
    align: 'left',
    id: 'customerName',
  },
  {
    label: 'PO #',
    align: 'right',
    id: 'poNumber',
  },
  {
    label: 'Source',
    align: 'left',
    id: 'source',
  },
  {
    label: 'Vendor',
    align: 'left',
    id: 'vendorName',
  },
  {
    label: 'Amount',
    align: 'right',
    id: 'amount',
    type: 'currency',
  },
  {
    label: 'Balance',
    align: 'right',
    id: 'balance',
    type: 'currency',
  },
  {
    label: 'Order Date',
    align: 'right',
    id: 'orderDate',
    type: 'date',
  },
  {
    label: 'Ship Date',
    align: 'right',
    id: 'shipDate',
    type: 'date',
  },
  {
    label: 'Ship City',
    align: 'left',
    id: 'shipCity',
  },
  {
    label: 'Ship State',
    align: 'left',
    id: 'shipState',
  },
  {
    label: 'Rep',
    align: 'left',
    id: 'rep',
  },
  {
    label: 'Writing Rep',
    align: 'left',
    id: 'writingRep',
  },
  {
    label: 'Generated From',
    align: 'left',
    id: 'generatedFrom',
  },
  {
    label: 'Status',
    align: 'center',
    id: 'status',
  },
];

export function OrdersTable(props: IOrdersTableProps) {
  const [searchText, setSearchText] = useState(props.initialSearchText || '');
  const rows = orders;
  const [filteredRows, setFilteredRows] = useState(rows);

  /**
   * As search text changes we filter the rows
   */
  useEffect(() => {
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

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        border: '0.2rem solid lightgrey',
        borderRadius: 5,
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5' fontWeight='bold' p={2}>
          View Orders
        </Typography>
        <Stack direction='row' gap={2} pr={3} alignItems='center'>
          <Button variant='contained' color='info' onClick={() => alert('open dialog to create direct order')}>
            Create Direct Order
          </Button>
          <Button variant='contained' color='info' onClick={() => alert('open dialog to add new customer')}>
            Add New Customer
          </Button>
        </Stack>
      </Stack>
      <Stack p={1} borderColor='lightgrey'>
        <CustomInput
          type='search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginTop: 0, border: '0.1rem solid grey' }}
        />
      </Stack>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'lightgrey' }}>
            {orderHeaders.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'} sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <OrdersTableRow key={index} row={row} headers={orderHeaders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface IOrdersTableProps {
  initialSearchText?: string;
}
