import { ComponentType } from 'react';
import { Initial } from '@/screens/Initial';
import { Auth } from '@/screens/Auth/Auth';

export enum AppRouterEnum {
    INITIAL = 'Initial',
    AUTH = 'Auth',
}

export type RootStackParamList = {
    Initial: undefined;
    Auth: undefined;
};

export interface RouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
    authOnly?: boolean;
    showHeader?: boolean;
}

export const RoutePath: Record<AppRouterEnum, keyof RootStackParamList> = {
    [AppRouterEnum.INITIAL]: 'Initial',
    [AppRouterEnum.AUTH]: 'Auth',
};

export const routeConfig: Record<AppRouterEnum, RouteParams> = {
    [AppRouterEnum.INITIAL]: {
        name: RoutePath.Initial,
        component: Initial,
        showHeader: false,
    },
    [AppRouterEnum.AUTH]: {
        name: RoutePath.Auth,
        component: Auth,
        showHeader: false,
    },
};
