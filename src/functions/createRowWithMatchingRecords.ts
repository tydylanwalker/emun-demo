import dayjs from 'dayjs';
import { IUploadCommissionsRow } from '../components/payments/upload-commissions/UploadCommissions';
import { ErrorEnum } from '../data/ErrorEnum';
import { IOrder, orders } from '../data/ordersMock';

/**
 * Function to find if there is a customer error and return which one
 *
 * @param name customer name
 * @param id customer id
 * @param order order object
 * @returns ErrorEnum or undefined
 */
function findCustomerError(name: string, id: string, order: IOrder) {
  if (id === order.customerId) {
    return undefined;
  } else if (name === order.customerName) {
    return ErrorEnum.multipleCustomer;
  }
  // TODO: add logic to see if customer address is different or something like that
  return ErrorEnum.noCustomer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRowWithMatchingRecords(row: { [key: string]: any }): IUploadCommissionsRow {
  // grab row data
  const poNumber = row['PO #'];
  const invoiceNumber = row['Invoice #'];
  const invoiceAmount = Number(row['Invoice $']) || 0;
  const invoiceDate = row['Invoice Date'] || dayjs().format('MM/DD/YYYY');
  const customerName = row['Customer'];
  const customerId = row['Customer ID'];
  const customerAddress = row['Address'];
  const customerCity = row['City'];
  const customerState = row['State'];
  const customerZip = row['Zip'];
  // These fields are not shown on the file upload
  // const commissionAmount = row['Commission Amount'];
  // const orderDate = row['Order Date'];
  // const status = row['Status'];
  // const rep = row['Rep'];
  // const writingRep = row['Writing Rep'];

  // If order is found, create IUploadCommissionsRow, check for duplicate PO and customer errors
  const ordersFound = orders.filter((order) => order.poNumber === poNumber);
  if (ordersFound.length > 0) {
    const order = ordersFound[0];

    const customerError = findCustomerError(customerName, customerId, order);

    const newRow: IUploadCommissionsRow = {
      poNumber: {
        value: order.poNumber,
        error: order.poNumber === '' ? ErrorEnum.noPo : ordersFound.length > 1 ? ErrorEnum.multiplePo : undefined,
      },
      invoiceNumber: {
        value: invoiceNumber,
      },
      invoiceAmount: {
        value: invoiceAmount,
      },
      invoiceDate: {
        value: invoiceDate,
      },
      customerId: {
        value: customerId,
        error: customerError,
      },
      customerName: {
        value: customerName,
      },
      customerAddress: {
        value: customerAddress,
      },
      customerCity: {
        value: customerCity,
      },
      customerState: {
        value: customerState,
      },
      customerZip: {
        value: customerZip,
      },
      commissionAmount: {
        value: invoiceAmount * 0.15,
      },
      orderDate: {
        value: order.orderDate,
      },
      rep: {
        value: order.rep,
      },
      writingRep: {
        value: order.writingRep,
      },
    };
    return newRow;
  }
  // If no order is found we end up here and just display all values from import
  const newRow: IUploadCommissionsRow = {
    poNumber: {
      value: poNumber,
      error: ErrorEnum.noPo,
    },
    invoiceNumber: {
      value: invoiceNumber,
    },
    invoiceAmount: {
      value: invoiceAmount,
    },
    invoiceDate: {
      value: invoiceDate,
    },
    customerId: {
      value: customerId,
    },
    customerName: {
      value: customerName,
    },
    customerAddress: {
      value: customerAddress,
    },
    customerCity: {
      value: customerCity,
    },
    customerState: {
      value: customerState,
    },
    customerZip: {
      value: customerZip,
    },
    commissionAmount: {
      value: invoiceAmount * 0.15,
    },
    orderDate: {
      value: '',
    },
    rep: {
      value: '',
    },
    writingRep: {
      value: '',
    },
  };
  return newRow;
}
