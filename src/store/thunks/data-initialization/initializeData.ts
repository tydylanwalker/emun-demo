import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { dataInitialized } from '../../slices/dataSlice';
import { ESheets } from '../../../data/enums/ESheets';
import { getThunk } from '../requests/getThunk';

/**
 * Initializes data for a specific sheet or all sheets.
 *
 * @param sheet - The sheet to initialize data for (optional).
 */
export function initializeData(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    await Promise.all([
      dispatch(getThunk(ESheets.Orders)),
      dispatch(getThunk(ESheets.Invoices)),
      dispatch(getThunk(ESheets.Vendors)),
      dispatch(getThunk(ESheets.Checks)),
      dispatch(getThunk(ESheets.PayPeriods)),
    ]);

    dispatch(dataInitialized());
  };
}
