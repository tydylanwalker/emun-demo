/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AddCheck } from "./AddCheck";
import { ICheckData } from "../../../interfaces/ICheckData";
import { CustomInput } from "../../shared/CustomInput";
import { UploadFileModal } from "./UploadFileModal";
import { ordersMock } from "../../../data/orders";
import { invoicesMock } from "../../../data/invoices";
import { UploadCommissionsTable } from "./table/UploadCommissionsTable";
import { customersMock } from "../../../data/customers";
import { vendorsMock } from "../../../data/vendors";

// Define a type for the header metadata
export interface IHeaderMeta {
    label: string;
    id: keyof IUploadCommissionsRow;
    type: 'currency' | 'string' | 'date';
    align: 'left' | 'right' | 'center';
}

// Map headers to metadata
const uploadCommissionsHeadersMeta: IHeaderMeta[] = [
    { label: 'PO Number', id: 'poNumber', type: 'string', align: 'left' },
    { label: 'Invoice Number', id: 'invoiceNumber', type: 'string', align: 'left' },
    { label: 'Invoice Amount', id: 'invoiceAmount', type: 'currency', align: 'right' },
    { label: 'Customer ID', id: 'customerId', type: 'string', align: 'left' },
    { label: 'Customer Name', id: 'customerName', type: 'string', align: 'left' },
    { label: 'Address', id: 'address', type: 'string', align: 'left' },
    { label: 'Commission Amount', id: 'commissionAmount', type: 'currency', align: 'right' },
    { label: 'Invoice Date', id: 'invoiceDate', type: 'date', align: 'center' },
    { label: 'Order Number', id: 'orderNumber', type: 'string', align: 'left' }
];


export interface IUploadCommissionsRow {
    poNumber: string;
    invoiceNumber: string;
    invoiceAmount: string;
    customerId: string;
    customerName: string;
    address: string;
    commissionAmount: string;
    invoiceDate: string;
    orderNumber: string;
    writingRep: string;
    currentRep: string;
    columnWithError: (keyof IUploadCommissionsRow)[]; // TODO: redo this error handling, probably just make each header have a value and isError
}

function findCustomer(name: string, id: string) {
    let customerFoundByName = customersMock.filter((customer) => customer.name === name);
    if (customerFoundByName) {
        if (customerFoundByName.length > 1) {
            const customerFound = customerFoundByName.find((customer) => customer.id === id);
            if (customerFound) customerFoundByName = [customerFound];
        }
    }

    return {
        customerFound: customerFoundByName,
        columnsWithError: customerFoundByName.length === 1 ? [] : customerFoundByName.length === 0 ? ['customerId' as keyof IUploadCommissionsRow, 'companyName' as keyof IUploadCommissionsRow] : ["customerId" as keyof IUploadCommissionsRow]
     };
}


export function UploadCommissions() {
    const vendorOptions = vendorsMock.map((vendor) => vendor.vendorName);
    const [vendor, setVendor] = useState("");
    const [check, setCheck] = useState("");
    const [checkOptions, setCheckOptions] = useState(['SEPT2024'])
    const [addNewCheck, setAddNewCheck] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [mappedFileData, setMappedFileData] = useState<IUploadCommissionsRow[]>([]);

    const saveCheck = (checkToSave: ICheckData) => {
        setAddNewCheck(false);
        setCheckOptions([...checkOptions, checkToSave.payPeriod]);
        setCheck(checkToSave.payPeriod || "");
    }

    // TODO: Replace these with the actually data structure we need
    const handleSetMappedFileDate = (data: { [key: string]: any; }[] | undefined) => {
        const mappedRows: IUploadCommissionsRow[] = data?.map((row) => {
            const invoiceFound = invoicesMock.find((invoice) => invoice.invoiceNumber === row["Invoice Number"])
            
            if (invoiceFound) {
                const {invoiceNumber, poNumber, retailerId, companyName, invoiceDate, orderNumber, salesRepID, commissionPercent} = invoiceFound;
                const {customerFound, columnsWithError } = findCustomer(companyName, retailerId);
                
                const newRow: IUploadCommissionsRow = {
                    poNumber: poNumber,
                    invoiceNumber: invoiceNumber,
                    invoiceAmount: row["Invoice Amount"],
                    customerId: customerFound[0].id || retailerId,
                    customerName: customerFound[0].name || companyName,
                    address: customerFound[0].address || row["Address"],
                    commissionAmount: commissionPercent,
                    invoiceDate: invoiceDate,
                    orderNumber: orderNumber,
                    writingRep: salesRepID,
                    currentRep: salesRepID,
                    columnWithError: columnsWithError,
                }
                return newRow;
            }
            const orderFound = ordersMock.find((order) => order.purchaseOrder === row["PO Number"])
            if (orderFound) {
                const {id, purchaseOrder, companyName, retailerId, currentRepName, writingRepName} = orderFound;
                
                const {customerFound,columnsWithError} = findCustomer(companyName, retailerId);
                
                const newRow: IUploadCommissionsRow = {
                    poNumber: purchaseOrder || "",
                    invoiceNumber: row["Invoice Number"],
                    invoiceAmount: row["Invoice Amount"],
                    customerId: customerFound[0].id || row["Customer ID"],
                    customerName: customerFound[0].name || row["Customer Name"],
                    address: customerFound[0].address || row["Address"],
                    commissionAmount: row["Commission Amount"],
                    invoiceDate: row["Invoice Date"],
                    orderNumber: id || "",
                    writingRep: writingRepName || "",
                    currentRep: currentRepName || "",
                    columnWithError: [...columnsWithError, "invoiceNumber"],
                }
                return newRow;
            }
            const {customerFound,columnsWithError} = findCustomer(row["Customer Name"], row["Customer ID"])
            
            const newRow: IUploadCommissionsRow = {
                poNumber: row["PO Number"],
                invoiceNumber: row["Invoice Number"],
                invoiceAmount: row["Invoice Amount"],
                customerId: customerFound[0].id || row["Customer ID"],
                customerName: customerFound[0].name || row["Customer Name"],
                address: customerFound[0].address || row["Address"],
                commissionAmount: row["Commission Amount"],
                invoiceDate: row["Invoice Date"],
                orderNumber: row["Order Number"],
                writingRep: row["Writing Rep"],
                currentRep: row["Current Rep"],
                columnWithError: [...columnsWithError, "invoiceNumber", "poNumber"],
            }
            return newRow;
        }) || [];
        setMappedFileData(mappedRows)
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
                <UploadCommissionsTable rows={mappedFileData} headers={uploadCommissionsHeadersMeta} />
            )}
            <AddCheck open={addNewCheck} toggleDrawer={(open: boolean) => setAddNewCheck(open)} vendor={vendor} vendorOptions={vendorOptions} saveCheck={saveCheck}/>
            <UploadFileModal open={uploadOpen} onClose={() => setUploadOpen(false)} setMappedFileData={handleSetMappedFileDate} emunHeaders={uploadCommissionsHeadersMeta}/>
        </Stack>
    )
}

