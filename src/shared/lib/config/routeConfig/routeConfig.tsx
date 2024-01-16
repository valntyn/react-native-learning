import { ComponentType } from 'react';
import { Initial } from '@/screens/Initial';
import { Home } from '@/screens/Home';
import { SimpleTodo } from '@/screens/SimpleTodo';

export enum AppRouterEnum {
  HOME = 'Home',
  INITIAL = 'Initial',
  TODO = 'Todo',
}

export type RootStackParamList = {
  Home: undefined;
  Initial: undefined;
  Todo: undefined;
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
    [AppRouterEnum.TODO]: 'Todo',
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
    [AppRouterEnum.TODO]: {
        name: RoutePath.Todo,
        component: SimpleTodo,
        showHeader: true,
    },
};
