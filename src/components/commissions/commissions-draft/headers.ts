import { IInvoice } from '../../../data/interfaces/IInvoice';

export interface ICommissionDraftHeader {
  label: string;
  id: keyof IInvoice;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'percentage';
}

export const commissionsHeader: ICommissionDraftHeader[] = [
  {
    label: 'Invoice #',
    align: 'left',
    id: 'invoiceNumber',
  },
  {
    label: 'Invoice Date',
    align: 'center',
    id: 'invoiceDate',
  },
  {
    label: 'Invoice $',
    align: 'right',
    id: 'invoiceAmount',
    type: 'currency',
  },
  {
    label: 'Commission %',
    align: 'center',
    id: 'commissionPercentage',
    type: 'percentage',
  },
  {
    label: 'Commission $',
    align: 'right',
    id: 'commissionAmount',
    type: 'currency',
  },
  {
    label: 'Rep',
    align: 'left',
    id: 'rep',
  },
  {
    label: 'Rep %',
    align: 'center',
    id: 'repCommissionPercentage',
    type: 'percentage',
  },
  {
    label: 'Rep $.',
    align: 'right',
    id: 'repCommissionAmount',
    type: 'currency',
  },
  {
    label: 'Check #',
    align: 'center',
    id: 'checkNumber',
  },
  {
    label: 'Vendor',
    align: 'left',
    id: 'vendorName',
  },
  {
    label: 'Customer',
    align: 'left',
    id: 'customerName',
  },
  // {
  //   label: 'Check $',
  //   align: 'center',
  //   id: 'checkAmount',
  //   type: 'currency',
  // },
];
