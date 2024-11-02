import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { CustomModal } from '../../../shared/CustomModal';

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
    props.onConfirmClick(formData);
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
  open: boolean;
  onClose: () => void;
  onConfirmClick: (data: IInvoiceValues) => void;
}
