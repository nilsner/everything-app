// src/features/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  colorScheme: 'light' | 'dark';
  backgroundImage: string;
}

const initialState: ThemeState = {
  colorScheme: 'light',
  backgroundImage: '',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.colorScheme = action.payload;
    },
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      state.backgroundImage = action.payload;
    },
  },
});

export const { setColorScheme, setBackgroundImage } = themeSlice.actions;
export default themeSlice.reducer;
