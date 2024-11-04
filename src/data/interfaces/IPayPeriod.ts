export enum EPayPeriodStatus {
  open = 'Open',
  close = 'Closed',
}

export interface IPayPeriod {
  payPeriod: string;
  status: string;
  startDate: string;
  endDate: string;
}
