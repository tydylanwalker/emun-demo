import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import { RootState } from '../store';

interface IThemeState {
  mode: PaletteMode;
}

const initialState: IThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const getMode = (state: RootState) => state.theme.mode;
export const isModeDark = (state: RootState) => state.theme.mode === 'dark';

export const { setMode, toggleMode } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
