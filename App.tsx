import { NavigationContainer } from '@react-navigation/native';
import {
    Inter_400Regular as InterRegular400,
    Inter_900Black as InterBlack900,
    useFonts,
} from '@expo-google-fonts/inter';
import {
    RobotoSlab_400Regular as RobotoRegular400,
    RobotoSlab_900Black as RobotoBold900,
} from '@expo-google-fonts/roboto-slab';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { Splash } from '@/shared/lib/ui/Splash';
import AppRouter from '@/app/providers/navigation/AppRouter';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppReady] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        InterBold: InterBlack900,
        InterRegular: InterRegular400,
        RobotoRegular: RobotoRegular400,
        RobotoBold: RobotoBold900,
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
                    <PortalProvider>
                        <AppRouter />
                        <PortalHost name="sheet" />
                    </PortalProvider>
                </GestureHandlerRootView>
            </StoreProvider>
        </NavigationContainer>
    );
}
