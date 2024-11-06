import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { IInvoice } from '../../../../data/interfaces/IInvoice';
import { CustomModal } from '../../../shared/CustomModal';

export function EditCommissionDraft(props: IEditCommissionDraftProps) {
  const [formData, setFormData] = useState<IInvoice>(props.commission);

  const closeModal = () => {
    props.closeModal(false);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    props.saveCommission(formData);
    closeModal();
    // TODO updateInvoices in state and db
  };

  return (
    <CustomModal open={props.open} closeModal={closeModal} header='Edit Invoice'>
      <Stack
        gap={2}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSave();
        }}
      >
        <Stack direction='row' gap={2} py={2}>
          <CustomInput
            required
            value={formData.repCommissionPercentage}
            label='Rep Commission Percentage'
            name='repCommissionPercentage'
            onChange={(e) => {
              handleChange(e);
              setFormData((prev) => ({
                ...prev,
                repCommissionAmount: (prev.commissionAmount * Number(e.target.value)) / 100,
              }));
            }}
          />
          <CustomInput
            required
            value={formData.repCommissionAmount}
            label='Commission Amount'
            name='repCommissionsAmount'
            // onChange={handleChange}
            currency
            disabled
          />
          <CustomInput
            select
            options={props.repOptions}
            required
            value={formData.rep}
            label='Rep'
            name='rep'
            onChange={handleChange}
          />
        </Stack>
        <Button onClick={onSave} variant='contained'>
          Confirm
        </Button>
      </Stack>
    </CustomModal>
  );
}

interface IEditCommissionDraftProps {
  open: boolean;
  closeModal: (newOpen: boolean) => void;
  commission: IInvoice;
  saveCommission: (commission: IInvoice) => void;
  repOptions: string[];
}
