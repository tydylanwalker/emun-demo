import { IEmunHeaders } from '../components/commissions/enter-commissions/modals/UploadFileModal';

// Function to find the best match for a given field from the second set of data
function findMatchingField(fileHeaders: string[], fieldNames: string[]): string | null {
  // Loop through fileHeaders
  for (const fileHeader of fileHeaders) {
    // Check if fileHeader is present in fieldNames
    if (fieldNames.includes(fileHeader)) {
      // console.log('Found a match:', fileHeader);
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

export function mapCommissionsFields(
  fileHeaders: string[],
  headers: IEmunHeaders[]
): { updatedHeaders: IEmunHeaders[]; headerIndices: { [key: string]: number | null } } {
  const updatedHeaders: IEmunHeaders[] = [];
  const headerIndices: { [key: string]: number | null } = {};

  headers.forEach((header) => {
    const possibleFields = fieldMappingConfig[header.label];
    const matchingValue = findMatchingField(fileHeaders, possibleFields);

    updatedHeaders.push({
      label: header.label,
      value: matchingValue || '',
      required: !!header.required,
    });

    headerIndices[header.label] = matchingValue ? fileHeaders.indexOf(matchingValue) : null;
  });

  return { updatedHeaders, headerIndices };
}
