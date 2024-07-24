import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {IpLocationResponse} from '../types/locationinfo';
import {Source} from 'react-native-fast-image';
import {ImageSourcePropType} from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';
interface UserIpDetailsType extends IpLocationResponse {
  image: Source | ImageSourcePropType;
}
interface useMainStoreType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  userIpDetails: UserIpDetailsType | null;
  setUserIpDetails: (details: UserIpDetailsType) => void;
}

const useMainStore = create(
  persist<useMainStoreType>(
    (set, get) => ({
      theme: 'system',
      setTheme: theme => set({theme}),
      userIpDetails: null,
      setUserIpDetails: details => set({userIpDetails: details}),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useMainStore;
