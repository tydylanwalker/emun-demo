import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box } from '@mui/material';
import { ordersMock } from '../../../data/orders';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueByPath = (obj: any, path: string) => {
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .reduce((acc, key) => acc && acc[key], obj);
};

interface ITableHeaders {
  text: string;
  fieldName: string; // could do keyof Order but if nested values we can't
  align?: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'status';
}

const tableHeaders: ITableHeaders[] = [
  {
    text: 'Order #',
    align: 'left',
    fieldName: 'id',
  },
  {
    text: 'Customer',
    align: 'left',
    fieldName: 'companyName',
  },
  {
    text: 'PO #',
    align: 'right',
    fieldName: 'purchaseOrder',
  },
  {
    text: 'Source',
    align: 'left',
    fieldName: 'orderSourceLabel',
  },
  {
    text: 'Vendor',
    align: 'left',
    fieldName: 'vendorLabel',
  },
  {
    text: 'Amount',
    align: 'right',
    fieldName: 'grandTotal',
    type: 'currency',
  },
  {
    text: 'Balance',
    align: 'right',
    fieldName: 'balance',
    type: 'currency',
  },
  {
    text: 'Order Date',
    align: 'right',
    fieldName: 'orderedOn',
    type: 'date',
  },
  {
    text: 'Ship Date',
    align: 'right',
    fieldName: 'shipOn',
    type: 'date',
  },
  {
    text: 'Ship City',
    align: 'left',
    fieldName: 'shipCity',
  },
  {
    text: 'Ship State',
    align: 'left',
    fieldName: 'shipState',
  },
  {
    text: 'Rep',
    align: 'left',
    fieldName: 'currentRepName',
  },
  {
    text: 'Writing Rep',
    align: 'left',
    fieldName: 'writingRepName',
  },
  {
    text: 'Generated From',
    align: 'left',
    fieldName: 'generatedFrom',
  },
  {
    text: 'Status',
    align: 'center',
    fieldName: 'status',
    type: 'status',
  },
];

export function CustomizedTables() {
  // const filteredData = props.vendor === 'All' ? ordersMock : ordersMock.filter(item => item. === props.vendor);

  return (
    <Box>
      <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index} align={header.align || 'left'}>
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersMock.map((order, rowIndex) => (
              <TableRow key={rowIndex}>
                {tableHeaders.map((header, index) => {
                  const { fieldName, align, type } = header;
                  const value = getValueByPath(order, fieldName);
                  let content = value;
                  let typographyStyles = {};

                  switch (type) {
                    case 'date':
                      const date = new Date(value);
                      content = isNaN(date.getTime())
                        ? '-'
                        : `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
                      break;
                    case 'currency':
                      content = '$' + Number(value).toFixed(2);
                      break;
                    case 'status':
                      // TODO can def clean this up but works for time being
                      typographyStyles = {
                        bgcolor:
                          value === 'Open'
                            ? 'green'
                            : value === 'Completed'
                              ? 'skyblue'
                              : value === 'On Hold'
                                ? 'red'
                                : 'orange',
                        p: '0.5rem 1rem',
                        borderRadius: 10,
                      };
                      break;
                  }

                  return (
                    <TableCell key={index} align={align || 'left'}>
                      <Typography variant='caption' sx={typographyStyles}>
                        {content}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
