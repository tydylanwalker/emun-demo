import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { IAdjustment } from '../../../../data/interfaces/IAdjustment';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import {
  getAddAdjustmentOpen,
  getVendorSelected,
  setAddAdjustmentOpen,
} from '../../../../store/slices/enterCommissionsSlice';
import { getVendors } from '../../../../store/slices/dataSlice';

export function AddAdjustment() {
  const dispatch = useAppDispatch();
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);
  const vendorSelected = useAppSelector(getVendorSelected);

  const initialData = {
    vendor: vendorSelected,
    adjustmentDate: dayjs(),
    adjustmentAmount: '',
    salesRep: '',
    totalCommission: '',
    repCommission: '',
    agencyCommission: '',
    reasonCode: '',
  };
  const [formData, setFormData] = useState<IAdjustment>(initialData);

  const closeDrawer = () => {
    dispatch(setAddAdjustmentOpen(false));
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
    // TODO add logic to save
    closeDrawer();
  };

  return (
    <Drawer open={useAppSelector(getAddAdjustmentOpen)} onClose={closeDrawer} anchor='right' sx={{ zIndex: 1201 }}>
      <Stack p={2} width='45vw'>
        <Typography variant='h6' borderBottom={1}>
          Invoice Adjustment
        </Typography>
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
          value={formData.adjustmentDate}
          label='Adjustment Date'
          name='adjustmentDate'
          date
          onChange={handleChange}
        />
        <CustomInput
          required
          currency
          value={formData.adjustmentAmount}
          label='Adjust Amount'
          name='adjustAmount'
          onChange={handleChange}
        />
        <CustomInput
          required
          select
          value={formData.salesRep}
          options={[]}
          label='Sales Rep'
          name='salesRep'
          onChange={handleChange}
        />
        <CustomInput
          required
          value={formData.totalCommission}
          label='Total Commission'
          name='totalCommission'
          onChange={handleChange}
        />
        <CustomInput
          required
          value={formData.repCommission}
          label='Rep Commission'
          name='repCommission'
          onChange={handleChange}
        />
        <CustomInput
          required
          value={formData.agencyCommission}
          label='Agency Commission'
          name='agencyCommission'
          onChange={handleChange}
        />
        <CustomInput
          required
          select
          value={formData.reasonCode}
          options={[]}
          label='Reason Code'
          name='reasonCode'
          onChange={handleChange}
        />
        <Button
          onClick={onSave}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          Create Adjustment
        </Button>
      </Stack>
    </Drawer>
  );
}
