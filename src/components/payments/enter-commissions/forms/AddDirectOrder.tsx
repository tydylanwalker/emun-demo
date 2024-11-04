import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { IDirectOrder } from '../../../../data/interfaces/IDirectOrder';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { getVendors } from '../../../../store/slices/dataSlice';
import {
  getAddDirectOrderOpen,
  getVendorSelected,
  setAddDirectOrderOpen,
} from '../../../../store/slices/enterCommissionsSlice';

export function AddDirectOrder() {
  const dispatch = useAppDispatch();
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);
  const vendorSelected = useAppSelector(getVendorSelected);

  const initialData = {
    customer: '',
    shipTo: '',
    poNumber: '',
    vendor: vendorSelected,
    invoiceNumber: '',
    invoiceAmount: '',
    invoiceDate: null,
  };

  const [formData, setFormData] = useState<IDirectOrder>(initialData);

  const closeDrawer = () => {
    dispatch(setAddDirectOrderOpen(false));
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
    <Drawer open={useAppSelector(getAddDirectOrderOpen)} onClose={closeDrawer} anchor='right' sx={{ zIndex: 1201 }}>
      <Stack p={2} width='45vw'>
        <Typography variant='h6' borderBottom={1}>
          Create Direct Order
        </Typography>
        <CustomInput
          required
          select
          value={formData.customer}
          options={[]}
          label='Customer'
          name='customer'
          onChange={handleChange}
          endAction={
            <Button
              size='small'
              sx={{ textTransform: 'none', color: 'inherit' }}
              onClick={() => alert('Add new customer form')}
            >
              add new customer +
            </Button>
          }
        />
        <CustomInput
          required
          select
          value={formData.shipTo}
          options={[]}
          label='Ship To'
          name='shipTo'
          onChange={handleChange}
          endAction={
            <Button
              size='small'
              sx={{ textTransform: 'none', color: 'inherit' }}
              onClick={() => alert('Add new ship to form')}
            >
              add new ship to +
            </Button>
          }
        />
        <CustomInput
          required
          select
          value={formData.vendor}
          options={vendorOptions}
          label='Vendor'
          name='vendor'
          onChange={handleChange}
        />
        <CustomInput required value={formData.poNumber} label='PO #' name='poNumber' onChange={handleChange} />
        <CustomInput
          required
          value={formData.invoiceNumber}
          label='Invoice #'
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
          value={formData.invoiceDate}
          label='Invoice Date'
          name='invoiceDate'
          date
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
          Create Order
        </Button>
      </Stack>
    </Drawer>
  );
}
