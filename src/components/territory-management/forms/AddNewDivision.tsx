import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../shared/CustomInput';
import { CustomModal } from '../../shared/CustomModal';

interface INewDivision {
  division: string;
  rep: string;
  repGroup: string;
}

const initialData = {
  division: '',
  rep: '',
  repGroup: '',
};

export function AddNewDivision(props: IAddNewDivisionProps) {
  const [formData, setFormData] = useState<INewDivision>(initialData);

  const closeModal = () => {
    props.closeModal(false);
    setFormData(initialData);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    // props.save(formData);
    closeModal();
    // TODO add in state and db
  };

  return (
    <CustomModal open={props.open} closeModal={closeModal} header='Add Division'>
      <Stack
        gap={2}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSave();
        }}
      >
        <Stack direction='row' gap={2} py={2}>
          <CustomInput
            required
            value={formData.division}
            label='Division Name'
            name='division'
            onChange={handleChange}
          />
          <CustomInput required value={formData.rep} label='Rep' name='rep' onChange={handleChange} />
          <CustomInput required value={formData.repGroup} label='Rep Group' name='repGroup' onChange={handleChange} />
        </Stack>
        <Button onClick={onSave} variant='contained'>
          Confirm
        </Button>
      </Stack>
    </CustomModal>
  );
}

interface IAddNewDivisionProps {
  open: boolean;
  closeModal: (newOpen: boolean) => void;
}
