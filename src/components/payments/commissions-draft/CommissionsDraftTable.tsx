import { useEffect, useState } from 'react';
import { Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../../shared/CustomInput';
import { ICommissionDraft, commissions } from '../../../data/mock/commissions';
import { CommissionsDraftTableRow } from './CommissionsDraftTableRow';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { AddRounded, Visibility } from '@mui/icons-material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { EditCommissionDraft } from './forms/EditCommissionDraft';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getPayPeriods, getVendors } from '../../../store/slices/dataSlice';
import {
  getPayPeriodSelected,
  getVendorSelected,
  setPayPeriodSelected,
  setVendorSelected,
} from '../../../store/slices/enterCommissionsSlice';

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
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  const [rows, setRows] = useState(commissions);
  const [filteredRows, setFilteredRows] = useState(commissions);

  const vendorSelected = useAppSelector(getVendorSelected);
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);

  const [repSelected, setRepSelected] = useState('');
  const repNames = commissions.map((commission) => commission.rep);
  const repOptions = Array.from(new Set(repNames.filter((name) => name.trim() !== '')));

  const payPeriods = useAppSelector(getPayPeriods);
  const payPeriodOptions = payPeriods.map((period) => period.payPeriod);
  const payPeriodSelected = useAppSelector(getPayPeriodSelected);

  const [invoicesTotal, setInvoicesTotal] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [repAmount, setRepAmount] = useState(0);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const addCommission = (commission: ICommissionDraft) => {
    setAddDrawerOpen(false);
    setRows([commission, ...rows]);
    // setCheck(checkToSave.number || '');
  };

  const saveCommission = (commission: ICommissionDraft) => {
    setAddDrawerOpen(false);
    // setCheck(checkToSave.number || '');

    if (rows.some((item) => item.invoiceNumber === commission.invoiceNumber)) {
      const updatedRows = rows.map((item) => (item.invoiceNumber === commission.invoiceNumber ? commission : item));
      setRows(updatedRows);
    } else {
      setRows([commission, ...rows]);
    }
  };

  useEffect(() => {
    setPage(0);
    let filteredRows = rows;
    if (vendorSelected) {
      filteredRows = filteredRows.filter((commission) => commission.vendor == vendorSelected);
    }

    if (repSelected) {
      filteredRows = filteredRows.filter((commission) => commission.rep == repSelected);
    }

    if (payPeriodSelected) {
      filteredRows = filteredRows.filter((commission) => commission.payPeriod == payPeriodSelected);
    }

    if (searchText !== '') {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    setFilteredRows(filteredRows);
  }, [rows, vendorSelected, repSelected, payPeriodSelected, searchText]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

            {/* <IconButton color='inherit' onClick={() => setAddDrawerOpen(true)}>
              <AddRounded />
            </IconButton> */}

            <CommissionsSpeedDial />
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
                value={payPeriodSelected}
                label='Select Pay Period'
                options={payPeriodOptions}
                onChange={(event) => dispatch(setPayPeriodSelected(event.target.value as string))}
              />
              <CustomInput
                size='small'
                select
                value={vendorSelected}
                label='Select Vendor'
                options={vendorOptions}
                onChange={(event) => dispatch(setVendorSelected(event.target.value as string))}
              />
              <CustomInput
                size='small'
                select
                value={repSelected}
                label='Select Rep'
                options={repOptions}
                onChange={(event) => setRepSelected(event.target.value as string)}
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
              <TableCell>{/* Empty header for delete button */}</TableCell>
              {commissionsHeader.map((header, index) => (
                <TableCell key={index} align={header.align || 'left'}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
