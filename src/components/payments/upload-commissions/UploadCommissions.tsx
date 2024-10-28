/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControlLabel, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { AddCheck } from "./AddCheck";
import { ICheckData } from "../../../interfaces/ICheckData";
import { CustomInput } from "../../shared/CustomInput";
import { UploadFile } from "./UploadFile";

const uploadCommissionsHeaders: string[] = [
    'PO Number',
    "Invoice Number",
    "Invoice Amount",
    "Customer ID",
    "Customer Name",
    "Address",
    "Commission Amount",
    "Invoice Date",
    "Order Number"
];


export function UploadCommissions() {
    const vendorOptions = ['Option 1', 'Option 2', 'Option 3'];
    const [vendor, setVendor] = useState("");
    const [check, setCheck] = useState("");
    const [checkOptions, setCheckOptions] = useState( ['Option 1', 'Option 2', 'Option 3'])
    const [addNewCheck, setAddNewCheck] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [mappedFileData, setMappedFileData] = useState<{ [key: string]: any; }[] | undefined>();
    const [hasErrors, setHasErrors] = useState(true);

    const saveCheck = (checkToSave: ICheckData) => {
        setAddNewCheck(false);
        setCheckOptions([...checkOptions, checkToSave.payPeriod]);
        setCheck(checkToSave.payPeriod || "");
    }

    return (
        <Stack gap={1}>
            <Typography variant="h6">{`Upload Commissions ${vendor && "for " + vendor}${check && " | " + check}`}</Typography>
            <Stack direction="row" gap={2} mb={3}>
                <CustomInput select value={vendor} label="Select Vendor" options={vendorOptions} onChange={(event) => setVendor(event.target.value as string)}  />
                <CustomInput select value={check} label="Select Check" options={checkOptions} onChange={(event) => setCheck(event.target.value as string)} endAction={<Button size="small" sx={{ color: 'grey', textTransform: 'none'}} onClick={() => setAddNewCheck(true)}>add new check +</Button>} />
            </Stack>
            {!mappedFileData?.length ? (
                <Button variant="contained" onClick={() => setUploadOpen(true)}>
                    Upload File
                </Button>
            ) : (
                <TableContainer component={Paper}>
                    <Stack direction="row" justifyContent="space-between" p={1}>
                        <Stack direction="row" gap={3} alignItems="center">
                            <Typography variant="h5">Imported Data</Typography>
                            <Typography variant="caption">{mappedFileData.length} entries</Typography>
                        </Stack>
                        <Stack direction="row" gap={2}>
                            <FormControlLabel control={<Switch />} label={`Only show errors (${Math.ceil(mappedFileData.length - mappedFileData.length / 1.25)})`} />
                            {hasErrors ? (
                                <Button variant="contained" color="warning" onClick={() => window.alert('submitting rows without errors....')}>Submit {Math.floor(mappedFileData.length / 1.25)} Entries without errors</Button>
                            ) : (
                                <Button variant="contained" onClick={() => window.alert('submitting all rows')}>Submit {mappedFileData.length} Entries</Button>
                            )}
                        </Stack>
                    </Stack>
                    <Table>
                        <TableHead>
                            <TableRow sx={{bgcolor: "lightgrey"}}>
                                {uploadCommissionsHeaders.map((header, index) => (
                                    <TableCell key={index}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mappedFileData.map((row, index) => (
                                <TableRow key={index}>
                                  {uploadCommissionsHeaders.map((header, index) => (
                                    <TableCell key={index}>
                                        <Typography>
                                            {row[header]}
                                        </Typography>
                                    </TableCell>
                                  ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <AddCheck open={addNewCheck} toggleDrawer={(open: boolean) => setAddNewCheck(open)} vendor={vendor} vendorOptions={vendorOptions} saveCheck={saveCheck}/>
            <UploadFile open={uploadOpen} onClose={() => setUploadOpen(false)} setMappedFileData={(data) => setMappedFileData(data)} />
        </Stack>
    )
}