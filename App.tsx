import { NavigationContainer } from '@react-navigation/native';
import {
    Inter_400Regular as InterRegular,
    Inter_900Black as Inter900Black,
    useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRouter from '@/app/providers/navigation/AppRouter';
import { StoreProvider } from '@/app/providers/StoreProvider';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Inter: Inter900Black,
        InterRegular,
    });
    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <NavigationContainer>
            <StoreProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AppRouter />
                </GestureHandlerRootView>
            </StoreProvider>
        </NavigationContainer>
    );
}
