import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import { IInvoice } from '../../../../data/interfaces/IInvoice';
import { CustomInput } from '../../../shared/CustomInput';
import { CustomModal } from '../../../shared/CustomModal';

interface IRepCommissions {
  rep: string;
  percentage: string;
}

export function SplitCommissionsModal(props: IProps) {
  const [formData, setFormData] = useState<IRepCommissions[]>([
    { rep: props.commission?.rep || props.repSelected || '', percentage: '100' },
  ]);

  const closeModal = () => {
    props.closeModal(false);
  };

  const handleChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const updatedRepCommissions = [...formData];
    updatedRepCommissions[index] = { ...updatedRepCommissions[index], [name]: value };
    setFormData(updatedRepCommissions);
  };

  const onSave = () => {
    if (props.saveCommission && props.commission) {
      props.saveCommission({
        ...props.commission,
        rep: formData.length > 1 ? 'SPLIT' : props.commission.rep,
      });
    }
    closeModal();
  };

  return (
    <CustomModal open={props.open} closeModal={closeModal} header='split rep commissions'>
      <Stack
        gap={2}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSave();
        }}
      >
        <Stack>
          {formData.map((item, index) => (
            <Stack key={index} direction='row' gap={2}>
              <CustomInput
                select
                options={props.repOptions}
                value={item.rep}
                label='Rep'
                name='rep'
                onChange={(e) => handleChange(e, index)}
                size='small'
              />
              <CustomInput
                value={item.percentage}
                label='Percent'
                name='percentage'
                onChange={(e) => handleChange(e, index)}
                size='small'
                maxWidth='5rem'
              />
            </Stack>
          ))}
        </Stack>
        <Stack alignItems='end'>
          <Button
            onClick={() => setFormData([...formData, { rep: '', percentage: '0' }])}
            variant='contained'
            color='secondary'
          >
            +
          </Button>
        </Stack>
        <Button onClick={onSave} variant='contained'>
          Confirm
        </Button>
      </Stack>
    </CustomModal>
  );
}

interface IProps {
  open: boolean;
  closeModal: (newOpen: boolean) => void;
  commission?: IInvoice;
  saveCommission?: (commission: IInvoice) => void;
  repOptions: string[];
  repSelected?: string;
}
