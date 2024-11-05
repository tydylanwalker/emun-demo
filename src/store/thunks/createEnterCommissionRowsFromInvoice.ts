import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { setEnterCommissionsRows } from '../slices/enterCommissionsSlice';
import { interfaceCreatorIEnterCommissionRow } from '../../data/interface-creators/interfaceCreatorIEnterCommissionRow';
import { IInvoice } from '../../data/interfaces/IInvoice';

/**
 * Creates our enter commissions rows based on the file data we read in
 *
 * @returns void
 */
export function createEnterCommissionsRowsFromValues(
  invoices: IInvoice[]
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const state = getState();
    const vendorSelected = state.enterCommissions.vendorSelected;
    const orders = state.data.orders.filter((order) => order.vendorName === vendorSelected);

    const commissionsRows = invoices.map((invoice) => {
      const values = {
        poNumber: invoice.poNumber,
        invoiceNumber: invoice.invoiceNumber,
        invoiceAmount: invoice.invoiceAmount,
        invoiceDate: invoice.invoiceDate,
        customerName: invoice.customerName,
        customerId: invoice.customerId,
        customerAddress: invoice.customerAddress,
        customerCity: invoice.customerCity,
        customerState: invoice.customerState,
        customerZip: invoice.customerZip,
      };

      return interfaceCreatorIEnterCommissionRow(orders, values);
    });

    dispatch(setEnterCommissionsRows(commissionsRows));
  };
}
