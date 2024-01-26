import { memo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabRouteConfig, TabRouteParams } from '@/shared/lib/config/routeConfig/tabRouterConfig';
import { TabButton } from '@/shared/lib/ui/TabButton';
import { Icon } from '@/shared/lib/ui/Icon';

const Tab = createBottomTabNavigator();

interface BottomNavigationProps {
    className?: string;
}

export const BottomNavigation = memo((props: BottomNavigationProps) => {
    const { className } = props;

    const renderWithWrapper = useCallback((route: TabRouteParams) => {
        const {
            icon, selectedIcon, component, name, textLabel,
        } = route;

        return (
            <Tab.Screen
                name={name}
                component={component}
                key={name}
                options={{
                    headerShown: false,
                    tabBarLabel: textLabel,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Icon icon={focused && selectedIcon ? selectedIcon : icon} color={color} />
                    ),
                    tabBarButton: (props) => <TabButton item={route} {...props} />,
                }}
            />
        );
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 10,
                    elevation: 20,
                },
            }}
        >
            {Object.values(tabRouteConfig).map(renderWithWrapper)}
        </Tab.Navigator>
    );
});
