import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../shared/CustomInput';
import { EnterCommissionsTable } from './table/EnterCommissionsTable';
import { ErrorEnum } from '../../../data/enums/ErrorEnum';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { ModeButtons } from './actions/ModeButtons';
import { IOrder } from '../../../data/interfaces/IOrder';
import { OrdersTable } from '../../orders/OrdersTable';
import { UploadFileModal } from './modals/UploadFileModal';
import { SingleEntryModal } from './modals/SingleEntryModal';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getChecks, getPayPeriods, getVendors } from '../../../store/slices/dataSlice';
import {
  getCheckSelected,
  getEnterCommissionsRows,
  getPayPeriodSelected,
  getVendorSelected,
  setAddCheckOpen,
  setAddPayPeriodOpen,
  setCheckSelected,
  setPayPeriodSelected,
  setUploadFileOpen,
  setVendorSelected,
} from '../../../store/slices/enterCommissionsSlice';
import { checkDisplayValue } from '../../../functions/checkDisplayValue';
interface IRowObject<T> {
  value: T;
  error?: ErrorEnum;
}

export interface IEnterCommissionsRow {
  poNumber: IRowObject<string>;
  invoiceNumber: IRowObject<string>;
  invoiceAmount: IRowObject<number>;
  invoiceDate: IRowObject<string>;
  customerId: IRowObject<string>;
  customerName: IRowObject<string>;
  customerAddress: IRowObject<string>;
  customerCity: IRowObject<string>;
  customerState: IRowObject<string>;
  customerZip: IRowObject<string>;
  commissionAmount: IRowObject<number>;
  orderDate: IRowObject<string>;
  rep: IRowObject<string>;
  writingRep: IRowObject<string>;
  checked: IRowObject<boolean>;
}

export enum EEnterCommissionModes {
  manual = 'Manual Entry',
  view = 'View Commissions',
}

