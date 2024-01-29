import { memo, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
    AppRouterEnum,
    routeConfig,
    RouteParams,
} from '@/shared/lib/config/routeConfig/routeConfig';
import { BottomNavigation } from './BottomNavigation';
import { getUserAuthData } from '@/entities/User';

const Stack = createStackNavigator();

const AppRouter = () => {
    const auth = useSelector(getUserAuthData);

    const renderWithWrapper = useCallback((route: RouteParams) => {
        return (
            <Stack.Screen
                name={route.name}
                component={route.component}
                key={route.name}
                options={{
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
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="root" component={BottomNavigation} />
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Stack.Navigator>
    );
};

export default memo(AppRouter);
