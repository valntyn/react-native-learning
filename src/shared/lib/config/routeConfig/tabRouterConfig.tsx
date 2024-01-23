import { ComponentType } from 'react';
import { Home } from '@/screens/Home';
import { SimpleTodo } from '@/screens/SimpleTodo';
import { Profile } from '@/screens/Profile';
import { IconProps, IconType } from '@/shared/lib/ui/Icon';

export enum tabRouterEnum {
    HOME = 'Home',
    TODO = 'Todo',
    PROFILE = 'Profile',
}

export type RootStackParamList = {
    Home: undefined;
    Todo: undefined;
    Profile: undefined;
};

export interface TabRouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
    icon: IconProps['icon'];
    selectedIcon?: IconProps['icon'];
    textLabel: string;
    iconSize?: number;
}

export const RoutePath: Record<tabRouterEnum, keyof RootStackParamList> = {
    [tabRouterEnum.HOME]: 'Home',
    [tabRouterEnum.TODO]: 'Todo',
    [tabRouterEnum.PROFILE]: 'Profile',
};

export const tabRouteConfig: Record<tabRouterEnum, TabRouteParams> = {
    [tabRouterEnum.HOME]: {
        name: RoutePath.Home,
        component: Home,
        icon: { iconName: 'grid', type: IconType.Ionicon },
        iconSize: 32,
        textLabel: 'Home',
    },
    [tabRouterEnum.TODO]: {
        name: RoutePath.Todo,
        component: SimpleTodo,
        icon: { iconName: 'list', type: IconType.MaterialIcon },
        iconSize: 32,
        textLabel: 'My Todos',
    },
    [tabRouterEnum.PROFILE]: {
        name: RoutePath.Profile,
        component: Profile,
        icon: { iconName: 'user', type: IconType.FontAwesomeIcon },
        selectedIcon: { iconName: 'user-alt', type: IconType.FontAwesomeIcon },
        iconSize: 32,
        textLabel: 'Profile',
    },
};
