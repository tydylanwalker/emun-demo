import { IEmunHeaders } from '../components/commissions/enter-commissions/modals/UploadFileModal';

// Function to find the best match for a given field from the second set of data
function findMatchingField(fileHeaders: string[], fieldNames: string[]): string | null {
  // Loop through fileHeaders
  for (let fileHeader of fileHeaders) {
    // Check if fileHeader is present in fieldNames
    if (fieldNames.includes(fileHeader)) {
      console.log('Found a match:', fileHeader);
      return fileHeader; // Return the first matching field
    }
  }
  return null; // Return null if no match is found
}

type FieldMappingConfig = {
  [key: string]: string[];
};

export const fieldMappingConfig: FieldMappingConfig = {
  'PO #': ['poNumber', 'orderNumber', 'purchaseOrderNumber'],
  'Invoice #': ['Invoice #', 'invoiceNumber', 'invoiceId'],
  'Invoice Date': ['Invoice Date', 'invoiceDate', 'dateOfInvoice'],
  'Invoice $': ['Invoice Amount', 'invoiceAmount', 'amount'],
  'Customer ID': ['customerId', 'customerNumber', 'customerID'],
  Customer: ['customerName', 'customer'],
  Address: ['shipAddress', 'address'],
  City: ['shipCity', 'city'],
  State: ['shipState', 'state'],
  Zip: ['shipZip', 'zipCode'],
};

export function mapCommissionsFields(fileHeaders: string[], headers: IEmunHeaders[]): IEmunHeaders[] {
  const updatedEmunHeaders: IEmunHeaders[] = [];
  headers.forEach((header) => {
    console.log('Trying to match field');
    console.log(header.label);

    const possibleFields = fieldMappingConfig[header.label];
    const matchingValue = findMatchingField(fileHeaders, possibleFields);

    updatedEmunHeaders.push({
      label: header.label,
      value: matchingValue || '',
      required: !!header.required,
    });
  });

  return updatedEmunHeaders;
}
