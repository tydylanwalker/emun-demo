import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomInput } from '@/components/shared/CustomSelect';
import dayjs from 'dayjs';
import { ECheckStatus, ICheckData } from '@/interfaces/ICheckData';

export function AddCheck(props: IAddCheckProps) {
    const [formData, setFormData] = useState<ICheckData>({
        vendor: props.vendor,
        payPeriod: "",
        number: "",
        checkAmount: "",
        status: ECheckStatus.Open,
        receivedDate: null,
        payDate: dayjs(),
        commissionAmount: "",
        statementGroup: "",
        additionalDetails: "",
    });

    const closeDrawer = () => {
        props.toggleDrawer(false);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        const {name, value} = event.target;   
       
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));    
    }

  return (
    <Drawer open={props.open} onClose={closeDrawer} anchor='right' sx={{zIndex: 1201 }}>
        <Stack gap={1} p={2} minWidth="25rem">
            <Typography variant='h6' borderBottom={1}>Add a New Check</Typography>
            <CustomInput select value={formData.vendor} options={props.vendorOptions} label="Vendor" name='vendor' onChange={handleChange}/>
            <CustomInput value={formData.payPeriod} label="Pay Period" name='payPeriod' onChange={handleChange} />
            <CustomInput value={formData.number} label="Check Number" name='number' onChange={handleChange} />
            <CustomInput currency value={formData.checkAmount} label="Check Amount" name="checkAmount" onChange={handleChange} />
            <CustomInput select value={formData.status} label="Status" name='status' options={Object.values(ECheckStatus)} onChange={handleChange} />
            {/* Need to add date pickers, or just make it date format as you type */}
            <CustomInput date value={formData.receivedDate} label="Received Date" name='receivedDate' onChange={handleChange} /> 
            <CustomInput date value={formData.payDate} label="Pay Date" datatype='payDate' onChange={handleChange} />
            <CustomInput value={formData.commissionAmount} label="Commission Amount" name='commissionAmount' onChange={handleChange} />
            <CustomInput value={formData.statementGroup} label="Statement Group" name='statementGroup' onChange={handleChange} />
            <CustomInput value={formData.additionalDetails} label="Additional Details" name='additionalDetails' onChange={handleChange} />
            <Button onClick={() => props.saveCheck(formData)} size='large' color='success' variant='contained' fullWidth sx={{borderRadius: 10, mt: 3}}>Save Check</Button>
        </Stack>
    </Drawer>
  );
}

interface IAddCheckProps {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => void;
    vendor: string;
    vendorOptions: string[];
    saveCheck: (check: ICheckData) => void;
}