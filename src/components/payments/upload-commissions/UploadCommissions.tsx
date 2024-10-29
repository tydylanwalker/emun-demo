/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddCheck } from './AddCheck';
import { ICheckData } from '../../../interfaces/ICheckData';
import { CustomInput } from '../../shared/CustomInput';
import { UploadFileModal } from './UploadFileModal';
import { UploadCommissionsTable } from './table/UploadCommissionsTable';
import { vendorsMock } from '../../../data/vendors';
import { createRowWithMatchingRecords } from '../../../functions/createRowWithMatchingRecords';

export interface IHeaderMeta {
  label: string;
  id: keyof IUploadCommissionsRow;
  type: 'currency' | 'string' | 'date';
  align: 'left' | 'right' | 'center';
  required?: boolean;
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
    align: 'left',
    required: true,
  },
  {
    label: 'Invoice Amount',
    id: 'invoiceAmount',
    type: 'currency',
    align: 'right',
    required: true,
  },
  { label: 'Customer ID', id: 'customerId', type: 'string', align: 'left' },
  { label: 'Customer Name', id: 'customerName', type: 'string', align: 'left' },
  { label: 'Address', id: 'address', type: 'string', align: 'left' },
  {
    label: 'Commission',
    id: 'commissionPercent',
    type: 'string',
    align: 'right',
  },
  { label: 'Invoice Date', id: 'invoiceDate', type: 'date', align: 'center' },
  { label: 'Order Number', id: 'orderNumber', type: 'string', align: 'left' },
];

interface IErrorObject {
  errorText: string;
  function: () => void;
}

export interface IUploadCommissionsRow {
  poNumber: { value: string; error?: IErrorObject | null };
  invoiceNumber: { value: string; error?: IErrorObject | null };
  invoiceAmount: { value: string; error?: IErrorObject | null };
  customerId: { value: string; error?: IErrorObject | null };
  customerName: { value: string; error?: IErrorObject | null };
  address: { value: string; error?: IErrorObject | null };
  commissionPercent: { value: string; error?: IErrorObject | null };
  invoiceDate: { value: string; error?: IErrorObject | null };
  orderNumber: { value: string; error?: IErrorObject | null };
  writingRep: { value: string; error?: IErrorObject | null };
  currentRep: { value: string; error?: IErrorObject | null };
}

export function UploadCommissions() {
  const vendorOptions = vendorsMock.map((vendor) => vendor.vendorName);
  const [vendor, setVendor] = useState('');
  const [check, setCheck] = useState('');
  const [checkOptions, setCheckOptions] = useState(['SEPT2024']);
  const [addNewCheck, setAddNewCheck] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [mappedFileData, setMappedFileData] = useState<IUploadCommissionsRow[]>([]);

  const saveCheck = (checkToSave: ICheckData) => {
    setAddNewCheck(false);
    setCheckOptions([...checkOptions, checkToSave.payPeriod]);
    setCheck(checkToSave.payPeriod || '');
  };

  // TODO: Replace these with the actually data structure we need
  const handleSetMappedFileDate = (data: { [key: string]: any }[] | undefined) => {
    const mappedRows: IUploadCommissionsRow[] =
      data?.map((row) => {
        return createRowWithMatchingRecords(row);
      }) || [];
    setMappedFileData(mappedRows);
  };

  return (
    <Stack gap={1}>
      <Typography variant='h6'>{`Upload Commissions ${vendor && 'for ' + vendor}${check && ' | ' + check}`}</Typography>
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
          value={check}
          label='Select Check'
          options={checkOptions}
          onChange={(event) => setCheck(event.target.value as string)}
          endAction={
            <Button size='small' sx={{ color: 'grey', textTransform: 'none' }} onClick={() => setAddNewCheck(true)}>
              add new check +
            </Button>
          }
        />
      </Stack>
      {!mappedFileData?.length ? (
        <Button variant='contained' onClick={() => setUploadOpen(true)}>
          Upload File
        </Button>
      ) : (
        <UploadCommissionsTable rows={mappedFileData} headers={uploadCommissionsHeadersMeta} />
      )}
      <AddCheck
        open={addNewCheck}
        toggleDrawer={(open: boolean) => setAddNewCheck(open)}
        vendor={vendor}
        vendorOptions={vendorOptions}
        saveCheck={saveCheck}
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
