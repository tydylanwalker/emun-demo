import { IInvoice } from '../interfaces/IInvoice';

export function mapInvoice(rows: Array<{ [key: string]: any }>): IInvoice[] {
  return rows.map((row) => {
    const invoice: IInvoice = {
      poNumber: row.poNumber || '',
      orderDate: row.orderDate || '',
      invoiceNumber: row.invoiceNumber || '',
      invoiceAmount: Number(row.invoiceAmount) || 0,
      invoiceDate: row.invoiceDate || '',
      customerId: row.customerId || '',
      customerName: row.customerName || '',
      customerAddress: row.customerAddress || '',
      customerCity: row.customerCity || '',
      customerState: row.customerState || '',
      customerZip: row.customerZip || '',
      commissionPercentage: Number(row.commissionPercentage) || 15,
      commissionAmount: Number(row.commissionAmount) || 0,
      repCommissionPercentage: Number(row.repCommissionPercentage) || 50,
      repCommissionAmount: Number(row.repCommissionAmount) || 0,
      rep: row.rep || '',
      writingRep: row.writingRep || '',
      matched: row.matched === 'true',
      posted: row.posted === 'true',
      status: row.status || '',
      payPeriod: row.payPeriod || '',
      checkNumber: row.checkNumber || '',
      checkAmount: Number(row.checkAmount) || 0,
      split: row.split === 'true',
    };
    return invoice;
  });
}
