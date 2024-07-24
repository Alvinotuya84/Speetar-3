import 'react-native-gesture-handler';
import {store} from '@/src/app/store';
import SplashScreen from '@/src/components/SplashScreen';
import Navigation from '@/src/navigation';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {ToastProvider} from './src/components/toast-manager';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CodePush from 'react-native-code-push';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <ToastProvider>
            <View style={styles.container}>
              <Navigation />

              {splashScreenVisible && (
                <SplashScreen
                  onAnimationEnd={() => {
                    setSplashScreenVisible(false);
                  }}
                />
              )}
            </View>
          </ToastProvider>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};
export default CodePush(App);
