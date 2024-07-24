import {useNavigation} from '@react-navigation/native';
import {
  NavigationRoutes,
  StackNavigationTypes,
} from '../navigation/NavigationRoutes';
type ScreenNames =
  | keyof (typeof NavigationRoutes)['Auth']
  | keyof (typeof NavigationRoutes)['Home'];

export function useSafeNavigation() {
  const navigation = useNavigation<StackNavigationTypes>();

  function navigate(screenName: ScreenNames) {
    const screenNames = Object.values(NavigationRoutes).flatMap(Object.values);

    if (screenNames.includes(screenName)) {
      navigation.navigate(screenName);
    } else {
      console.warn(`The screen "${screenName}" does not exist.`);
    }
  }

  return {navigate};
}
