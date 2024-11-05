export interface ICheck {
  guid?: string;
  vendor: string;
  payPeriod: string;
  number: string;
  checkAmount: number;
  status: string;
  receivedDate: string;
  payDate: string;
  additionalDetails?: string;
}
