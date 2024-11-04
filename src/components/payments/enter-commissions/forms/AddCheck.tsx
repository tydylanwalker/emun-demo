import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { CustomInput } from '../../../shared/CustomInput';
import { ECheckStatus } from '../../../../data/enums/ECheckStatus';
import { ICheck } from '../../../../data/interfaces/ICheck';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { addCheck, getVendors } from '../../../../store/slices/dataSlice';
import {
  getAddCheckOpen,
  getVendorSelected,
  setAddCheckOpen,
  setCheckSelected,
} from '../../../../store/slices/enterCommissionsSlice';
import { postCheck } from '../../../../data/requests/checks/postCheck';
import { checkDisplayValue } from '../../../../functions/checkDisplayValue';

export function AddCheck() {
  const dispatch = useAppDispatch();
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);
  const vendorSelected = useAppSelector(getVendorSelected);

  const initialData = {
    vendor: vendorSelected,
    payPeriod: '',
    number: '',
    checkAmount: 0,
    status: ECheckStatus.Open,
    receivedDate: '',
    payDate: dayjs().format('MM/DD/YYYY'),
    additionalDetails: '',
  };
  const [formData, setFormData] = useState<ICheck>(initialData);

  const closeDrawer = () => {
    dispatch(setAddCheckOpen(false));
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
    const payload = {
      vendor: formData.vendor,
      payPeriod: formData.payPeriod,
      number: formData.number,
      checkAmount: formData.checkAmount,
      status: formData.status,
      additionalDetails: formData.additionalDetails,
      receivedDate: dayjs(formData.receivedDate).format('MM/DD/YYYY'),
      payDate: dayjs(formData.payDate).format('MM/DD/YYYY'),
    };
    postCheck(payload);
    dispatch(addCheck(payload));
    dispatch(setCheckSelected(checkDisplayValue(payload)));
    closeDrawer();
  };

  return (
    <Drawer open={useAppSelector(getAddCheckOpen)} onClose={closeDrawer} anchor='right' sx={{ zIndex: 1201 }}>
      <Stack p={2} width='45vw'>
        <Typography variant='h6' borderBottom={1}>
          Add a New Check
        </Typography>
        <Box display='flex' gap={2}>
          <CustomInput
            required
            select
            value={formData.vendor}
            options={vendorOptions}
            label='Vendor'
            name='vendor'
            onChange={handleChange}
          />
          <CustomInput
            required
            value={formData.payPeriod}
            label='Pay Period'
            name='payPeriod'
            onChange={handleChange}
          />
        </Box>
        <Box display='flex' gap={2}>
          <CustomInput required value={formData.number} label='Check Number' name='number' onChange={handleChange} />
          <CustomInput
            required
            currency
            value={formData.checkAmount}
            label='Check Amount'
            name='checkAmount'
            onChange={handleChange}
            maxWidth='12.5rem'
          />
          <CustomInput
            required
            select
            value={formData.status}
            label='Status'
            name='status'
            options={Object.values(ECheckStatus)}
            onChange={handleChange}
            maxWidth='10rem'
          />
        </Box>
        <Box display='flex' gap={2}>
          <CustomInput
            required
            date
            value={formData.receivedDate}
            label='Received Date'
            name='receivedDate'
            onChange={handleChange}
          />
          <CustomInput required date value={formData.payDate} label='Pay Date' name='payDate' onChange={handleChange} />
        </Box>
        <CustomInput
          value={formData.additionalDetails}
          label='Additional Details'
          name='additionalDetails'
          onChange={handleChange}
          multiline
        />
        <Button
          onClick={onSave}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          Save Check
        </Button>
      </Stack>
    </Drawer>
  );
}
