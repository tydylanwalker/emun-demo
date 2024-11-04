import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { IOrder } from '../../data/interfaces/IOrder';
import { ErrorEnum } from '../../data/enums/ErrorEnum';
import dayjs from 'dayjs';
import { IEnterCommissionsRow } from '../../components/payments/enter-commissions/EnterCommissions';
import { setEnterCommissionsRows } from '../slices/enterCommissionsSlice';

/**
 * Creates our enter commissions rows based on the file data we read in
 *
 * @returns void
 */
export function createEnterCommissionsRows(
  rows: { [key: string]: any }[]
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const state = getState();
    const vendorSelected = state.enterCommissions.vendorSelected;
    const orders = state.data.orders.filter((order) => order.vendorName === vendorSelected);
    console.log(orders);

    const commissionsRows = rows.map((row) => {
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
            value: poNumberError !== undefined && customerError !== undefined,
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
    });

    dispatch(setEnterCommissionsRows(commissionsRows));
  };
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
  if (id === order.customerId) {
    return undefined;
  } else if (name === order.customerName) {
    return ErrorEnum.multipleCustomer;
  }
  return ErrorEnum.noCustomer;
}
