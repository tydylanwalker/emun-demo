import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { EPayPeriodStatus, IPayPeriod } from '../../../../data/interfaces/IPayPeriod';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import {
  getAddPayPeriodOpen,
  setAddPayPeriodOpen,
  setPayPeriodSelected,
} from '../../../../store/slices/enterCommissionsSlice';
import dayjs from 'dayjs';
import { postThunk } from '../../../../store/thunks/requests/postThunk';
import { ESheets } from '../../../../data/enums/ESheets';

export function AddPayPeriod() {
  const dispatch = useAppDispatch();

  const initialData = {
    payPeriod: '',
    status: EPayPeriodStatus.open,
    startDate: '',
    endDate: '',
  };

  const [formData, setFormData] = useState<IPayPeriod>(initialData);

  const closeDrawer = () => {
    dispatch(setAddPayPeriodOpen(false));
    setFormData(initialData);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async () => {
    const payload = {
      payPeriod: formData.payPeriod,
      status: formData.status,
      startDate: dayjs(formData.startDate).format('MM/DD/YYYY'),
      endDate: dayjs(formData.endDate).format('MM/DD/YYYY'),
    };
    await dispatch(postThunk(payload, ESheets.PayPeriods));
    dispatch(setPayPeriodSelected(payload.payPeriod));
    closeDrawer();
  };

  return (
    <Drawer open={useAppSelector(getAddPayPeriodOpen)} onClose={closeDrawer} anchor='right' sx={{ zIndex: 1201 }}>
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
          name='startDate'
          onChange={handleChange}
        />

        <CustomInput required date value={formData.endDate} label='End Date' name='endDate' onChange={handleChange} />
        <Button
          onClick={onSave}
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
