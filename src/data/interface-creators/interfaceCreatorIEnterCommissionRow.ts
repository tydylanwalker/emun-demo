import { IEnterCommissionsRow } from '../../components/commissions/enter-commissions/EnterCommissions';
import { ErrorEnum } from '../enums/ErrorEnum';
import { IOrder } from '../interfaces/IOrder';

export interface ICreateCommissionRowsFromValues {
  poNumber: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceDate: string;
  customerName: string;
  customerId: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
}

export function interfaceCreatorIEnterCommissionRow(
  orders: IOrder[],
  commissionValues: ICreateCommissionRowsFromValues
): IEnterCommissionsRow {
  // Extract out values from object
  const {
    poNumber,
    invoiceNumber,
    invoiceAmount,
    invoiceDate,
    customerName,
    customerId,
    customerAddress,
    customerCity,
    customerState,
    customerZip,
  } = commissionValues;

  // If order is found, create IEnterCommissionsRow, check for duplicate PO and customer errors
  const ordersFound = orders.filter((order) => order.poNumber === poNumber);
  if (ordersFound.length > 0) {
    const order = ordersFound[0];

    const customerError = findCustomerError(customerName, customerId, order);
    const poNumberError =
      order.poNumber === '' ? ErrorEnum.noPo : ordersFound.length > 1 ? ErrorEnum.multiplePo : undefined;
    const newRow: IEnterCommissionsRow = {
      poNumber: {
        value: order.poNumber,
        error: poNumberError,
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
      checked: {
        value: poNumberError === undefined && customerError === undefined,
      },
    };
    return newRow;
  }
  // If no order is found we end up here and just display all values from import
  const newRow: IEnterCommissionsRow = {
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
    checked: {
      value: false,
    },
  };
  return newRow;
}

/**
 * Function to find if there is a customer error and return which one
 *
 * @param name customer name
 * @param id customer id
 * @param order order object
 * @returns ErrorEnum or undefined
 */
function findCustomerError(name: string, id: string, order: IOrder) {
  if (id === order.customerId || name === order.customerName) {
    return undefined;
  }
  // TODO look into fixing this with how emun actually checks for duplicate customers
  // else if (name === order.customerName) {
  //   return ErrorEnum.multipleCustomer;
  // }
  return ErrorEnum.noCustomer;
}
