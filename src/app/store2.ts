import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {NearbyRestaurantsResponse} from '../types/locationinfo';
import {Source} from 'react-native-fast-image';
import {ImageSourcePropType} from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface useMainStoreType {
  theme: ThemeType;
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
  setTheme: (theme: ThemeType) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;

  userRestaurants: NearbyRestaurantsResponse['results'] | null;
  setUserRestaurants: (details: NearbyRestaurantsResponse['results']) => void;
  coordinates: {lat: number; lng: number} | null;
  setCoordinates: (coords: {lat: number; lng: number}) => void;
}

const useMainStore = create(
  persist<useMainStoreType>(
    (set, get) => ({
      theme: 'system',
      setTheme: theme => set({theme}),
      accessToken: '',
      setAccessToken: token => set({accessToken: token}),
      onboarded: false,
      setOnboarded: onboarded => set({onboarded}),
      userRestaurants: null,
      setUserRestaurants: details => set({userRestaurants: details}),
      coordinates: null,
      setCoordinates: coords => set({coordinates: coords}),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useMainStore;
