/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddCheck } from './forms/AddCheck';
import { ICheckData } from '../../../interfaces/ICheckData';
import { CustomInput } from '../../shared/CustomInput';
import { EnterCommissionsTable } from './table/EnterCommissionsTable';
import { createRowWithMatchingRecords } from '../../../functions/createRowWithMatchingRecords';
import { ErrorEnum } from '../../../data/ErrorEnum';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { CommissionsSpeedDial } from '../../shared/CommissionsSpeedDial';
import { AddDirectOrder } from './forms/AddDirectOrder';
import { AddAdjustment } from './forms/AddAdjustment';
import { IDirectOrder } from '../../../interfaces/IDirectOrder';
import { IAdjustment } from '../../../interfaces/IAdjustment';
import { NoteAddRounded, ExposureRounded, CreditCardRounded, GroupRounded } from '@mui/icons-material';
import { ModeButtons } from './actions/ModeButtons';
import { IOrder, orders } from '../../../data/ordersMock';
import { OrdersTable } from '../../orders/OrdersTable';
import dayjs from 'dayjs';
import { checksMock } from '../../../data/checks';
import { AddPayPeriod } from './forms/AddPayPeriod';
import { IPayPeriod } from '../../../interfaces/IPayPeriod';
import CommissionModesToggleButtons from './actions/CommissionModesToggleButtons';
import { UploadFileModal } from './modals/UploadFileModal';
import { IInvoiceValues, SingleEntryModal } from './modals/SingleEntryModal';

export interface IHeaderMeta {
  label: string;
  id: keyof IEnterCommissionsRow;
  type: 'currency' | 'string' | 'date';
  align: 'left' | 'right' | 'center';
  required?: boolean;
  hide?: boolean;
}

const EnterCommissionsHeadersMeta: IHeaderMeta[] = [
  {
    label: 'PO #',
    id: 'poNumber',
    type: 'string',
    align: 'left',
    required: true,
  },
  {
    label: 'Invoice #',
    id: 'invoiceNumber',
    type: 'string',
    align: 'center',
    required: true,
  },
  { label: 'Invoice Date', id: 'invoiceDate', type: 'date', align: 'center' },
  {
    label: 'Invoice $',
    id: 'invoiceAmount',
    type: 'currency',
    align: 'right',
    required: true,
  },
  {
    label: 'Commission $',
    id: 'commissionAmount',
    type: 'currency',
    align: 'right',
    hide: true,
  },
  { label: 'Rep', id: 'rep', type: 'string', align: 'left', hide: true },
  { label: 'Customer ID', id: 'customerId', type: 'string', align: 'left', required: true },
  { label: 'Customer', id: 'customerName', type: 'string', align: 'left' },
  { label: 'Address', id: 'customerAddress', type: 'string', align: 'left' },
  { label: 'City', id: 'customerCity', type: 'string', align: 'left' },
  { label: 'State', id: 'customerState', type: 'string', align: 'left' },
  { label: 'Zip', id: 'customerZip', type: 'string', align: 'left' },
  { label: 'Order Date', id: 'orderDate', type: 'string', align: 'left', hide: true },
  { label: 'Writing Rep', id: 'writingRep', type: 'string', align: 'left', hide: true },
];

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
}

export enum EModes {
  manual = 'Manual Entry',
  view = 'View Commissions',
}

