import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { CustomModal } from '../../../shared/CustomModal';
import { useAppDispatch } from '../../../../hooks/ReduxHooks';
import { addEnterCommissionsRow } from '../../../../store/slices/enterCommissionsSlice';
import { IOrder } from '../../../../data/interfaces/IOrder';
import { IEnterCommissionsRow } from '../EnterCommissions';

export interface IInvoiceValues {
  invoiceNumber: string;
  invoiceAmount: string;
  invoiceDate: dayjs.Dayjs | null;
}

const initialData = {
  invoiceNumber: '',
  invoiceAmount: '',
  invoiceDate: dayjs(),
};

export function SingleEntryModal(props: ISingleEntryModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IInvoiceValues>(initialData);
  const disabled = Object.values(formData).some((value) => value === '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    props.onClose();
    setFormData(initialData);
  };

  const handleConfirm = () => {
    const newInvoice: IEnterCommissionsRow = {
      poNumber: {
        value: props.order?.poNumber || '',
      },
      invoiceNumber: {
        value: formData.invoiceNumber || '',
      },
      invoiceAmount: {
        value: Number(formData.invoiceAmount),
      },
      invoiceDate: {
        value: dayjs(formData.invoiceDate).format('MM/DD/YYYY') || dayjs().format('MM/DD/YYYY'),
      },
      customerId: {
        value: props.order?.customerId || '',
      },
      customerName: {
        value: props.order?.customerName || '',
      },
      customerAddress: {
        value: props.order?.shipAddress || '',
      },
      customerCity: {
        value: props.order?.shipCity || '',
      },
      customerState: {
        value: props.order?.shipState || '',
      },
      customerZip: {
        value: props.order?.shipZip || '',
      },
      commissionAmount: {
        value: Number(formData.invoiceAmount) * 0.15,
      },
      orderDate: {
        value: props.order?.orderDate || '',
      },
      rep: {
        value: props.order?.rep || '',
      },
      writingRep: {
        value: props.order?.writingRep || '',
      },
      checked: {
        value: true,
      },
    };
    dispatch(addEnterCommissionsRow(newInvoice));
    closeModal();
  };

  return (
    <CustomModal open={props.open} closeModal={closeModal} header='Enter Invoice Values'>
      <Stack
        gap={2}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !disabled) handleConfirm();
        }}
      >
        <Stack direction='row' gap={2} py={2}>
          <CustomInput
            required
            value={formData.invoiceNumber}
            label='Invoice Number'
            name='invoiceNumber'
            onChange={handleChange}
          />
          <CustomInput
            required
            value={formData.invoiceAmount}
            label='Invoice Amount'
            name='invoiceAmount'
            currency
            onChange={handleChange}
          />
          <CustomInput
            required
            date
            value={formData.invoiceDate}
            label='Invoice Date'
            name='invoiceDate'
            onChange={handleChange}
          />
        </Stack>
        <Button onClick={handleConfirm} disabled={disabled} variant='contained'>
          Confirm
        </Button>
      </Stack>
    </CustomModal>
  );
}

interface ISingleEntryModalProps {
  order: IOrder | null;
  open: boolean;
  onClose: () => void;
}
