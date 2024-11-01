/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddCheck } from './forms/AddCheck';
import { ICheckData } from '../../../interfaces/ICheckData';
import { CustomInput } from '../../shared/CustomInput';
import { UploadFileModal } from './UploadFileModal';
import { UploadCommissionsTable } from './upload-commissions-table/UploadCommissionsTable';
import { vendorsMock } from '../../../data/vendors';
import { createRowWithMatchingRecords } from '../../../functions/createRowWithMatchingRecords';
import { ErrorEnum } from '../../../data/ErrorEnum';
import { HeaderAndValueCard } from '../../shared/HeaderAndValueCard';
import { formatCurrency } from '../../../functions/formatCurrency';
import { UploadCommissionsSpeedDial } from '../../shared/UploadCommissionsSpeedDial';
import { AddDirectOrder } from './forms/AddDirectOrder';
import { AddAdjustment } from './forms/AddAdjustment';
import { IDirectOrder } from '../../../interfaces/IDirectOrder';
import { IAdjustment } from '../../../interfaces/IAdjustment';
import { NoteAddRounded, ExposureRounded, CreditCardRounded, GroupRounded } from '@mui/icons-material';
import { ModeButtons } from './ModeButtons';
import { IOrder } from '../../../data/ordersMock';
import { OrdersTable } from '../../orders/OrdersTable';
import { IInvoiceValues, SingleEntryModal } from './SingleEntryModal';
import dayjs from 'dayjs';
export interface IHeaderMeta {
  label: string;
  id: keyof IUploadCommissionsRow;
  type: 'currency' | 'string' | 'date';
  align: 'left' | 'right' | 'center';
  required?: boolean;
  hide?: boolean;
}

const uploadCommissionsHeadersMeta: IHeaderMeta[] = [
  {
    label: 'PO Number',
    id: 'poNumber',
    type: 'string',
    align: 'left',
    required: true,
  },
  {
    label: 'Invoice Number',
    id: 'invoiceNumber',
    type: 'string',
    align: 'center',
    required: true,
  },
  {
    label: 'Invoice Amount',
    id: 'invoiceAmount',
    type: 'currency',
    align: 'right',
    required: true,
  },
  { label: 'Invoice Date', id: 'invoiceDate', type: 'date', align: 'center' },
  { label: 'Customer ID', id: 'customerId', type: 'string', align: 'left', required: true },
  { label: 'Customer Name', id: 'customerName', type: 'string', align: 'left' },
  { label: 'Customer Address', id: 'customerAddress', type: 'string', align: 'left' },
  { label: 'City', id: 'customerCity', type: 'string', align: 'left' },
  { label: 'State', id: 'customerState', type: 'string', align: 'left' },
  { label: 'Zip', id: 'customerZip', type: 'string', align: 'left' },
  {
    label: 'Commission Amount',
    id: 'commissionAmount',
    type: 'currency',
    align: 'right',
    hide: true,
  },
  { label: 'Order Date', id: 'orderDate', type: 'string', align: 'left', hide: true },
  { label: 'Rep', id: 'rep', type: 'string', align: 'left', hide: true },
  { label: 'Writing Rep', id: 'writingRep', type: 'string', align: 'left', hide: true },
];

interface IRowObject<T> {
  value: T;
  error?: ErrorEnum;
}

