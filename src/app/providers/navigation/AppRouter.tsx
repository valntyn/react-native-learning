import { memo, useCallback } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useSelector } from 'react-redux';
import {
    AppRouterEnum,
    routeConfig,
    RouteParams,
} from '@/shared/lib/config/routeConfig/routeConfig';
import { getUserAuthData } from '@/entities/User';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    const auth = useSelector(getUserAuthData);
    const renderWithWrapper = useCallback((route: RouteParams) => {
        return <Stack.Screen name={route.name} component={route.component} key={route.name} />;
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={auth ? AppRouterEnum.HOME : AppRouterEnum.INITIAL}
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Stack.Navigator>
    );
};

export default memo(AppRouter);
