import dayjs from 'dayjs';
import { ECheckStatus } from './ICheckData';

export interface ICheck {
  vendor: string;
  payPeriod: string;
  number: string;
  checkAmount: string;
  status: ECheckStatus;
  receivedDate: dayjs.Dayjs | null;
  payDate: dayjs.Dayjs | null;
  additionalDetails?: string;
}
