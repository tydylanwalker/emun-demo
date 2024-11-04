import { IOrder } from '../interfaces/IOrder';

export function mapOrder(rows: Array<{ [key: string]: any }>): IOrder[] {
  return rows.map((row) => {
    const order: IOrder = {
      orderNumber: row.orderNumber || '',
      customerName: row.customerName || '',
      customerNumber: row.customerNumber || '',
      customerId: row.customerId || '',
      poNumber: row.poNumber || '',
      source: row.source || '',
      payPeriod: row.payPeriod || '',
      vendorId: row.vendorId || '',
      vendorName: row.vendorName || '',
      amount: Number(row.amount) || 0,
      balance: Number(row.balance) || 0,
      orderDate: row.orderDate || '',
      shipDate: row.shipDate || '',
      shipAddress: row.shipAddress || '',
      shipCity: row.shipCity || '',
      shipState: row.shipState || '',
      shipZip: row.shipZip || '',
      rep: row.rep || '',
      writingRep: row.writingRep || '',
      status: row.status || '',
    };
    return order;
  });
}
