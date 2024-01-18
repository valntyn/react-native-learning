import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
    AppRouterEnum,
    routeConfig,
    RouteParams,
} from '@/shared/lib/config/routeConfig/routeConfig';
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
                }}
            />
        );
    }, []);

    return (
        <Stack.Navigator initialRouteName={auth ? AppRouterEnum.HOME : AppRouterEnum.INITIAL}>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Stack.Navigator>
    );
};

export default memo(AppRouter);
