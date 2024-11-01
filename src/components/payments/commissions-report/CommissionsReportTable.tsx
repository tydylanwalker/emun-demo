import { useEffect, useState } from 'react';
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
import { CustomInput } from '../../shared/CustomInput';
import { ICommissionReport, commissions } from '../../../data/commissions';
import { CommissionsReportTableRow } from './CommissionsReportTableRow';
import { vendorsMock } from '../../../data/vendors';
import { compact } from 'lodash';
import { unique } from 'next/dist/build/utils';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';

export interface ICommissionReportHeader {
  label: string;
  id: keyof ICommissionReport;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'percentage';
}

const commissionsHeader: ICommissionReportHeader[] = [
  {
    label: 'Check #',
    align: 'center',
    id: 'checkNumber',
  },
  {
    label: 'Check Amount',
    align: 'center',
    id: 'checkAmount',
    type: 'currency',
  },
  {
    label: 'Invoice #',
    align: 'center',
    id: 'invoiceNumber',
  },
  {
    label: 'Invoice Date',
    align: 'center',
    id: 'invoiceDate',
  },
  {
    label: 'Invoice Amount',
    align: 'center',
    id: 'invoiceAmount',
    type: 'currency',
  },
  {
    label: 'Vendor Comm %',
    align: 'center',
    id: 'vendorCommission',
    type: 'percentage',
  },
  {
    label: 'Total Comm Amt',
    align: 'center',
    id: 'commissionAmount',
    type: 'currency',
  },
  {
    label: 'Rep Comm Amt.',
    align: 'center',
    id: 'repCommissionAmount',
    type: 'currency',
  },
  {
    label: 'Your Comm %',
    align: 'center',
    id: 'repCommissionRate',
    type: 'percentage',
  },
  {
    label: 'Comments',
    align: 'left',
    id: 'comments',
  },
  {
    label: 'strCategory',
    align: 'center',
    id: 'strCategory',
  },
  {
    label: 'Account Type',
    align: 'center',
    id: 'accountType',
  },
];

export function CommissionsReportTable() {
  const [searchText, setSearchText] = useState('');

  const rows = commissions;
  const [filteredRows, setFilteredRows] = useState(rows);

  const [vendor, setVendor] = useState('');
  const vendorOptions = vendorsMock.map((vendor) => vendor.vendorName);

  const [rep, setRep] = useState('');
  const repNames = commissions.map((commission) => commission.rep);
  const repOptions = Array.from(new Set(repNames.filter((name) => name.trim() !== '')));

  const payPeriodOptions = ['JUNE2024', 'JULY2024', 'AUG2024', 'SEPT2024', 'OCT2024'];
  const [payPeriod, setPayPeriod] = useState('');

  const [invoicesTotal, setInvoicesTotal] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [repAmount, setRepAmount] = useState(0);

  useEffect(() => {
    var filteredRows = rows;
    if (vendor) {
      filteredRows = filteredRows.filter((commission) => commission.vendor == vendor);
    }

    if (rep) {
      filteredRows = filteredRows.filter((commission) => commission.rep == rep);
    }

    if (payPeriod) {
      filteredRows = filteredRows.filter((commission) => commission.payPeriod == payPeriod);
    }

    if (searchText !== '') {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    setFilteredRows(filteredRows);
  }, [rows, vendor, rep, payPeriod, searchText]);

  useEffect(() => {
    setInvoicesTotal(
      filteredRows
        .map((commission) => commission.invoiceAmount)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
    );

    setCommissionAmount(
      filteredRows
        .map((commission) => commission.commissionAmount)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
    );

    setRepAmount(
      filteredRows
        .map((commission) => commission.repCommissionAmount)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
    );
  }, [filteredRows]);

  return (
    <Stack gap={2}>
      <Stack direction='row' gap={2}>
        <HeaderAndValueCard header='Invoice Total Amount' value={'$' + formatCurrency(invoicesTotal)} width='18rem' />
        <HeaderAndValueCard header='Total Commission' value={'$' + formatCurrency(commissionAmount)} width='18rem' />
        <HeaderAndValueCard header='Rep Commission' value={'$' + formatCurrency(repAmount)} width='18rem' />
      </Stack>
      <TableContainer component={Paper}>
        <Typography variant='h5' fontWeight='bold' p={2}>
          Commissions Report
        </Typography>
        <Stack direction='column' justifyContent='space-between' alignItems={'baseline'} p={1} gap={2}>
          <CustomInput
            type='search'
            size='small'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ maxWidth: '50%' }}
          />
          <Stack direction='row' justifyContent='space-between' width={1} gap={2}>
            <CustomInput
              select
              value={vendor}
              label='Select Vendor'
              options={vendorOptions}
              onChange={(event) => setVendor(event.target.value as string)}
            />
            <CustomInput
              select
              value={rep}
              label='Select Rep'
              options={repOptions}
              onChange={(event) => setRep(event.target.value as string)}
            />
            <CustomInput
              select
              value={payPeriod}
              label='Select Pay Period'
              options={payPeriodOptions}
              onChange={(event) => setPayPeriod(event.target.value as string)}
            />
          </Stack>
        </Stack>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'secondary.main' }}>
              {commissionsHeader.map((header, index) => (
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
            {filteredRows.map((row, index) => (
              <CommissionsReportTableRow key={index} row={row} headers={commissionsHeader} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}