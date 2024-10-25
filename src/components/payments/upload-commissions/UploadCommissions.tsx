import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AddCheck } from "./AddCheck";
import { ICheckData } from "../../../interfaces/ICheckData";
import { CustomInput } from "../../shared/CustomInput";
import { UploadFile } from "./UploadFile";


export function UploadCommissions() {
    const vendorOptions = ['Option 1', 'Option 2', 'Option 3'];
    const [vendor, setVendor] = useState("");
    const [check, setCheck] = useState("");
    const [checkOptions, setCheckOptions] = useState( ['Option 1', 'Option 2', 'Option 3'])
    const [addNewCheck, setAddNewCheck] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const saveCheck = (checkToSave: ICheckData) => {
        setAddNewCheck(false);
        setCheckOptions([...checkOptions, checkToSave.payPeriod]);
        setCheck(checkToSave.payPeriod || "");
    }

    return (
        <Stack gap={4}>
            <Typography variant="h6">{`Upload Commissions ${vendor && "for " + vendor}${check && " | " + check}`}</Typography>
            <Stack direction="row" gap={2}>
                <CustomInput select value={vendor} label="Select Vendor" options={vendorOptions} onChange={(event) => setVendor(event.target.value as string)}  />
                <CustomInput select value={check} label="Select Check" options={checkOptions} onChange={(event) => setCheck(event.target.value as string)} endAction={<Button size="small" sx={{ color: 'grey', textTransform: 'none'}} onClick={() => setAddNewCheck(true)}>add new check +</Button>} />
            </Stack>
            <Button variant="contained" onClick={() => setUploadOpen(true)} sx={{mt: 10}}>
                Upload File
            </Button>
            <AddCheck open={addNewCheck} toggleDrawer={(open: boolean) => setAddNewCheck(open)} vendor={vendor} vendorOptions={vendorOptions} saveCheck={saveCheck}/>
            <UploadFile open={uploadOpen} onClose={() => setUploadOpen(false)} />
        </Stack>
    )
}