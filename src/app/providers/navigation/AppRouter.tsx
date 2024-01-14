import { memo, useCallback } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { routeConfig, RouteParams } from '@/shared/lib/config/routeConfig/routeConfig';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RouteParams) => {
        return (
            <Stack.Screen
                name={route.name}
                component={route.component}
                options={{
                    title: 'My home',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        );
    }, []);

    return <Stack.Navigator>{Object.values(routeConfig).map(renderWithWrapper)}</Stack.Navigator>;
};

export default memo(AppRouter);
