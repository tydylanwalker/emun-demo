import dayjs from 'dayjs';

export enum EPayPeriodStatus {
  open = 'Open',
  close = 'Closed',
}

export interface IPayPeriod {
  payPeriod: string;
  status: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}
