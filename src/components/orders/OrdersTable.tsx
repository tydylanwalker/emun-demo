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
    align: 'center',
    id: 'orderNumber',
  },
  {
    label: 'Customer',
    align: 'center',
    id: 'customerName',
  },
  {
    label: 'PO #',
    align: 'center',
    id: 'poNumber',
  },
  {
    label: 'Source',
    align: 'center',
    id: 'source',
  },
  {
    label: 'Vendor',
    align: 'center',
    id: 'vendorName',
  },
  {
    label: 'Amount',
    align: 'center',
    id: 'amount',
    type: 'currency',
  },
  {
    label: 'Balance',
    align: 'center',
    id: 'balance',
    type: 'currency',
  },
  {
    label: 'Order Date',
    align: 'center',
    id: 'orderDate',
    type: 'date',
  },
  {
    label: 'Ship Date',
    align: 'center',
    id: 'shipDate',
    type: 'date',
  },
  {
    label: 'Ship City',
    align: 'center',
    id: 'shipCity',
  },
  {
    label: 'Ship State',
    align: 'center',
    id: 'shipState',
  },
  {
    label: 'Rep',
    align: 'center',
    id: 'rep',
  },
  {
    label: 'Writing Rep',
    align: 'center',
    id: 'writingRep',
  },
  {
    label: 'Generated From',
    align: 'center',
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

  const styles = {
    button: {
      padding: '15px',
      whiteSpace: 'nowrap',
      width: 'fit-content',
      background: 'linear-gradient(45deg, #4B53D9, #6967CA, #B094AE)', // Linear gradient
      color: 'white',
      '&:hover': {
        background: 'linear-gradient(45deg,#6967CA, #4B53D9, #B094AE)', // Hover effect
        transform: 'scale(1.1)', // Scale up on hover
      },
    },
  };
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
      sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 5,
      }}
    >
      <Stack direction='row' pt={2} pb={2} gap={2}>
      <CustomInput
          type='search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginTop: 0, border: '0.03rem solid rgba(75, 83, 217, 0.3)' }}
        />
        <Stack direction='row' gap={2} pr={3} alignItems='center'>
          <Button variant='contained' onClick={() => alert('open dialog to create direct order')} sx={styles.button}>
            Create Direct Order
          </Button>
          <Button variant='contained' color='info' onClick={() => alert('open dialog to add new customer')} sx={styles.button}>
            Add New Customer
          </Button>
        </Stack>
      </Stack>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'lightgrey' }}>
            {orderHeaders.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'} sx={{ fontSize: '1.2rem', fontWeight: 'bold', bgcolor: 'black'}}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <OrdersTableRow key={index} row={row} headers={orderHeaders} color={index % 2 === 0 ? '#181818' : '#141414'}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface IOrdersTableProps {
  initialSearchText?: string;
}
