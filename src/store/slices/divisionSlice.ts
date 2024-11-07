import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IDivisionsState {
  divisionSelected: string;
}

const initialState: IDivisionsState = {
  divisionSelected: '',
};

const divisionsSlice = createSlice({
  name: 'divisions',
  initialState,
  reducers: {
    setDivisionSelected: (state, action: PayloadAction<string>) => {
      state.divisionSelected = action.payload;
    },
  },
});

export const getDivisionSelected = (state: RootState) => state.divisions.divisionSelected;

export const { setDivisionSelected } = divisionsSlice.actions;

export const divisionsReducer = divisionsSlice.reducer;
