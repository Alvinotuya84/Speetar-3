// src/features/theme/themeSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '@src/app/store';
const THEME_STORAGE_KEY = 'selectedTheme';

interface ThemeState {
  selectedTheme: 'light' | 'dark';
}

const initialState: ThemeState = {
  selectedTheme: 'light', // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.selectedTheme = action.payload;
      AsyncStorage.setItem(THEME_STORAGE_KEY, action.payload);
    },
    loadThemeFromStorage: state => {
      AsyncStorage.getItem(THEME_STORAGE_KEY)
        .then(savedTheme => {
          if (savedTheme) {
            state.selectedTheme = savedTheme as 'light' | 'dark';
          }
        })
        .catch(error => {
          console.error('Error loading theme from AsyncStorage:', error);
        });
    },
  },
});

export const {setTheme, loadThemeFromStorage} = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.selectedTheme;

export default themeSlice.reducer;
