import { useEffect, useState } from 'react';
import { Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../../shared/CustomInput';
import { ICommissionDraft, commissions } from '../../../data/mock/commissions';
import { CommissionsDraftTableRow } from './CommissionsDraftTableRow';
import { vendorsMock } from '../../../data/mock/vendors';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { AddRounded, Visibility } from '@mui/icons-material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { EditCommissionDraft } from './forms/EditCommissionDraft';

export interface ICommissionDraftHeader {
  label: string;
  id: keyof ICommissionDraft;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'percentage';
}

const commissionsHeader: ICommissionDraftHeader[] = [
  {
    label: 'Check #',
    align: 'left',
    id: 'checkNumber',
  },
  {
    label: 'Check Amount',
    align: 'right',
    id: 'checkAmount',
    type: 'currency',
  },
  {
    label: 'Pay Period',
    align: 'left',
    id: 'payPeriod',
  },
  {
    label: 'Invoice #',
    align: 'left',
    id: 'invoiceNumber',
  },
  {
    label: 'Invoice Date',
    align: 'center',
    id: 'invoiceDate',
  },
  {
    label: 'Invoice Amount',
    align: 'right',
    id: 'invoiceAmount',
    type: 'currency',
  },
  {
    label: 'Vendor',
    align: 'left',
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
    align: 'right',
    id: 'commissionAmount',
    type: 'currency',
  },
  {
    label: 'Rep Comm Amt.',
    align: 'right',
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
    align: 'left',
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

  const [rows, setRows] = useState(commissions);
  const [filteredRows, setFilteredRows] = useState(commissions);

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
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const addCommission = (commission: ICommissionDraft) => {
    setAddDrawerOpen(false);
    setRows([commission, ...rows]);
    // setCheck(checkToSave.number || '');
  };

  const saveCommission = (commission: ICommissionDraft) => {
    setAddDrawerOpen(false);
    // setCheck(checkToSave.number || '');

    if (rows.some((item) => item.invoiceNumber === commission.invoiceNumber)) {
      let updatedRows = rows.map((item) => (item.invoiceNumber === commission.invoiceNumber ? commission : item));
      setRows(updatedRows);
    } else {
      setRows([commission, ...rows]);
    }
  };

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

  const handleDeleteRow = (row: ICommissionDraft) => {
    const items = rows;

    setRows(items.filter((item) => item !== row));
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between' gap={2} mb={2}>
        <Stack>
          <Typography variant='h4' fontWeight='bold' p={2}>
            Commissions Draft
          </Typography>
          <Stack direction='row' gap={3} alignItems='center'>
            <Button size='large' variant='contained'>
              <Visibility /> View Statement
            </Button>
            <Button color='primary' size='large' variant='outlined'>
              Close Draft
            </Button>

            <IconButton color='inherit' onClick={() => setAddDrawerOpen(true)}>
              <AddRounded />
            </IconButton>

            <CommissionsSpeedDial show actions={[]} />
          </Stack>
        </Stack>
        <Stack direction='row' gap={2} height='fit-content'>
          <HeaderAndValueCard header='Invoice Amount' value={'$' + formatCurrency(invoicesTotal)} />
          <HeaderAndValueCard header='Total Commission' value={'$' + formatCurrency(commissionAmount)} />
          <HeaderAndValueCard header='Rep Commission' value={'$' + formatCurrency(repAmount)} />
        </Stack>
      </Stack>

      <CustomTableContainer
        taskBar={
          <Stack px={1} pb={1} gap={0} position='sticky' top={0} zIndex={2}>
            <Stack direction='row' width={1} gap={2}>
              <CustomInput
                size='small'
                select
                value={payPeriod}
                label='Select Pay Period'
                options={payPeriodOptions}
                onChange={(event) => setPayPeriod(event.target.value as string)}
              />
              <CustomInput
                size='small'
                select
                value={vendor}
                label='Select Vendor'
                options={vendorOptions}
                onChange={(event) => setVendor(event.target.value as string)}
              />
              <CustomInput
                size='small'
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
          <TableHead>
            <TableRow>
              <TableCell>{/* Empty header for delete button */}</TableCell>
              {commissionsHeader.map((header, index) => (
                <TableCell key={index} align={header.align || 'left'}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <CommissionsDraftTableRow
                key={index}
                row={row}
                headers={commissionsHeader}
                handleDeleteRow={handleDeleteRow}
                saveCommission={saveCommission}
              />
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <EditCommissionDraft
        open={addDrawerOpen}
        toggleDrawer={(open: boolean) => setAddDrawerOpen(open)}
        saveCommission={addCommission}
      />
    </>
  );
}
