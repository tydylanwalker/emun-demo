import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IOrder } from '../../data/interfaces/IOrder';
import { ICheck } from '../../data/interfaces/ICheck';
import { IVendor } from '../../data/interfaces/IVendor';
import { IPayPeriod } from '../../data/interfaces/IPayPeriod';
import { IInvoice } from '../../data/interfaces/IInvoice';
import { ICustomer } from '../../data/interfaces/ICustomer';

interface IDataState {
  orders: IOrder[];
  checks: ICheck[];
  vendors: IVendor[];
  payPeriods: IPayPeriod[];
  invoices: IInvoice[];
  customers: ICustomer[];
  dataInitialized: boolean;
}

const initialState: IDataState = {
  orders: [],
  checks: [],
  vendors: [],
  payPeriods: [],
  invoices: [],
  customers: [],
  dataInitialized: false,
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
    setCustomers: (state, action: PayloadAction<ICustomer[]>) => {
      state.customers = action.payload;
    },
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.unshift(action.payload);
    },
    addVendor: (state, action: PayloadAction<IVendor>) => {
      state.vendors.unshift(action.payload);
    },
    addPayPeriod: (state, action: PayloadAction<IPayPeriod>) => {
      state.payPeriods.unshift(action.payload);
    },
    addInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.invoices.unshift(action.payload);
    },
    addCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customers.unshift(action.payload);
    },
    addCheck: (state, action: PayloadAction<ICheck>) => {
      state.checks.unshift(action.payload);
    },
    dataInitialized: (state) => {
      state.dataInitialized = true;
    },
  },
});

export const getOrders = (state: RootState) => state.data.orders;
export const getChecks = (state: RootState) => state.data.checks;
export const getVendors = (state: RootState) => state.data.vendors;
export const getPayPeriods = (state: RootState) => state.data.payPeriods;
export const getInvoices = (state: RootState) => state.data.invoices;
export const getCustomers = (state: RootState) => state.data.customers;
export const getDataInitialized = (state: RootState) => state.data.dataInitialized;

export const {
  setOrders,
  setChecks,
  setCustomers,
  setInvoices,
  setPayPeriods,
  setVendors,
  addCheck,
  addCustomer,
  addInvoice,
  addOrder,
  addPayPeriod,
  addVendor,
  dataInitialized,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
