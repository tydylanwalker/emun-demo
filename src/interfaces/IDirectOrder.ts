import dayjs from 'dayjs';

export interface IDirectOrder {
  customer: string;
  shipTo: string;
  poNumber: string;
  vendor: string;
  invoiceNumber: string;
  invoiceAmount: string;
  invoiceDate: dayjs.Dayjs | null;
}
