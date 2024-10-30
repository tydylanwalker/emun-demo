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
  }
  // TODO: add logic to see if we have multiple customers if so ErrorEnum.multipleCustomers
  // TODO: add logic to see if customer address is different or something like that
  return ErrorEnum.noCustomer;
}

export function createRowWithMatchingRecords(row: { [key: string]: any }): IUploadCommissionsRow {
  // grab row data
  const poNumber = row['PO Number'];
  const invoiceNumber = row['Invoice Number'];
  const invoiceAmount = Number(row['Invoice Amount']) || 0;
  const invoiceDate = row['Invoice Date'] || dayjs().format('MM/DD/YYYY');
  const customerName = row['Customer Name'];
  const customerId = row['Customer ID'];
  const customerAddress = row['Customer Address'];
  const customerZip = row['Customer ZIP'];
  const commissionAmount = row['Commission Amount']; // currently calculate this on 15% of invoice amount
  const orderDate = row['Order Date'];
  const status = row['Status'];
  const rep = row['Rep'];
  const writingRep = row['Writing Rep'];

  // Check for matching order
  const ordersFound = orders.filter((order) => order.poNumber === poNumber);
  if (ordersFound.length > 1) {
    // TODO handle if multiple found
  }
  if (ordersFound.length === 1) {
    const order = ordersFound[0];

    const customerError = findCustomerError(customerName, customerId, order);

    const newRow: IUploadCommissionsRow = {
      poNumber: {
        value: order.poNumber,
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
      customerZip: {
        value: customerZip,
      },
      commissionAmount: {
        value: invoiceAmount * 0.15,
      },
      orderDate: {
        value: order.orderDate,
      },
      status: {
        value: order.status,
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
    customerZip: {
      value: customerZip,
    },
    commissionAmount: {
      value: invoiceAmount * 0.15,
    },
    orderDate: {
      value: orderDate,
    },
    status: {
      value: status,
    },
    rep: {
      value: rep,
    },
    writingRep: {
      value: writingRep,
    },
  };
  return newRow;
}
