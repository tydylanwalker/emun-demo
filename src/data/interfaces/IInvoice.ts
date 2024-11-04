export interface IInvoice {
  poNumber: string;
  orderDate: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceDate: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  vendorName: string;
  commissionPercentage: number;
  commissionAmount: number;
  repCommissionPercentage: number;
  repCommissionAmount: number;
  rep: string;
  writingRep: string;
  matched: boolean;
  posted: boolean;
  status: string;
  payPeriod: string;
  checkNumber: string;
  checkAmount: number;
  split: boolean;
}
