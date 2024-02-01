import { memo, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
    AppRouterEnum,
    routeConfig,
    RouteParams,
} from '@/shared/lib/config/routeConfig/routeConfig';
import { BottomNavigation } from './BottomNavigation';
import { getUserAuthData } from '@/entities/User';
import { Spinner } from '@/shared/lib/ui/Spinner';
import { gradientColors } from '@/shared/lib/ui/Screen';

const Stack = createStackNavigator();

const AppRouter = () => {
    const auth = useSelector(getUserAuthData);

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const renderWithWrapper = useCallback((route: RouteParams) => {
        return (
            <Stack.Screen
                name={route.name}
                component={route.component}
                key={route.name}
                options={{
                    cardStyleInterpolator: forFade,
                    headerShown: route.showHeader,
                    headerLeft: (props) => null,
                    gestureEnabled: false,
                }}
            />
        );
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={auth ? 'root' : AppRouterEnum.INITIAL}
            screenOptions={{
                presentation: 'modal',
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlay: () => (
                    <LinearGradient
                        style={{ flex: 1 }}
                        colors={[gradientColors.firstA, gradientColors.firstB]}
                    >
                        <Spinner />
                    </LinearGradient>
                ),
            }}
        >
            <Stack.Screen name="root" component={BottomNavigation} />
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Stack.Navigator>
    );
};

export default memo(AppRouter);
