import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { ESheets } from '../../../data/enums/ESheets';
import { setStateData } from '../setStateData';

/**
 * Calls our update API to get all rows from a sheet
 *
 * @returns void
 */
export function getThunk(sheet: ESheets): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const response = await fetch(`/api/get?sheet=${sheet}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      dispatch(setStateData(responseJson, sheet));
    }
    // error dialog if it fails
    return response.ok;
  };
}
