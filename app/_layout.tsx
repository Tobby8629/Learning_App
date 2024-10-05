import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { useColorScheme } from '@/components/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CourseContext } from '@/components/course/Context';
import UseFetch from '@/components/utils/Hooks/UseFetch';
import ContextWrapper from './ContextWrapper';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Monserrat_Black: require('../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    Monserrat_Light: require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    Monserrat_Thin: require('../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    Monserrat_Medium: require('../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    Monserrat_SemiBold: require('../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    Monserrat_Bold: require('../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryclient = new QueryClient()

  

  return (

      <QueryClientProvider client={queryclient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ContextWrapper />
      </ThemeProvider>
      </QueryClientProvider>
    
  );
}
