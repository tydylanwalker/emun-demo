import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { IEnterCommissionsRow } from '../../components/commissions/enter-commissions/EnterCommissions';
import { IInvoice } from '../../data/interfaces/IInvoice';
import { checkDisplayValue } from '../../functions/checkDisplayValue';
import { postThunk } from './requests/postThunk';
import { ESheets } from '../../data/enums/ESheets';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates our enter commissions rows based on the file data we read in
 *
 * @returns void
 */
export function postInvoicesFromCommissions(
  rows: IEnterCommissionsRow[],
  posted: boolean = false,
  direct: boolean = false
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
      const poNumber = !direct ? row.poNumber.value : 'OC-' + uuidv4();
      const orderDate = !direct ? row.orderDate.value : dayjs().format('MM/DD/YYYY');
      const invoice: IInvoice = {
        poNumber: poNumber,
        orderDate: orderDate,
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

    await dispatch(postThunk(invoices, ESheets.Invoices));
    return true;
  };
}
