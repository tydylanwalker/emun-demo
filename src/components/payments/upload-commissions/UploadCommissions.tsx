import { CustomInput } from "@/components/shared/CustomSelect";
import { Button, Stack, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AddCheck } from "./AddCheck";
import { ICheckData } from "@/interfaces/ICheckData";
import readExcelFile from "read-excel-file";
import _ from "lodash";
import { schema } from "../../../data/constants";


export function UploadCommissions() {
    const vendorOptions = ['Option 1', 'Option 2', 'Option 3'];
    const checkOptions = ['Option 1', 'Option 2', 'Option 3'];
    const [vendor, setVendor] = useState("");
    const [check, setCheck] = useState("");
    const [addNewCheck, setAddNewCheck] = useState(false);

    const saveCheck = (checkToSave: ICheckData) => {
        setAddNewCheck(false);
        setCheck(checkToSave.payPeriod || "");
        console.log('posted new check to db: ', checkToSave);
    }

    const handleUploadFileClicked = async (e: ChangeEvent<HTMLInputElement>) => {
        // const file = e.target.files ? e.target.files[0] : null;
    
        // e.preventDefault();
    
        // if (file) {
        //   if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        //     const fileData = (await readExcelFile(file, { schema, includeNullValues: true }).then(({ rows }) => {
        //       // replace all null values with empty string
        //       const cleanedRows = rows.map((row) => {
        //         const newRow = _.mapValues(row, (v) => (v === null ? "" : v));
        //         return newRow;
        //       });
        //       return cleanedRows;
        //     }));
    
        //     const mappedFileData = fileData.map((row: any) => {
        //       // Check for any errors in the row
        //       const errors = checkFormErrors(row);
    
        //       // If any of them have error === 'true' then set row error to true
        //       const hasError = Object.values(errors).includes(true);
    
        //       return {
        //         ...row,
        //         hasError: hasError,
        //       };
        //     });
    
        //     console.log(fileData)
        //   }
        // }
      };

    return (
        <Stack gap={4}>
            <Typography variant="h6">{`Upload Commissions ${vendor && "for " + vendor}${check && " | " + check}`}</Typography>
            <Stack direction="row" gap={2}>
                <CustomInput select value={vendor} label="Select Vendor" options={vendorOptions} onChange={(event) => setVendor(event.target.value as string)}  />
                <CustomInput select value={check} label="Select Check" options={checkOptions} onChange={(event) => setCheck(event.target.value as string)} endAction={<Button size="small" sx={{ color: 'grey', textTransform: 'none'}} onClick={() => setAddNewCheck(true)}>add new check +</Button>} />
            </Stack>
            {addNewCheck && <AddCheck open={addNewCheck} toggleDrawer={(open: boolean) => setAddNewCheck(open)} vendor={vendor} vendorOptions={vendorOptions} saveCheck={saveCheck}/>}
            <Button variant="contained" component="label" sx={{mt: 10}}>
                Upload File Test
                <input type="file" accept=".xlsx, .xls" onChange={(e) => handleUploadFileClicked(e)} hidden />
            </Button>
        </Stack>
    )
}