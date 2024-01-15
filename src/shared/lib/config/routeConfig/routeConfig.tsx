import { ComponentType } from 'react';
import { Home } from '@/screens/Home/Home';
import { Initial } from '@/screens/Initial/ui/Initial';

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
    },
};
