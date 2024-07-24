import 'react-native-gesture-handler';
import SplashScreen from '@/src/components/SplashScreen';
import Navigation from '@/src/navigation';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
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
    </QueryClientProvider>
  );
};
export default CodePush(App);
