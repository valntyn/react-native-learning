import { ComponentType } from 'react';
import { Home } from '@/screens/Home/Home';

export enum AppRouter {
    MAIN = 'main',
    ABOUT = 'about',
}

type RootStackParamList = {
    Home: undefined;
    About: undefined;
};

export interface RouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
}

export const RoutePath: Record<AppRouter, keyof RootStackParamList> = {
    [AppRouter.MAIN]: 'Home',
    [AppRouter.ABOUT]: 'About',
};

export const routeConfig: Record<AppRouter, RouteParams> = {
    [AppRouter.MAIN]: {
        name: RoutePath.main,
        component: Home,
    },
    [AppRouter.ABOUT]: {
        name: RoutePath.about,
        component: Home,
    },
};
