import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { themeReducer } from './slices/themeSlice';
import { dataReducer } from './slices/dataSlice';
import { enterCommissionsReducer } from './slices/enterCommissionsSlice';
import { divisionsReducer } from './slices/divisionSlice';
import { commissionDraftReducer } from './slices/commissionDraftSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  data: dataReducer,
  enterCommissions: enterCommissionsReducer,
  divisions: divisionsReducer,
  commissionDraft: commissionDraftReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

const makeStore = () => store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
