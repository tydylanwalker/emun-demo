import { IInvoice } from '../interfaces/IInvoice';

export function mapInvoice(rows: Array<{ [key: string]: any }>): IInvoice[] {
  return rows.map((row) => {
    const invoice: IInvoice = {
      guid: row.guid || '',
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
      vendorName: row.vendorName || '',
      commissionPercentage: Number(row.commissionPercentage) || 15,
      commissionAmount: Number(row.commissionAmount) || 0,
      repCommissionPercentage: Number(row.repCommissionPercentage) || 50,
      repCommissionAmount: Number(row.repCommissionAmount) || 0,
      rep: row.rep || '',
      writingRep: row.writingRep || '',
      matched: row.matched === 'TRUE',
      posted: row.posted === 'TRUE',
      status: row.status || '',
      payPeriod: row.payPeriod || '',
      checkNumber: row.checkNumber || '',
      checkAmount: Number(row.checkAmount) || 0,
      split: row.split === 'TRUE',
    };
    return invoice;
  });
}
