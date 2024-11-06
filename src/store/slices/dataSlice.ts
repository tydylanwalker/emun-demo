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
  dataInitialized: boolean;
}

const initialState: IDataState = {
  orders: [],
  checks: [],
  vendors: [],
  payPeriods: [],
  invoices: [],
  dataInitialized: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // * ORDER SETTERS
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    stateAddOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.unshift(action.payload);
    },

    // * CHECK SETTERS
    setChecks: (state, action: PayloadAction<ICheck[]>) => {
      state.checks = action.payload;
    },
    stateAddCheck: (state, action: PayloadAction<ICheck>) => {
      state.checks.unshift(action.payload);
    },

    // * VENDOR SETTERS
    setVendors: (state, action: PayloadAction<IVendor[]>) => {
      state.vendors = action.payload;
    },
    stateAddVendor: (state, action: PayloadAction<IVendor>) => {
      state.vendors.unshift(action.payload);
    },

    // * PAY PERIOD SETTERS
    setPayPeriods: (state, action: PayloadAction<IPayPeriod[]>) => {
      state.payPeriods = action.payload;
    },
    stateAddPayPeriod: (state, action: PayloadAction<IPayPeriod>) => {
      state.payPeriods.unshift(action.payload);
    },

    // * INVOICE SETTERS
    setInvoices: (state, action: PayloadAction<IInvoice[]>) => {
      state.invoices = action.payload;
    },
    stateUpdateInvoice: (state, action: PayloadAction<IInvoice>) => {
      const updated = state.invoices.map((invoice) => {
        if (invoice.invoiceNumber === action.payload.invoiceNumber) return action.payload;
        return invoice;
      });
      state.invoices = updated;
    },
    stateAddInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.invoices.unshift(action.payload);
    },
    stateDeleteInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.invoices = state.invoices.filter((invoice) => invoice.guid !== action.payload.guid);
    },
    stateBatchUpdateInvoices: (state, action: PayloadAction<IInvoice[]>) => {
      state.invoices = state.invoices.map((invoice) => {
        const foundInvoice = action.payload.find((payload) => invoice.guid === payload.guid);
        return foundInvoice || invoice;
      });
      // action.payload.forEach((updatedInvoice) => {
      //   const indexToUpdate = state.invoices.findIndex((invoice) => invoice.guid === updatedInvoice.guid);
      //   if (indexToUpdate !== -1)
      //     state.invoices[indexToUpdate] = { ...state.invoices[indexToUpdate], ...updatedInvoice };
      // });
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
export const getDraftInvoices = (state: RootState) =>
  state.data.invoices.filter((invoice) => invoice.posted && invoice.status.toLowerCase() !== 'closed');
export const getDataInitialized = (state: RootState) => state.data.dataInitialized;

export const {
  setOrders,
  setChecks,
  setInvoices,
  stateUpdateInvoice,
  stateDeleteInvoice,
  stateBatchUpdateInvoices,
  setPayPeriods,
  setVendors,
  stateAddCheck,
  stateAddOrder,
  stateAddPayPeriod,
  stateAddVendor,
  dataInitialized,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
