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
}

const initialState: IDataState = {
  orders: [],
  checks: [],
  vendors: [],
  payPeriods: [],
  invoices: [],
  customers: [],
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
  },
});

export const getOrders = (state: RootState) => state.data.orders;
export const getChecks = (state: RootState) => state.data.checks;
export const getVendors = (state: RootState) => state.data.vendors;
export const getPayPeriods = (state: RootState) => state.data.payPeriods;
export const getInvoices = (state: RootState) => state.data.invoices;
export const getCustomers = (state: RootState) => state.data.customers;

export const { setOrders, setChecks, setCustomers, setInvoices, setPayPeriods, setVendors } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
