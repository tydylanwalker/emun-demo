import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import {
  setOrders,
  setVendors,
  setChecks,
  setPayPeriods,
  setInvoices,
  setDivisions,
  setZipCodes,
} from '../slices/dataSlice';
import { ESheets } from '../../data/enums/ESheets';
import { mapOrder } from '../../data/mappers/mapOrder';
import { mapInvoice } from '../../data/mappers/mapInvoice';
import { mapPayPeriod } from '../../data/mappers/mapPayPeriod';
import { mapCheck } from '../../data/mappers/mapCheck';
import { mapVendor } from '../../data/mappers/mapVendor';
import { mapDivision } from '../../data/mappers/mapDivision';
import { mapZipCodes } from '../../data/mappers/mapZipCodes';

/**
 * Sets the data for a specific sheet
 *
 * @param sheet -The sheet to set data for
 */
export function setStateData(rows: any, sheet: ESheets): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    switch (sheet) {
      case ESheets.Orders:
        dispatch(setOrders(mapOrder(rows)));
        break;
      case ESheets.Vendors:
        dispatch(setVendors(mapVendor(rows)));
        break;
      case ESheets.Checks:
        dispatch(setChecks(mapCheck(rows)));
        break;
      case ESheets.PayPeriods:
        dispatch(setPayPeriods(mapPayPeriod(rows)));
        break;
      case ESheets.Invoices:
        dispatch(setInvoices(mapInvoice(rows)));
        break;
      case ESheets.Divisions:
        dispatch(setDivisions(mapDivision(rows)));
        break;
      case ESheets.ZipCodes:
        dispatch(setZipCodes(mapZipCodes(rows)));
        break;
      default:
        console.warn(`No matching case for sheet type: ${sheet}`);
        break;
    }
  };
}
