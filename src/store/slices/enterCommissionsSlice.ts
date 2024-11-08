import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IEnterCommissionsRow } from '../../components/commissions/enter-commissions/EnterCommissions';

interface IEnterCommissionsState {
  enterCommissionsRows: IEnterCommissionsRow[];
  vendorSelected: string;
  payPeriodSelected: string;
  checkSelected: string;
  addCheckOpen: boolean;
  addDirectOrderOpen: boolean;
  addPayPeriodOpen: boolean;
  addCreditOpen: boolean;
  addCustomersOpen: boolean;
  addAdjustmentOpen: boolean;
  uploadFileOpen: boolean;
}

const initialState: IEnterCommissionsState = {
  enterCommissionsRows: [],
  vendorSelected: '',
  payPeriodSelected: '',
  checkSelected: '',
  addCheckOpen: false,
  addDirectOrderOpen: false,
  addPayPeriodOpen: false,
  addCreditOpen: false,
  addCustomersOpen: false,
  addAdjustmentOpen: false,
  uploadFileOpen: false,
};

const enterCommissionsSlice = createSlice({
  name: 'enterCommissions',
  initialState,
  reducers: {
    setEnterCommissionsRows: (state, action: PayloadAction<IEnterCommissionsRow[]>) => {
      state.enterCommissionsRows = action.payload;
    },
    addEnterCommissionsRow: (state, action: PayloadAction<IEnterCommissionsRow>) => {
      state.enterCommissionsRows.unshift(action.payload);
    },
    setVendorSelected: (state, action: PayloadAction<string>) => {
      state.vendorSelected = action.payload;
    },
    setPayPeriodSelected: (state, action: PayloadAction<string>) => {
      state.payPeriodSelected = action.payload;
    },
    setCheckSelected: (state, action: PayloadAction<string>) => {
      state.checkSelected = action.payload;
    },
    setAddCheckOpen: (state, action: PayloadAction<boolean>) => {
      state.addCheckOpen = action.payload;
    },
    setAddPayPeriodOpen: (state, action: PayloadAction<boolean>) => {
      state.addPayPeriodOpen = action.payload;
    },
    setAddDirectOrderOpen: (state, action: PayloadAction<boolean>) => {
      state.addDirectOrderOpen = action.payload;
    },
    setAddAdjustmentOpen: (state, action: PayloadAction<boolean>) => {
      state.addAdjustmentOpen = action.payload;
    },
    setAddCreditOpen: (state, action: PayloadAction<boolean>) => {
      state.addCreditOpen = action.payload;
    },
    setAddCustomersOpen: (state, action: PayloadAction<boolean>) => {
      state.addCustomersOpen = action.payload;
    },
    setUploadFileOpen: (state, action: PayloadAction<boolean>) => {
      state.uploadFileOpen = action.payload;
    },
  },
});

export const getEnterCommissionsRows = (state: RootState) => state.enterCommissions.enterCommissionsRows;
export const getVendorSelected = (state: RootState) => state.enterCommissions.vendorSelected;
export const getPayPeriodSelected = (state: RootState) => state.enterCommissions.payPeriodSelected;
export const getCheckSelected = (state: RootState) => state.enterCommissions.checkSelected;
export const getAddCheckOpen = (state: RootState) => state.enterCommissions.addCheckOpen;
export const getAddPayPeriodOpen = (state: RootState) => state.enterCommissions.addPayPeriodOpen;
export const getAddCreditOpen = (state: RootState) => state.enterCommissions.addCreditOpen;
export const getAddAdjustmentOpen = (state: RootState) => state.enterCommissions.addAdjustmentOpen;
export const getAddDirectOrderOpen = (state: RootState) => state.enterCommissions.addDirectOrderOpen;
export const getAddCustomersOpen = (state: RootState) => state.enterCommissions.addCustomersOpen;
export const getUploadFileOpen = (state: RootState) => state.enterCommissions.uploadFileOpen;

export const {
  setEnterCommissionsRows,
  addEnterCommissionsRow,
  setVendorSelected,
  setPayPeriodSelected,
  setCheckSelected,
  setAddAdjustmentOpen,
  setAddCheckOpen,
  setAddCreditOpen,
  setAddCustomersOpen,
  setAddDirectOrderOpen,
  setAddPayPeriodOpen,
  setUploadFileOpen,
} = enterCommissionsSlice.actions;

export const enterCommissionsReducer = enterCommissionsSlice.reducer;
