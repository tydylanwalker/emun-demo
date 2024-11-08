import { IEnterCommissionsRow } from '../../components/commissions/enter-commissions/EnterCommissions';

export interface IEnterCommissionsHeader {
  label: string;
  id: keyof IEnterCommissionsRow;
  type: 'currency' | 'string' | 'date';
  align: 'left' | 'right' | 'center';
  required?: boolean;
  hide?: boolean;
}

export const enterCommissionHeaders: IEnterCommissionsHeader[] = [
  {
    label: 'PO #',
    id: 'poNumber',
    type: 'string',
    align: 'left',
    required: true,
  },
  {
    label: 'Invoice #',
    id: 'invoiceNumber',
    type: 'string',
    align: 'center',
    required: true,
  },
  { label: 'Invoice Date', id: 'invoiceDate', type: 'date', align: 'center' },
  {
    label: 'Invoice $',
    id: 'invoiceAmount',
    type: 'currency',
    align: 'right',
    required: true,
  },
  {
    label: 'Commission $',
    id: 'commissionAmount',
    type: 'currency',
    align: 'right',
    hide: true,
  },
  { label: 'Rep', id: 'rep', type: 'string', align: 'left', hide: true },
  { label: 'Customer ID', id: 'customerId', type: 'string', align: 'left', required: true },
  { label: 'Customer', id: 'customerName', type: 'string', align: 'left' },
  { label: 'Address', id: 'customerAddress', type: 'string', align: 'left' },
  { label: 'City', id: 'customerCity', type: 'string', align: 'left' },
  { label: 'State', id: 'customerState', type: 'string', align: 'left' },
  { label: 'Zip', id: 'customerZip', type: 'string', align: 'left' },
  { label: 'Order Date', id: 'orderDate', type: 'string', align: 'left', hide: true },
  { label: 'Writing Rep', id: 'writingRep', type: 'string', align: 'left', hide: true },
];