export interface IUploadCommissionsRow {
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

export function UploadCommissions() {
  const vendorOptions = vendorsMock.map((vendor) => vendor.vendorName);
  const [vendor, setVendor] = useState('');
  const [payPeriodOptions, setPayPeriodOptions] = useState(['JUNE2024', 'JULY2024', 'AUG2024', 'SEPT2024', 'OCT2024']);
  const [payPeriod, setPayPeriod] = useState('');
  const [check, setCheck] = useState('');
  const [checkOptions, setCheckOptions] = useState(['001', '002', '003', '004', '005']);
  const [addCheckOpen, setAddCheckOpen] = useState(false);
  const [directOrderOpen, setDirectOrderOpen] = useState(false);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [customersOpen, setCustomersOpen] = useState(false);
  const [addPayPeriodOpen, setAddPayPeriodOpen] = useState(false);
  const [mode, setMode] = useState<'normal' | 'single' | null>(null);
  const [uploadFileModal, setUploadFileModal] = useState(false);
  const [commissionRows, setCommissionRows] = useState<IUploadCommissionsRow[]>([]);
  const [singleEntryMatchOrder, setSingleEntryMatchModal] = useState<IOrder | null>(null);
  const [successfulEntry, setSuccessfulEntry] = useState(false);

  const invoiceTotals = commissionRows.reduce(
    (sum, row) => (sum += Object.values(row).some((field) => field.error) ? 0 : row.invoiceAmount.value),
    0
  );
  const checkAmount = 137000;
  const remainingBalance = checkAmount - invoiceTotals;

  const saveCheck = (checkToSave: ICheckData) => {
    setAddCheckOpen(false);
    setCheckOptions([...checkOptions, checkToSave.number]);
    setCheck(checkToSave.number || '');
  };
  const savePayPeriod = (payPeriod: string) => {
    setAddPayPeriodOpen(false);
    setPayPeriodOptions([...payPeriodOptions, payPeriod]);
    setPayPeriod(payPeriod || '');
  };
  const saveDirectOrder = (order: IDirectOrder) => {
    setDirectOrderOpen(false);
  };
  const saveAdjustment = (adjustment: IAdjustment) => {
    setAdjustmentOpen(false);
  };

  // TODO: Replace these with the actually data structure we need
  const handleSetMappedFileDate = (data: { [key: string]: any }[] | undefined) => {
    const mappedRows: IUploadCommissionsRow[] =
      data?.map((row) => {
        return createRowWithMatchingRecords(row);
      }) || [];
    setCommissionRows(mappedRows);
  };

  const updateRows = (order: IOrder, rowToUpdate: IUploadCommissionsRow) => {
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
    console.log('order', singleEntryMatchOrder);
    const newInvoice: IUploadCommissionsRow = {
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
    { icon: <NoteAddRounded fontSize='large' />, name: 'Create Direct Order', action: () => setDirectOrderOpen(true) },
    { icon: <ExposureRounded fontSize='large' />, name: 'Adjustment', action: () => setAdjustmentOpen(true) },
    { icon: <CreditCardRounded fontSize='large' />, name: 'Credit', action: () => setCreditOpen(true) },
    { icon: <GroupRounded fontSize='large' />, name: 'Customers', action: () => setCustomersOpen(true) },
  ];

  return (
    <Stack gap={1} height={1}>
      <Stack direction='row' justifyContent='space-between' mb={3}>
        <Stack>
          <Typography fontSize='1.75rem' fontWeight='bold'>
            Upload Commissions
          </Typography>
          <Typography variant='subtitle1' fontSize='1.2rem'>
            {vendor}
            {payPeriod && '  |  ' + payPeriod}
            {check && '  |  ' + check}
          </Typography>
          <UploadCommissionsSpeedDial show={commissionRows.length > 0} actions={speedDialActions} />
        </Stack>

        {mode !== null && (
          <Stack direction='row' gap={2}>
            <HeaderAndValueCard header='Check Amount' value={'$' + formatCurrency(checkAmount)} width='18rem' />
            <HeaderAndValueCard header='Invoice Totals' value={'$' + formatCurrency(invoiceTotals)} width='18rem' />
            <HeaderAndValueCard
              header='Remaining Balance'
              value={'$' + formatCurrency(remainingBalance)}
              width='18rem'
              color={remainingBalance !== 0 ? 'error' : 'inherit'}
            />
          </Stack>
        )}
      </Stack>
      {!commissionRows?.length && (
        <>
          <Stack direction='row' gap={2} mb={3}>
            <CustomInput
              select
              value={vendor}
              label='Select Vendor'
              options={vendorOptions}
              onChange={(event) => setVendor(event.target.value as string)}
            />
            <CustomInput
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
        </>
      )}
      <ModeButtons
        onUploadFileClick={() => {
          setMode('normal');
          setUploadFileModal(true);
        }}
        onSingleEntryClick={() => setMode(mode === 'single' ? 'normal' : 'single')}
        mode={mode}
        disabled={!check || !vendor || !payPeriod}
        fontSize={mode === null ? '1.25' : 'inherit'}
        size={mode === null ? 'large' : 'small'}
        fullWidth={mode === null}
      />
      {mode === 'normal' && (
        <UploadCommissionsTable
          rows={commissionRows}
          headers={uploadCommissionsHeadersMeta}
          onConfirmMatch={updateRows}
          submitRows={() => setCommissionRows([])}
        />
      )}
      {mode === 'single' && (
        <>
          <OrdersTable clickable onConfirmMatch={onSingleConfirmMatch} />
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
        setMappedFileData={handleSetMappedFileDate}
        emunHeaders={uploadCommissionsHeadersMeta}
      />
    </Stack>
  );
}
