import dayjs from 'dayjs';
import { IOrder } from '../data/ordersMock';
import { IEnterCommissionsRow } from '../components/payments/enter-commissions/EnterCommissions';

export function createDirectOrder(row?: IEnterCommissionsRow, newCustomer: boolean = false): IOrder {
  const poNumber = newCustomer && row?.poNumber ? row.poNumber.value : 'OC-' + dayjs().valueOf;
  return {
    orderNumber: poNumber,
    customerName: row?.customerName.value || '',
    payPeriod: '',
    posted: false,
    customerNumber: row?.customerId.value || '',
    commissionAmount: row?.commissionAmount.value.toString() || '',
    invoiceDate: row?.invoiceDate.value || '',
    invoiceAmount: row?.invoiceAmount.value.toString() || '',
    invoiceNumber: row?.invoiceNumber.value.toString() || '',
    customerId: row?.customerId.value || '',
    poNumber: poNumber,
    source: 'DIRECT',
    vendorId: '',
    vendorName: '',
    amount: '0',
    balance: '0',
    orderDate: row?.orderDate.value || '',
    shipDate: row?.invoiceDate.value || '',
    shipCity: row?.customerCity.value || '',
    shipState: row?.customerState.value || '',
    rep: row?.rep.value || '',
    writingRep: row?.writingRep.value || '',
    generatedFrom: 'DIRECT',
    status: 'Open',
    expectedToClear: '',
    reviewReason: '',
  };
}
