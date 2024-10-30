import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { ICheckData, ECheckStatus } from '../../../interfaces/ICheckData';
import { CustomInput } from '../../shared/CustomInput';
import { IOrderData } from '../../../interfaces/IOrderData';

export function AddOrder(props: IAddOrderProps) {
  const [formData, setFormData] = useState<IOrderData>({
    payPeriod: '',
    number: '',
    checkAmount: '',
    receivedDate: null,
    payDate: dayjs(),
    commissionAmount: '',
    statementGroup: '',
    additionalDetails: '',
  });

  const closeDrawer = () => {
    props.toggleDrawer(false);
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
          Add a New Check
        </Typography>
        <Box display='flex' gap={2}>
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
          <CustomInput
            required
            date
            value={formData.payDate}
            label='Pay Date'
            datatype='payDate'
            onChange={handleChange}
          />
        </Box>
        <Box display='flex' gap={2}>
          <CustomInput
            required
            value={formData.commissionAmount}
            label='Commission Amount'
            name='commissionAmount'
            onChange={handleChange}
          />
          <CustomInput
            value={formData.statementGroup}
            label='Statement Group'
            name='statementGroup'
            onChange={handleChange}
          />
        </Box>
        <CustomInput
          value={formData.additionalDetails}
          label='Additional Details'
          name='additionalDetails'
          onChange={handleChange}
          multiline
        />
        <Button
          onClick={() => props.saveOrder(formData)}
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

interface IAddOrderProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  saveOrder: (check: IOrderData) => void;
}
