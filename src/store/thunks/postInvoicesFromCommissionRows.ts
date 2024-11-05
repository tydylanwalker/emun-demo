import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { IEnterCommissionsRow } from '../../components/payments/enter-commissions/EnterCommissions';
import { IInvoice } from '../../data/interfaces/IInvoice';
import { checkDisplayValue } from '../../functions/checkDisplayValue';
import { postInvoice } from '../../data/requests/invoices/postInvoice';
import { batchPostInvoices } from '../../data/requests/invoices/batchPostInvoices';

/**
 * Creates our enter commissions rows based on the file data we read in
 *
 * @returns void
 */
export function postInvoicesFromCommissions(
  rows: IEnterCommissionsRow[],
  posted: boolean = false
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const state = getState();
    const vendorSelected = state.enterCommissions.vendorSelected;
    const vendors = state.data.vendors;
    const foundVendor = vendors.find((vendor) => vendor.VendorName === vendorSelected);
    const checkSelected = state.enterCommissions.checkSelected;
    const checks = state.data.checks;
    const foundCheck = checks.find((check) => checkDisplayValue(check) === checkSelected);
    const payPeriodSelected = state.enterCommissions.payPeriodSelected;
    const payPeriods = state.data.payPeriods;
    const foundPayPeriod = payPeriods.find((payPeriod) => payPeriod.payPeriod === payPeriodSelected);

    if (!(foundVendor && foundCheck && foundPayPeriod)) return false;

    const invoices = rows.map((row) => {
      const invoice: IInvoice = {
        poNumber: row.poNumber.value,
        orderDate: row.orderDate.value,
        invoiceNumber: row.invoiceNumber.value,
        invoiceAmount: row.invoiceAmount.value,
        invoiceDate: row.invoiceDate.value,
        customerId: row.customerId.value,
        customerName: row.customerName.value,
        customerAddress: row.customerAddress.value,
        customerCity: row.customerCity.value,
        customerState: row.customerState.value,
        customerZip: row.customerZip.value,
        vendorName: foundVendor.VendorName,
        commissionPercentage: foundVendor.CommissionPercentage,
        commissionAmount: row.commissionAmount.value,
        repCommissionPercentage: 50,
        repCommissionAmount: row.commissionAmount.value / 2,
        rep: row.rep.value,
        writingRep: row.writingRep.value,
        matched: true, // currently matched = true because we only can post matched rows
        posted: posted,
        status: 'Open',
        payPeriod: foundPayPeriod.payPeriod,
        checkNumber: foundCheck.number,
        checkAmount: foundCheck.checkAmount,
        split: false,
      };

      return invoice;
    });

    batchPostInvoices(invoices);
    return true;
  };
}
