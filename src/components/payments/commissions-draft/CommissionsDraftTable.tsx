import { useEffect, useState } from 'react';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../../shared/CustomInput';
import { CommissionsDraftTableRow } from './CommissionsDraftTableRow';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { Visibility } from '@mui/icons-material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import {
  getDraftInvoices,
  getInvoices,
  getPayPeriods,
  getVendors,
  setInvoices,
  stateBatchUpdateInvoices,
  stateDeleteInvoice,
  stateUpdateInvoice,
} from '../../../store/slices/dataSlice';
import {
  getPayPeriodSelected,
  getVendorSelected,
  setPayPeriodSelected,
  setVendorSelected,
} from '../../../store/slices/enterCommissionsSlice';
import { IInvoice } from '../../../data/interfaces/IInvoice';
import updateInvoice from '../../../pages/api/updateInvoice';
import { CustomModal } from '../../shared/CustomModal';

export interface ICommissionDraftHeader {
  label: string;
  id: keyof IInvoice;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'percentage';
}

const commissionsHeader: ICommissionDraftHeader[] = [
  {
    label: 'Customer',
    align: 'left',
    id: 'customerName',
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
    label: 'Invoice $',
    align: 'right',
    id: 'invoiceAmount',
    type: 'currency',
  },
  {
    label: 'Vendor',
    align: 'left',
    id: 'vendorName',
  },
  {
    label: 'Commission %',
    align: 'center',
    id: 'commissionPercentage',
    type: 'percentage',
  },
  {
    label: 'Commission $',
    align: 'right',
    id: 'commissionAmount',
    type: 'currency',
  },
  {
    label: 'Rep',
    align: 'left',
    id: 'rep',
  },
  {
    label: 'Rep %',
    align: 'center',
    id: 'repCommissionPercentage',
    type: 'percentage',
  },
  {
    label: 'Rep $.',
    align: 'right',
    id: 'repCommissionAmount',
    type: 'currency',
  },
  {
    label: 'Check #',
    align: 'center',
    id: 'checkNumber',
  },
  // {
  //   label: 'Check $',
  //   align: 'center',
  //   id: 'checkAmount',
  //   type: 'currency',
  // },
  {
    label: 'Pay Period',
    align: 'left',
    id: 'payPeriod',
  },
];

export function CommissionsDraftTable() {
  const dispatch = useAppDispatch();
  const draftInvoices = useAppSelector(getDraftInvoices);
  const [searchText, setSearchText] = useState('');

  const [filteredRows, setFilteredRows] = useState(draftInvoices);

  const vendorSelected = useAppSelector(getVendorSelected);
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);

  const [repSelected, setRepSelected] = useState('');
  const repNames = draftInvoices.map((invoice) => invoice.rep);
  const repOptions = Array.from(new Set(repNames.filter((name) => name.trim() !== '')));

  const payPeriods = useAppSelector(getPayPeriods);
  const payPeriodOptions = payPeriods.map((period) => period.payPeriod);
  const payPeriodSelected = useAppSelector(getPayPeriodSelected);

  const [invoicesTotal, setInvoicesTotal] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [repAmount, setRepAmount] = useState(0);

  const [closeDraftModal, setCloseDraftModal] = useState(false);

  useEffect(() => {
    let filteredRows = [...draftInvoices];
    if (vendorSelected) filteredRows = filteredRows.filter((row) => row.vendorName === vendorSelected);
    if (repSelected) filteredRows = filteredRows.filter((row) => row.rep === repSelected);
    if (payPeriodSelected) filteredRows = filteredRows.filter((row) => row.payPeriod === payPeriodSelected);
    if (searchText !== '')
      filteredRows = filteredRows.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
      );

    setFilteredRows(filteredRows);
  }, [draftInvoices, vendorSelected, repSelected, payPeriodSelected, searchText]);

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

  const saveCommission = (updatedInvoice: IInvoice) => {
    dispatch(stateUpdateInvoice(updatedInvoice));
    // TODO MOVE this to row component
    // TODO update invoice in db
    // TODO could add error handling if match not found
  };

  const handleDeleteRow = (invoiceToDelete: IInvoice) => {
    dispatch(stateDeleteInvoice(invoiceToDelete));
    // TODO MOVE this to row component
    // TODO Delete Row from invoices in db
    // TODO could add error handling if match not found
  };

  const handleConfirmCloseDraft = () => {
    setCloseDraftModal(false);
    dispatch(
      stateBatchUpdateInvoices(
        draftInvoices
          .filter((invoice) => invoice.payPeriod === payPeriodSelected)
          .map((invoice) => {
            return { ...invoice, status: 'Closed' };
          })
      )
    );
    // TODO update invoices in db
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between' gap={2} mb={2}>
        <Stack>
          <Typography variant='h4' fontWeight='bold' p={2}>
            Commissions Draft
          </Typography>
          <Stack direction='row' gap={3} alignItems='center'>
            <Button size='large' variant='contained' disabled={!payPeriodSelected}>
              <Visibility /> View Statement
            </Button>
            <Button
              color='primary'
              size='large'
              variant='outlined'
              onClick={() => setCloseDraftModal(true)}
              disabled={!payPeriodSelected}
            >
              Close Draft
            </Button>
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
        // pagination={{
        //   count: filteredRows.length,
        //   page,
        //   rowsPerPage,
        //   onPageChange: handleChangePage,
        //   onRowsPerPageChange: handleChangeRowsPerPage,
        // }}
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
                repOptions={repOptions}
              />
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <CustomModal
        open={closeDraftModal}
        closeModal={() => setCloseDraftModal(false)}
        header='Confirm Close Commissions'
      >
        <Stack gap={3}>
          <Typography>
            Are you sure you want to close ALL <b>{draftInvoices.length}</b> invoices for <b>{payPeriodSelected}</b> Pay
            Period?{' '}
          </Typography>
          <Stack justifyContent='flex-end' direction='row' gap={2}>
            <Button variant='outlined' onClick={() => setCloseDraftModal(false)}>
              Cancel
            </Button>
            <Button color='error' variant='outlined' onClick={handleConfirmCloseDraft}>
              Confirm Close
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
}