export function EnterCommissions() {
  const vendorOptions = [...new Set(orders.map((order) => order.customerName))];
  const [vendor, setVendor] = useState('');
  const [payPeriodOptions, setPayPeriodOptions] = useState(['JUNE2024', 'JULY2024', 'AUG2024', 'SEPT2024', 'OCT2024']);
  const [payPeriod, setPayPeriod] = useState('');
  const [check, setCheck] = useState('');
  const [checkOptions, setCheckOptions] = useState(
    checksMock.map((check) => `${check.number} - $${formatCurrency(Number(check.checkAmount))}`)
  );
  const [addCheckOpen, setAddCheckOpen] = useState(false);
  const [directOrderOpen, setDirectOrderOpen] = useState(false);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
  const [, setCreditOpen] = useState(false);
  const [, setCustomersOpen] = useState(false);
  const [addPayPeriodOpen, setAddPayPeriodOpen] = useState(false);
  const [mode, setMode] = useState<EModes | null>(null);
  const [uploadFileModal, setUploadFileModal] = useState(false);
  const [commissionRows, setCommissionRows] = useState<IEnterCommissionsRow[]>([]);
  const [singleEntryMatchOrder, setSingleEntryMatchModal] = useState<IOrder | null>(null);
  const [successfulEntry, setSuccessfulEntry] = useState(false);

  const commissionTotals = commissionRows.reduce(
    (sum, row) => (sum += Object.values(row).some((field) => field.error) ? 0 : row.commissionAmount.value),
    0
  );

  // TODO Replace with actual check logic
  const checkAmount = 20507.25;
  const remainingBalance = checkAmount - commissionTotals;

  // Modal Saves
  const saveCheck = (checkToSave: ICheckData) => {
    setAddCheckOpen(false);
    setCheckOptions([...checkOptions, checkToSave.number]);
    setCheck(checkToSave.number || '');
  };
  const savePayPeriod = (payPeriod: IPayPeriod) => {
    setAddPayPeriodOpen(false);
    setPayPeriodOptions([...payPeriodOptions, payPeriod.payPeriod]);
    setPayPeriod(payPeriod.payPeriod || '');
  };
  const saveDirectOrder = (order: IDirectOrder) => {
    console.log(order);
    setDirectOrderOpen(false);
  };
  const saveAdjustment = (adjustment: IAdjustment) => {
    console.log(adjustment);
    setAdjustmentOpen(false);
  };

  const handleCreatingCommissionRows = (data: { [key: string]: any }[] | undefined) => {
    const mappedRows: IEnterCommissionsRow[] =
      data?.map((row) => {
        return createRowWithMatchingRecords(row);
      }) || [];
    setCommissionRows(mappedRows);
  };

  const updateRows = (order: IOrder, rowToUpdate: IEnterCommissionsRow) => {
    const index = commissionRows.findIndex((row) => row === rowToUpdate);

    if (index !== -1) {
      const updatedRows = [...commissionRows];
      updatedRows[index] = {
        ...updatedRows[index],
        poNumber: {
          value: order.poNumber,
        },
        customerId: {
          value: order.customerId,
        },
        customerName: {
          value: order.customerName,
        },
        // customerAddress: {
        //   value: order.shipAddress
        // },
        customerCity: {
          value: order.shipCity,
        },
        customerState: {
          value: order.shipState,
        },
        // customerZip: {
        //   value: order.shipZip
        // },
        orderDate: {
          value: order.orderDate,
        },
        rep: {
          value: order.rep,
        },
        writingRep: {
          value: order.writingRep,
        },
      };
      setCommissionRows(updatedRows);
    }
  };

  const onSingleConfirmMatch = (order: IOrder) => {
    setSingleEntryMatchModal(order);
  };

  const addSingleEntryInvoice = (data: IInvoiceValues) => {
    const newInvoice: IEnterCommissionsRow = {
      poNumber: {
        value: singleEntryMatchOrder?.poNumber || '',
      },
      invoiceNumber: {
        value: data.invoiceNumber || '',
      },
      invoiceAmount: {
        value: Number(data.invoiceAmount),
      },
      invoiceDate: {
        value: dayjs(data.invoiceDate).format('MM/DD/YYYY') || dayjs().format('MM/DD/YYYY'),
      },
      customerId: {
        value: singleEntryMatchOrder?.customerId || '',
      },
      customerName: {
        value: singleEntryMatchOrder?.customerName || '',
      },
      customerAddress: {
        value: '',
      },
      customerCity: {
        value: singleEntryMatchOrder?.shipCity || '',
      },
      customerState: {
        value: singleEntryMatchOrder?.shipState || '',
      },
      customerZip: {
        value: '',
      },
      commissionAmount: {
        value: Number(data.invoiceAmount) * 0.15,
      },
      orderDate: {
        value: singleEntryMatchOrder?.orderDate || '',
      },
      rep: {
        value: singleEntryMatchOrder?.rep || '',
      },
      writingRep: {
        value: singleEntryMatchOrder?.writingRep || '',
      },
    };
    setCommissionRows([newInvoice, ...commissionRows]);
    setSingleEntryMatchModal(null);
    setSuccessfulEntry(true);

    setTimeout(() => {
      setSuccessfulEntry(false);
    }, 2500);
  };

  const speedDialActions = [
    { icon: <NoteAddRounded fontSize='small' />, name: 'Create Direct Order', action: () => setDirectOrderOpen(true) },
    { icon: <ExposureRounded fontSize='small' />, name: 'Adjustment', action: () => setAdjustmentOpen(true) },
    { icon: <CreditCardRounded fontSize='small' />, name: 'Credit', action: () => setCreditOpen(true) },
    { icon: <GroupRounded fontSize='small' />, name: 'Customers', action: () => setCustomersOpen(true) },
  ];

  return (
    // Page Header Stuff
    <Stack height={1}>
      <Stack direction='row' justifyContent='space-between' gap={2} mb={1}>
        <Stack>
          <Typography fontSize='1.75rem' fontWeight='bold'>
            Enter Commissions
          </Typography>
          <Typography variant='subtitle2'>
            {vendor}
            {payPeriod && '  |  ' + payPeriod}
            {check && '  |  ' + check}
          </Typography>
          {mode !== null && (
            <Stack direction='row' gap={3} alignItems='center' position='relative' my={1}>
              <CommissionModesToggleButtons mode={mode} setMode={setMode} />
              <CommissionsSpeedDial show={mode !== null} actions={speedDialActions} />
            </Stack>
          )}
        </Stack>

        <Stack
          direction='row'
          gap={2}
          sx={{ opacity: mode ? 1 : 0, transition: 'opacity 2s ease-in' }}
          height='fit-content'
        >
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
              value={payPeriod}
              label='Select Pay Period'
              options={payPeriodOptions}
              onChange={(event) => setPayPeriod(event.target.value as string)}
              endAction={
                <Button
                  size='small'
                  sx={{ textTransform: 'none', color: 'inherit' }}
                  onClick={() => setAddPayPeriodOpen(true)}
                >
                  add new pay period +
                </Button>
              }
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
              value={check}
              label='Select Check'
              options={checkOptions}
              onChange={(event) => setCheck(event.target.value as string)}
              endAction={
                <Button
                  size='small'
                  sx={{ color: 'inherit', textTransform: 'none' }}
                  onClick={() => setAddCheckOpen(true)}
                >
                  add new check +
                </Button>
              }
            />
          </Stack>
          <ModeButtons
            onUploadFileClick={() => {
              setMode(EModes.view);
              setUploadFileModal(true);
            }}
            onSingleEntryClick={() => setMode(EModes.manual)}
            disabled={!check || !vendor || !payPeriod}
          />
        </>
      ) : (
        <>
          {mode === EModes.view ? (
            <EnterCommissionsTable
              rows={commissionRows}
              headers={EnterCommissionsHeadersMeta}
              onConfirmMatch={updateRows}
              submitRows={() => setCommissionRows([])}
            />
          ) : (
            <>
              <OrdersTable clickable onConfirmMatch={onSingleConfirmMatch} header='Find Order' />
              <Stack direction='row' gap={5} my={1}>
                <Typography fontWeight='bolder'>{commissionRows.length} Current Entries</Typography>
                <Typography
                  fontWeight='bolder'
                  color='success'
                  sx={{
                    opacity: successfulEntry ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                >
                  Invoice Added Successfully!
                </Typography>
              </Stack>
            </>
          )}
        </>
      )}

      {/* Modals */}
      <SingleEntryModal
        open={singleEntryMatchOrder !== null}
        onClose={() => setSingleEntryMatchModal(null)}
        onConfirmClick={addSingleEntryInvoice}
      />
      <AddCheck
        open={addCheckOpen}
        toggleDrawer={(open: boolean) => setAddCheckOpen(open)}
        vendor={vendor}
        vendorOptions={vendorOptions}
        saveCheck={saveCheck}
      />
      <AddPayPeriod
        open={addPayPeriodOpen}
        toggleDrawer={(open: boolean) => setAddPayPeriodOpen(open)}
        savePayPeriod={savePayPeriod}
      />
      <AddDirectOrder
        open={directOrderOpen}
        toggleDrawer={(open: boolean) => setDirectOrderOpen(open)}
        vendor={vendor}
        vendorOptions={vendorOptions}
        saveDirectOrder={saveDirectOrder}
      />
      <AddAdjustment
        open={adjustmentOpen}
        toggleDrawer={(open: boolean) => setAdjustmentOpen(open)}
        vendor={vendor}
        vendorOptions={vendorOptions}
        saveAdjustment={saveAdjustment}
      />
      <UploadFileModal
        open={uploadFileModal}
        onClose={() => setUploadFileModal(false)}
        setMappedFileData={handleCreatingCommissionRows}
        emunHeaders={EnterCommissionsHeadersMeta}
      />
    </Stack>
  );
}
