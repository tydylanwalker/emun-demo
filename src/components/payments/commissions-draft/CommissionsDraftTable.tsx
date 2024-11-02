import { useEffect, useState } from 'react';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../../shared/CustomInput';
import { ICommissionDraft, commissions } from '../../../data/commissions';
import { CommissionsDraftTableRow } from './CommissionsDraftTableRow';
import { vendorsMock } from '../../../data/vendors';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { Visibility } from '@mui/icons-material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';

export interface ICommissionDraftHeader {
  label: string;
  id: keyof ICommissionDraft;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'percentage';
}

const commissionsHeader: ICommissionDraftHeader[] = [
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
    label: 'Pay Period',
    align: 'center',
    id: 'payPeriod',
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
    label: 'Vendor',
    align: 'center',
    id: 'vendor',
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

export function CommissionsDraftTable() {
  const [searchText, setSearchText] = useState('');

  const rows = commissions;
  console.log(commissions);
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
    let filteredRows = rows;
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
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' fontWeight='bold' p={2}>
          Commissions Draft
        </Typography>
        <Stack direction='row' gap={2} mb={2}>
          <HeaderAndValueCard header='Invoice Total Amount' value={'$' + formatCurrency(invoicesTotal)} width='18rem' />
          <HeaderAndValueCard header='Total Commission' value={'$' + formatCurrency(commissionAmount)} width='18rem' />
          <HeaderAndValueCard header='Rep Commission' value={'$' + formatCurrency(repAmount)} width='18rem' />
        </Stack>
      </Stack>
      <Button size='large' sx={{ width: 'fit-content' }}>
        <Visibility /> View Statement
      </Button>
      <CustomTableContainer
        taskBar={
          <Stack px={1} pb={1} gap={0} position='sticky' top={0} zIndex={2} bgcolor='background.paper'>
            <Stack direction='row' width={1} gap={2}>
              <CustomInput
                select
                value={payPeriod}
                label='Select Pay Period'
                options={payPeriodOptions}
                onChange={(event) => setPayPeriod(event.target.value as string)}
              />
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
            </Stack>
            <CustomInput
              type='search'
              size='small'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Stack>
        }
      >
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: 'secondary.main' }}>
            <TableRow>
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
              <CommissionsDraftTableRow key={index} row={row} headers={commissionsHeader} />
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </>
  );
}
