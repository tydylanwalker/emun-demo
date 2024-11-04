import dayjs from 'dayjs';
import { IOrder } from '../data/interfaces/IOrder';
import { IEnterCommissionsRow } from '../components/payments/enter-commissions/EnterCommissions';

export function createDirectOrder(row?: IEnterCommissionsRow, newCustomer: boolean = false): IOrder {
  const poNumber = newCustomer && row?.poNumber ? row.poNumber.value : 'OC-' + dayjs().valueOf;
  return {
    orderNumber: poNumber,
    customerName: row?.customerName.value || '',
    payPeriod: '',
    customerNumber: row?.customerId.value || '',
    customerId: row?.customerId.value || '',
    poNumber: poNumber,
    source: 'DIRECT',
    vendorId: '',
    vendorName: '',
    amount: 0,
    balance: 0,
    orderDate: row?.orderDate.value || '',
    shipDate: row?.invoiceDate.value || '',
    shipAddress: row?.customerAddress.value || '',
    shipCity: row?.customerCity.value || '',
    shipState: row?.customerState.value || '',
    shipZip: row?.customerZip.value || '',
    rep: row?.rep.value || '',
    writingRep: row?.writingRep.value || '',
    status: 'Open',
  };
}
