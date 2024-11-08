import { useEffect, useState } from 'react';
import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CommissionsDraftTableRow } from './CommissionsDraftTableRow';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { Visibility } from '@mui/icons-material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getDraftInvoices } from '../../../store/slices/dataSlice';
import { IInvoice } from '../../../data/interfaces/IInvoice';
import { CustomModal } from '../../shared/CustomModal';
import { ESheets } from '../../../data/enums/ESheets';
import { updateThunk } from '../../../store/thunks/requests/updateThunk';
import { deleteThunk } from '../../../store/thunks/requests/deleteThunk';
import { commissionsHeader } from './headers';
import {
  getCheckSelected,
  getPayPeriodSelected,
  getRepSelected,
  getSearchText,
  getVendorSelected,
} from '../../../store/slices/commissionDraftSlice';
import { CommissionDraftTaskBar, getRepOptions } from './CommissionDraftTaskBar';
import { showTransition } from '../../../functions/showTransition';

export function CommissionsDraftTable() {
  const dispatch = useAppDispatch();

  // * Rows
  const draftInvoices = useAppSelector(getDraftInvoices);
  const [filteredRows, setFilteredRows] = useState<IInvoice[]>([]);

  // * Task Bar values
  const vendorSelected = useAppSelector(getVendorSelected);
  const payPeriodSelected = useAppSelector(getPayPeriodSelected);
  const checkSelected = useAppSelector(getCheckSelected);
  const repSelected = useAppSelector(getRepSelected);
  const searchText = useAppSelector(getSearchText);

  // * Widgets
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [repAmount, setRepAmount] = useState(0);

  // * Modals
  const [closeDraftModal, setCloseDraftModal] = useState(false);

  /**
   * Filter the commission draft rows
   */
  useEffect(() => {
    if (!payPeriodSelected) {
      setFilteredRows([]); // Pay period must be selected to see draft
      return;
    }
    let filteredRows = [...draftInvoices];
    filteredRows = filteredRows.filter((row) => row.payPeriod === payPeriodSelected.payPeriod);
    if (vendorSelected) filteredRows = filteredRows.filter((row) => row.vendorName === vendorSelected.VendorName);
    if (repSelected) filteredRows = filteredRows.filter((row) => row.rep === repSelected);
    if (checkSelected)
      filteredRows = filteredRows.filter(
        (row) => row.checkNumber === checkSelected.number && row.checkAmount === checkSelected.checkAmount
      );
    if (searchText !== '')
      filteredRows = filteredRows.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
      );

    setFilteredRows(filteredRows);
  }, [draftInvoices, vendorSelected, repSelected, payPeriodSelected, checkSelected, searchText]);

  /**
   *  Sets the widget values
   */
  useEffect(() => {
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

  const saveCommission = async (invoiceToUpdate: IInvoice) => {
    await dispatch(updateThunk(invoiceToUpdate, ESheets.Invoices));
  };

  const handleDeleteRow = async (invoiceToDelete: IInvoice) => {
    await dispatch(deleteThunk(invoiceToDelete, ESheets.Invoices));
  };

  const handleConfirmCloseDraft = async () => {
    const updatedInvoices = draftInvoices
      .filter((invoice) => invoice.payPeriod === payPeriodSelected?.payPeriod)
      .map((invoice) => {
        return { ...invoice, status: 'Closed' };
      });
    await dispatch(updateThunk(updatedInvoices, ESheets.Invoices));
    setCloseDraftModal(false);
  };

  const checkBalance = checkSelected ? checkSelected.checkAmount - commissionAmount : null;

  return (
    <>
      <Stack direction='row' justifyContent='space-between' gap={2} mb={2}>
        <Stack>
          <Typography variant='h4' fontWeight='bold'>
            Commissions Draft
          </Typography>
          <Stack direction='row' gap={3} alignItems='center' mt={1}>
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
          <Box sx={showTransition(!!checkBalance)}>
            <HeaderAndValueCard
              header='Check Balance'
              value={'$' + formatCurrency(checkBalance || -9999)}
              color={checkBalance !== 0 ? 'error.main' : 'inherit'}
            />
          </Box>

          <HeaderAndValueCard header='Total Commission' value={'$' + formatCurrency(commissionAmount)} />
          <HeaderAndValueCard header='Rep Commission' value={'$' + formatCurrency(repAmount)} />
        </Stack>
      </Stack>
      <CustomTableContainer taskBar={<CommissionDraftTaskBar rows={filteredRows} />}>
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
                repOptions={getRepOptions(filteredRows)}
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
            Are you sure you want to close ALL <b>{draftInvoices.length}</b> invoices for{' '}
            <b>{payPeriodSelected?.payPeriod}</b> Pay Period?{' '}
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
