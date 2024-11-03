import dayjs from 'dayjs';

export interface IOrderData {
  payPeriod: string;
  number: string;
  checkAmount: string;
  receivedDate: dayjs.Dayjs | null;
  payDate: dayjs.Dayjs | null;
  commissionAmount: string;
  statementGroup: string;
  additionalDetails?: string;
}
