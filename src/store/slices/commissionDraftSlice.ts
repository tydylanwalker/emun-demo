import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IVendor } from '../../data/interfaces/IVendor';
import { IPayPeriod } from '../../data/interfaces/IPayPeriod';
import { ICheck } from '../../data/interfaces/ICheck';

interface ICommissionDraftState {
  vendorSelected: IVendor | null;
  payPeriodSelected: IPayPeriod | null;
  checkSelected: ICheck | null;
  repSelected: string | null;
  searchText: string;
}

const initialState: ICommissionDraftState = {
  vendorSelected: null,
  payPeriodSelected: null,
  checkSelected: null,
  repSelected: null,
  searchText: '',
};

const commissionDraftSlice = createSlice({
  name: 'commissionDraft',
  initialState,
  reducers: {
    setVendorSelected: (state, action: PayloadAction<IVendor | undefined>) => {
      state.vendorSelected = action.payload || null;
    },
    setPayPeriodSelected: (state, action: PayloadAction<IPayPeriod | undefined>) => {
      state.payPeriodSelected = action.payload || null;
    },
    setCheckSelected: (state, action: PayloadAction<ICheck | undefined>) => {
      console.log(action.payload);
      state.checkSelected = action.payload || null;
    },
    setRepSelected: (state, action: PayloadAction<string | undefined>) => {
      state.repSelected = action.payload || null;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const getVendorSelected = (state: RootState) => state.commissionDraft.vendorSelected;
export const getPayPeriodSelected = (state: RootState) => state.commissionDraft.payPeriodSelected;
export const getCheckSelected = (state: RootState) => state.commissionDraft.checkSelected;
export const getRepSelected = (state: RootState) => state.commissionDraft.repSelected;
export const getSearchText = (state: RootState) => state.commissionDraft.searchText;

export const { setVendorSelected, setPayPeriodSelected, setCheckSelected, setRepSelected, setSearchText } =
  commissionDraftSlice.actions;

export const commissionDraftReducer = commissionDraftSlice.reducer;
