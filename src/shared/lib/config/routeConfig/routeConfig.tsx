import { ComponentType } from 'react';
import { Initial } from '@/screens/Initial';
import { Home } from '@/screens/Home';

export enum AppRouterEnum {
    HOME = 'Home',
    INITIAL = 'Initial',
}

export type RootStackParamList = {
    Home: undefined;
    Initial: undefined;
};

export interface RouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
    authOnly?: boolean;
    showHeader?: boolean;
}

export const RoutePath: Record<AppRouterEnum, keyof RootStackParamList> = {
    [AppRouterEnum.HOME]: 'Home',
    [AppRouterEnum.INITIAL]: 'Initial',
};

export const routeConfig: Record<AppRouterEnum, RouteParams> = {
    [AppRouterEnum.HOME]: {
        name: RoutePath.Home,
        component: Home,
    },
    [AppRouterEnum.INITIAL]: {
        name: RoutePath.Initial,
        component: Initial,
        showHeader: false,
    },
};
