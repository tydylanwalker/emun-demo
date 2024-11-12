import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { commissionDataInitialized } from '../../slices/dataSlice';
import { ESheets } from '../../../data/enums/ESheets';
import { getThunk } from '../requests/getThunk';

/**
 * Initializes data for the Commissions
 */
export function initializeCommissionData(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    await Promise.all([
      dispatch(getThunk(ESheets.Orders)),
      dispatch(getThunk(ESheets.Invoices)),
      dispatch(getThunk(ESheets.Vendors)),
      dispatch(getThunk(ESheets.Checks)),
      dispatch(getThunk(ESheets.PayPeriods)),
    ]);

    dispatch(commissionDataInitialized());
  };
}
