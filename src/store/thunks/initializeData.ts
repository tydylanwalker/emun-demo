import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { getAllOrders } from '../../data/requests/orders/getAllOrders';
import { setChecks, setCustomers, setInvoices, setOrders, setPayPeriods, setVendors } from '../slices/dataSlice';
import { getAllInvoices } from '../../data/requests/invoices/getAllInvoices';
import { getAllChecks } from '../../data/requests/checks/getAllChecks';
import { getAllCustomers } from '../../data/requests/customers/getAllCustomers';
import { getAllPayPeriods } from '../../data/requests/payPeriods/getAllPayPeriods';
import { getAllVendors } from '../../data/requests/vendors/getAllVendors';

/**
 * Initializes all our data
 *
 * @returns void
 */
export function initializeData(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const Orders = await getAllOrders();
    dispatch(setOrders(Orders));
    const Invoices = await getAllInvoices();
    dispatch(setInvoices(Invoices));
    const Checks = await getAllChecks();
    dispatch(setChecks(Checks));
    const Customers = await getAllCustomers();
    dispatch(setCustomers(Customers));
    const Vendors = await getAllVendors();
    dispatch(setVendors(Vendors));
    const PayPeriods = await getAllPayPeriods();
    dispatch(setPayPeriods(PayPeriods));
  };
}
