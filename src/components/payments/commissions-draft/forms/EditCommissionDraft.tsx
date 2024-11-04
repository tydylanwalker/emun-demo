import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { ICommissionDraft } from '../../../../data/mock/commissions';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { getVendors } from '../../../../store/slices/dataSlice';

export function EditCommissionDraft(props: IEditCommissionDraftProps) {
  const initialData = {
    checkNumber: 0,
    checkAmount: 0,
    invoiceNumber: 0,
    invoiceDate: '',
    payPeriod: '',
    invoiceAmount: 0,
    vendorCommission: 0,
    commissionAmount: 0,
    repCommissionAmount: 0,
    repCommissionRate: 0,
    comments: '',
    strCategory: '',
    accountType: '',
    vendor: '',
    rep: '',
    orderNumber: '',
    poNumber: '',
  };

  const [formData, setFormData] = useState<ICommissionDraft>(props.commission ? props.commission : initialData);

  const closeDrawer = () => {
    props.toggleDrawer(false);
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

  return (
    <Drawer open={props.open} onClose={closeDrawer} anchor='bottom' sx={{ zIndex: 1201 }}>
      <Stack p={2}>
        <Typography variant='h6' borderBottom={1}>
          {props.commission ? 'Edit Commission' : 'Add Commission'}
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

          {/* <CustomInput
            required
            select
            value={formData.accountType}
            label='Account Type'
            name='status'
            options={Object.values(ECheckStatus)}
            onChange={handleChange}
            maxWidth='10rem'
          /> */}
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
            value={formData.accountType}
            label='Account Type'
            name='accountType'
            onChange={handleChange}
            maxWidth='12.5rem'
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
        </Box>
        <CustomInput value={formData.comments} label='Comments' name='comments' onChange={handleChange} multiline />
        <Button
          onClick={() => props.saveCommission(formData)}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          {props.commission ? 'Save Changes' : 'Add New Commission'}
        </Button>
      </Stack>
    </Drawer>
  );
}

interface IEditCommissionDraftProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  commission?: ICommissionDraft;
  saveCommission: (commission: ICommissionDraft) => void;
}
