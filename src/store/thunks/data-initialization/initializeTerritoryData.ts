import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';
import { territoryDataInitialized } from '../../slices/dataSlice';
import { ESheets } from '../../../data/enums/ESheets';
import { getThunk } from '../requests/getThunk';

/**
 * Initializes data for Territories
 */
export function initializeTerritoryData(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    await Promise.all([dispatch(getThunk(ESheets.Divisions))]);

    dispatch(territoryDataInitialized());
  };
}
