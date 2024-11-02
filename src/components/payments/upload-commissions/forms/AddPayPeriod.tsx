import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { EPayPeriodStatus, IPayPeriod } from '../../../../interfaces/IPayPeriod';

export function AddPayPeriod(props: IAddPayPeriodProps) {
  const initialData = {
    payPeriod: '',
    status: EPayPeriodStatus.open,
    startDate: null,
    endDate: null,
  };

  const [formData, setFormData] = useState<IPayPeriod>(initialData);

  const closeDrawer = () => {
    props.toggleDrawer(false);
    setFormData(initialData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Drawer open={props.open} onClose={closeDrawer} anchor='right' sx={{ zIndex: 1201 }}>
      <Stack p={2} width='45vw'>
        <Typography variant='h6' borderBottom={1}>
          Add a New Pay Period
        </Typography>

        <CustomInput required value={formData.payPeriod} label='Pay Period' name='payPeriod' onChange={handleChange} />
        <CustomInput
          required
          select
          value={formData.status}
          options={Object.values(EPayPeriodStatus)}
          label='Status'
          name='status'
          onChange={handleChange}
        />
        <CustomInput
          required
          date
          value={formData.startDate}
          label='Start Date'
          datatype='startDate'
          onChange={handleChange}
        />

        <CustomInput
          required
          date
          value={formData.endDate}
          label='End Date'
          datatype='endDate'
          onChange={handleChange}
        />
        <Button
          onClick={() => props.savePayPeriod(formData)}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          Save
        </Button>
      </Stack>
    </Drawer>
  );
}

interface IAddPayPeriodProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  savePayPeriod: (payPeriod: IPayPeriod) => void;
}
