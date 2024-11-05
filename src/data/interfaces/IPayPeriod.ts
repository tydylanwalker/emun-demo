export enum EPayPeriodStatus {
  open = 'Open',
  close = 'Closed',
}

export interface IPayPeriod {
  guid?: string;
  payPeriod: string;
  status: string;
  startDate: string;
  endDate: string;
}
