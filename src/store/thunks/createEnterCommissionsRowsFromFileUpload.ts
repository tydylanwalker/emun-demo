import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import dayjs from 'dayjs';
import { setEnterCommissionsRows } from '../slices/enterCommissionsSlice';
import { interfaceCreatorIEnterCommissionRow } from '../../data/interface-creators/interfaceCreatorIEnterCommissionRow';

/**
 * Creates our enter commissions rows based on the file data we read in
 *
 * @returns void
 */
export function createEnterCommissionsRowsFromFileUpload(
  rows: { [key: string]: any }[]
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const state = getState();
    const vendorSelected = state.enterCommissions.vendorSelected;
    const orders = state.data.orders.filter((order) => order.vendorName === vendorSelected);

    const commissionsRows = rows.map((row) => {
      // console.log(row['Invoice $']);
      // console.log(row['Invoice #']);
      // grab row data
      const values = {
        poNumber: row['PO #'],
        invoiceNumber: row['Invoice #'],
        invoiceAmount: Number(row['Invoice $'] ? row['Invoice $'].replace(/,/g, '') : 0),
        invoiceDate: row['Invoice Date'] || dayjs().format('MM/DD/YYYY'),
        customerName: row['Customer'],
        customerId: row['Customer ID'],
        customerAddress: row['Address'],
        customerCity: row['City'],
        customerState: row['State'],
        customerZip: row['Zip'],
      };

      return interfaceCreatorIEnterCommissionRow(orders, values);
    });

    dispatch(setEnterCommissionsRows(commissionsRows));
    // dispatch(postInvoicesFromCommissions(commissionsRows));
  };
}
