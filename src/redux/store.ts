// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import diaryReducer from '../features/diarySlice';
import themeReducer from '../features/themeSlice';
import habitReducer from '../features/habitSlice';
import habitEntriesReducer from '../features/habitEntriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
    theme: themeReducer,
    habits: habitReducer,
    habitEntries: habitEntriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
