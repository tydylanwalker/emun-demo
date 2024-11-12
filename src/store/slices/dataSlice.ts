import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IOrder } from '../../data/interfaces/IOrder';
import { ICheck } from '../../data/interfaces/ICheck';
import { IVendor } from '../../data/interfaces/IVendor';
import { IPayPeriod } from '../../data/interfaces/IPayPeriod';
import { IInvoice } from '../../data/interfaces/IInvoice';
import { IDivision } from '../../data/interfaces/IDivision';

interface IDataState {
  orders: IOrder[];
  checks: ICheck[];
  vendors: IVendor[];
  payPeriods: IPayPeriod[];
  invoices: IInvoice[];
  divisions: IDivision[];
  commissionDataInitialized: boolean;
  territoryDataInitialized: boolean;
}

const initialState: IDataState = {
  orders: [],
  checks: [],
  vendors: [],
  payPeriods: [],
  invoices: [],
  divisions: [],
  commissionDataInitialized: false,
  territoryDataInitialized: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    setChecks: (state, action: PayloadAction<ICheck[]>) => {
      state.checks = action.payload;
    },
    setVendors: (state, action: PayloadAction<IVendor[]>) => {
      state.vendors = action.payload;
    },
    setPayPeriods: (state, action: PayloadAction<IPayPeriod[]>) => {
      state.payPeriods = action.payload;
    },
    setInvoices: (state, action: PayloadAction<IInvoice[]>) => {
      state.invoices = action.payload;
    },
    setDivisions: (state, action: PayloadAction<IDivision[]>) => {
      state.divisions = action.payload;
    },
    commissionDataInitialized: (state) => {
      state.commissionDataInitialized = true;
    },
    territoryDataInitialized: (state) => {
      state.territoryDataInitialized = true;
    },
  },
});

export const getOrders = (state: RootState) => state.data.orders;
export const getDivisions = (state: RootState) => state.data.divisions;
export const getChecks = (state: RootState) => state.data.checks;
export const getVendors = (state: RootState) => state.data.vendors;
export const getPayPeriods = (state: RootState) => state.data.payPeriods;
export const getInvoices = (state: RootState) => state.data.invoices;
export const getDraftInvoices = (state: RootState) =>
  state.data.invoices.filter((invoice) => invoice.posted && invoice.status.toLowerCase() !== 'closed');
export const getCommissionDataInitialized = (state: RootState) => state.data.commissionDataInitialized;
export const getTerritoryDataInitialized = (state: RootState) => state.data.territoryDataInitialized;

export const {
  setOrders,
  setChecks,
  setInvoices,
  setPayPeriods,
  setVendors,
  setDivisions,
  commissionDataInitialized,
  territoryDataInitialized,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
