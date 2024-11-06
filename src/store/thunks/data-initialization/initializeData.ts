import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { getAllOrders } from '../../../data/requests/orders/getAllOrders';
import { dataInitialized, setChecks, setInvoices, setOrders, setPayPeriods, setVendors } from '../../slices/dataSlice';
import { getAllInvoices } from '../../../data/requests/invoices/getAllInvoices';
import { getAllChecks } from '../../../data/requests/checks/getAllChecks';
import { getAllPayPeriods } from '../../../data/requests/payPeriods/getAllPayPeriods';
import { getAllVendors } from '../../../data/requests/vendors/getAllVendors';
import { ESheets } from '../../../data/enums/ESheets';

/**
 * Initializes data for a specific sheet or all sheets.
 *
 * @param sheet - The sheet to initialize data for (optional).
 */
export function initializeData(sheet?: ESheets): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    if (sheet === undefined || sheet === ESheets.Orders) {
      const Orders = await getAllOrders();
      dispatch(setOrders(Orders));
    }

    if (sheet === undefined || sheet === ESheets.Invoices) {
      const Invoices = await getAllInvoices();
      dispatch(setInvoices(Invoices));
    }

    if (sheet === undefined || sheet === ESheets.Checks) {
      const Checks = await getAllChecks();
      dispatch(setChecks(Checks));
    }

    if (sheet === undefined || sheet === ESheets.Vendors) {
      const Vendors = await getAllVendors();
      dispatch(setVendors(Vendors));
    }

    if (sheet === undefined || sheet === ESheets.PayPeriods) {
      const PayPeriods = await getAllPayPeriods();
      dispatch(setPayPeriods(PayPeriods));
    }

    dispatch(dataInitialized());
  };
}
