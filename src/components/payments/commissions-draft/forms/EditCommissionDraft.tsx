import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { getVendors } from '../../../../store/slices/dataSlice';
import { IInvoice } from '../../../../data/interfaces/IInvoice';

export function EditCommissionDraft(props: IEditCommissionDraftProps) {
  const initialData = {
    poNumber: '',
    orderDate: '',
    invoiceNumber: '',
    invoiceAmount: 0,
    invoiceDate: '',
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerCity: '',
    customerState: '',
    customerZip: '',
    vendorName: '',
    commissionPercentage: 15,
    commissionAmount: 0,
    repCommissionPercentage: 50,
    repCommissionAmount: 0,
    rep: '',
    writingRep: '',
    matched: true,
    posted: true,
    status: '',
    payPeriod: '',
    checkNumber: '',
    checkAmount: 0,
    split: false,
  };

  const [formData, setFormData] = useState<IInvoice>(props.commission);

  const closeDrawer = () => {
    props.toggleDrawer(false);
    setFormData(initialData);
  };
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    props.saveCommission(formData);
    closeDrawer();
    // TODO updateInvoices in state and db
  };

  return (
    <Drawer open={props.open} onClose={closeDrawer} anchor='bottom' sx={{ zIndex: 1201 }}>
      <Stack p={2}>
        <Typography variant='h6' borderBottom={1}>
          Edit Commission Row
        </Typography>
        <Box display='flex' gap={2}>
          <CustomInput
            required
            select
            value={formData.vendorName}
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
          <CustomInput
            required
            value={formData.checkNumber}
            label='Check Number'
            name='checkNumber'
            onChange={handleChange}
          />
          <CustomInput
            required
            currency
            value={formData.checkAmount}
            label='Check Amount'
            name='checkAmount'
            onChange={handleChange}
            maxWidth='12.5rem'
          />
          {/* <CustomInput
            required
            date
            value={formData.payDate}
            label='Pay Date'
            name='payDate'
            onChange={handleChange}
          /> */}
        </Box>{' '}
        <Button
          onClick={onSave}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          Save Changes
        </Button>
      </Stack>
    </Drawer>
  );
}

interface IEditCommissionDraftProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  commission: IInvoice;
  saveCommission: (commission: IInvoice) => void;
}
