import { NavigationContainer } from '@react-navigation/native';
import {
    Inter_400Regular as InterRegular,
    Inter_900Black as Inter900Black,
    useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { Splash } from '@/shared/lib/ui/Splash';
import AppRouter from '@/app/providers/navigation/AppRouter';
import { globalStyles } from '@/app/styles/globalStyles';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppReady] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        Inter: Inter900Black,
        InterRegular,
    });
    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
            setTimeout(() => setAppReady(true), 2000);
        }
    }, [fontsLoaded, fontError]);

    if (!appIsReady) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Splash />
            </GestureHandlerRootView>
        );
    }

    return (
        <NavigationContainer>
            <StoreProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: globalStyles.background,
                            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                        }}
                    >
                        <AppRouter />
                    </SafeAreaView>
                </GestureHandlerRootView>
            </StoreProvider>
        </NavigationContainer>
    );
}
