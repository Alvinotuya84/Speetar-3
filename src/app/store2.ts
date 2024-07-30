import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type ThemeType = 'light' | 'dark' | 'system';

interface useMainStoreType {
  theme: ThemeType;
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
  setTheme: (theme: ThemeType) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const useMainStore = create(
  persist<useMainStoreType>(
    (set, get) => ({
      theme: 'system',
      setTheme: theme => set({theme}),
      logout: () => {
        set({accessToken: ''});
      },
      accessToken: '',
      setAccessToken: token => set({accessToken: token}),
      onboarded: false,
      setOnboarded: onboarded => set({onboarded}),
      userRestaurants: null,
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useMainStore;
