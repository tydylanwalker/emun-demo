import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { ESheets } from '../../../data/enums/ESheets';
import { getThunk } from './getThunk';

/**
 * Calls our api with rows to post and the sheet to post
 *
 * @returns void
 */
export function postThunk(rows: any, sheet: ESheets): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rows, sheet }),
    });

    if (response.ok) await dispatch(getThunk(sheet));
    // else dispatch set error dialog open
    return response.ok;
  };
}
