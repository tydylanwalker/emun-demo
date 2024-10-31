/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddCheck } from './forms/AddCheck';
import { ICheckData } from '../../../interfaces/ICheckData';
import { CustomInput } from '../../shared/CustomInput';
import { UploadFileModal } from './UploadFileModal';
import { UploadCommissionsTable } from './table/UploadCommissionsTable';
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
  const [uploadOpen, setUploadOpen] = useState(false);
  const [mappedFileData, setMappedFileData] = useState<IUploadCommissionsRow[]>([]);
  const invoiceTotals = mappedFileData.reduce(
    (sum, row) => (sum += Object.values(row).some((field) => field.error) ? 0 : row.invoiceAmount.value),
    0
  );
  const checkAmount = 130000;
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
    setMappedFileData(mappedRows);
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
          <UploadCommissionsSpeedDial show={mappedFileData.length > 0} actions={speedDialActions} />
        </Stack>

        {mappedFileData.length > 0 && (
          <Stack direction='row' gap={2}>
            <HeaderAndValueCard header='Check Amount' value={'$' + formatCurrency(checkAmount)} width='18rem' />
            <HeaderAndValueCard header='Invoice Totals' value={'$' + formatCurrency(invoiceTotals)} width='18rem' />
            <HeaderAndValueCard header='Remaining Balance' value={formatCurrency(remainingBalance)} width='18rem' />
          </Stack>
        )}
      </Stack>
      {!mappedFileData?.length ? (
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
          <Button
            sx={{ fontSize: '1.5rem', my: 5 }}
            size='large'
            variant='contained'
            onClick={() => setUploadOpen(true)}
            disabled={!check || !vendor || !payPeriod}
          >
            Upload File
          </Button>
        </>
      ) : (
        <UploadCommissionsTable rows={mappedFileData} headers={uploadCommissionsHeadersMeta} />
      )}
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
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        setMappedFileData={handleSetMappedFileDate}
        emunHeaders={uploadCommissionsHeadersMeta}
      />
    </Stack>
  );
}