export function EnterCommissions() {
  const dispatch = useAppDispatch();

  const commissionRows = useAppSelector(getEnterCommissionsRows);

  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);
  const vendorSelected = useAppSelector(getVendorSelected);

  const payPeriods = useAppSelector(getPayPeriods);
  const payPeriodOptions = payPeriods.map((period) => period.payPeriod).reverse();
  const payPeriodSelected = useAppSelector(getPayPeriodSelected);

  const checks = useAppSelector(getChecks);
  const checkOptions = checks
    .filter((check) => check.payPeriod === payPeriodSelected && check.vendor === vendorSelected)
    .map(checkDisplayValue)
    .reverse();
  const checkSelected = useAppSelector(getCheckSelected);

  const [singleEntryMatchOrder, setSingleEntryMatchOrder] = useState<IOrder | null>(null);
  const [successfulEntry, setSuccessfulEntry] = useState(false);

  // Determines which view "mode" we are in on the page, Setup(null), Manual Entry, View Commissions
  const [mode, setMode] = useState<EEnterCommissionModes | null>(null);

  const commissionTotals = commissionRows.reduce(
    (sum, row) => (sum += Object.values(row).some((field) => field.error) ? 0 : row.commissionAmount.value),
    0
  );
  const checkAmount = checks.find((check) => checkDisplayValue(check) === checkSelected)?.checkAmount || 0;
  const remainingBalance = checkAmount - commissionTotals;

  const onSingleEntryModalClose = () => {
    setSingleEntryMatchOrder(null);
    setSuccessfulEntry(true);

    setTimeout(() => {
      setSuccessfulEntry(false);
    }, 2500);
  };

  const showTransition = (show: boolean) => ({ opacity: show ? 1 : 0, transition: 'opacity 1s ease-in' });

  // /**
  //  * Whenever all 3 dropdown values are selected and or changed we find any existing (not posted) commission rows and then populate the table if there are any
  //  */
  // useEffect(() => {
  //   if (vendorSelected && checkSelected && payPeriodSelected) {
  //     const existingCommissionRows = invoices.filter(
  //       (invoice) => vendorSelected === invoice.vendorName && payPeriodSelected === invoice.payPeriod && !invoice.posted
  //     );
  //     if (existingCommissionRows.length > 0) {
  //       dispatch(createEnterCommissionsRowsFromValues(existingCommissionRows));
  //       setMode(EEnterCommissionModes.view);
  //     }
  //   }
  // }, [checkSelected, dispatch, invoices, payPeriodSelected, vendorSelected]);

  return (
    <Stack height={1}>
      {/* Page Header and Selected Values */}
      <Stack direction='row' justifyContent='space-between' gap={2} mb={1}>
        <Stack>
          <Typography fontSize='1.75rem' fontWeight='bold'>
            Enter Commissions
          </Typography>
          <Typography variant='subtitle2'>
            {vendorSelected}
            {payPeriodSelected && '  |  ' + payPeriodSelected}
            {checkSelected && '  |  ' + checkSelected}
          </Typography>
          <Stack direction='row' gap={3} alignItems='center' position='relative' my={1} sx={showTransition(!!mode)}>
            <ToggleButtonGroup
              color='primary'
              value={mode}
              exclusive
              onChange={(_, value) => setMode(value)}
              size='small'
              sx={{ whiteSpace: 'nowrap' }}
            >
              <ToggleButton value={EEnterCommissionModes.manual}>{EEnterCommissionModes.manual}</ToggleButton>
              <ToggleButton value={EEnterCommissionModes.view}>{EEnterCommissionModes.view}</ToggleButton>
            </ToggleButtonGroup>
            <CommissionsSpeedDial />
          </Stack>
        </Stack>

        {/* Top Cards showing dollar amounts of check, commissions and remaining balance */}
        <Stack direction='row' gap={2} sx={showTransition(!!mode)} height='fit-content'>
          <HeaderAndValueCard header='Check Amount' value={'$' + formatCurrency(checkAmount)} />
          <HeaderAndValueCard header='Commission Totals' value={'$' + formatCurrency(commissionTotals)} />
          <HeaderAndValueCard
            header='Remaining Balance'
            value={'$' + formatCurrency(remainingBalance)}
            color={remainingBalance !== 0 ? 'error' : 'inherit'}
          />
        </Stack>
      </Stack>

      {/* Content Rendered based on what mode we are in */}
      {mode === null ? (
        <>
          <Stack direction='row' gap={2} mb={1}>
            <CustomInput
              size='small'
              select
              value={payPeriodSelected}
              label='Select Pay Period'
              options={payPeriodOptions}
              onChange={(event) => dispatch(setPayPeriodSelected(event.target.value as string))}
              endAction={
                <Button
                  size='small'
                  sx={{ textTransform: 'none', color: 'inherit' }}
                  onClick={() => dispatch(setAddPayPeriodOpen(true))}
                >
                  add new pay period +
                </Button>
              }
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
              value={checkSelected}
              label='Select Check'
              options={checkOptions}
              onChange={(event) => dispatch(setCheckSelected(event.target.value as string))}
              endAction={
                <Button
                  size='small'
                  sx={{ color: 'inherit', textTransform: 'none' }}
                  onClick={() => dispatch(setAddCheckOpen(true))}
                >
                  add new check +
                </Button>
              }
            />
          </Stack>
          <ModeButtons
            onUploadFileClick={() => {
              setMode(EEnterCommissionModes.view);
              dispatch(setUploadFileOpen(true));
            }}
            onSingleEntryClick={() => setMode(EEnterCommissionModes.manual)}
            disabled={!checkSelected || !vendorSelected || !payPeriodSelected}
          />
        </>
      ) : (
        <>
          {mode === EEnterCommissionModes.view ? (
            <EnterCommissionsTable />
          ) : (
            <>
              <OrdersTable
                clickable
                onConfirmMatch={(order) => setSingleEntryMatchOrder(order || null)}
                header='Find Order'
              />
              <Stack direction='row' gap={5} my={1}>
                <Typography fontWeight='bolder'>{commissionRows.length} Current Entries</Typography>
                <Typography fontWeight='bolder' color='success' sx={showTransition(successfulEntry)}>
                  Invoice Added Successfully!
                </Typography>
              </Stack>
            </>
          )}
        </>
      )}

      {/* Modals */}
      <UploadFileModal />
      <SingleEntryModal
        order={singleEntryMatchOrder}
        open={singleEntryMatchOrder !== null}
        onClose={onSingleEntryModalClose}
      />
    </Stack>
  );
}
