import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../shared/CustomInput';
import { CustomModal } from '../../shared/CustomModal';

interface INewTerritory {
  division: string;
  territory: string;
}

const initialData = {
  division: '',
  territory: '',
};

export function AddNewTerritory(props: IAddNewTerritoryProps) {
  const [formData, setFormData] = useState<INewTerritory>(initialData);

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
    <CustomModal open={props.open} closeModal={closeModal} header='Add Territory'>
      <Stack
        gap={2}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSave();
        }}
      >
        <Stack direction='row' gap={2} py={2}>
          <CustomInput required value={formData.division} label='Division' name='division' onChange={handleChange} />
          <CustomInput required value={formData.territory} label='Territory' name='territory' onChange={handleChange} />
        </Stack>
        <Button onClick={onSave} variant='contained'>
          Confirm
        </Button>
      </Stack>
    </CustomModal>
  );
}

interface IAddNewTerritoryProps {
  open: boolean;
  closeModal: (newOpen: boolean) => void;
}
