// src/app/store.ts

import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import themeReducer from '../app/features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
