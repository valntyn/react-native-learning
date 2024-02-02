import { ComponentType } from 'react';
import { Initial } from '@/screens/Initial';
import { Auth } from '@/screens/Auth/Auth';
import { CardGameScreen } from '@/screens/CardGame';
import { CardGameResult } from '@/screens/CardGameResult';

export enum AppRouterEnum {
    INITIAL = 'Initial',
    AUTH = 'Auth',
    CARD_GAME = 'CardGame',
    CARD_GAME_RESULT = 'CardGameResult',
}

export type RootStackParamList = {
    Initial: undefined;
    Auth: undefined;
    CardGame: { packId: string };
    CardGameResult: { totalAnswers: number; correctAnswers: number; totalCards: number };
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
    [AppRouterEnum.CARD_GAME]: 'CardGame',
    [AppRouterEnum.CARD_GAME_RESULT]: 'CardGameResult',
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
    [AppRouterEnum.CARD_GAME]: {
        name: RoutePath.CardGame,
        component: CardGameScreen,
        showHeader: false,
    },
    [AppRouterEnum.CARD_GAME_RESULT]: {
        name: RoutePath.CardGameResult,
        component: CardGameResult,
        showHeader: false,
    },
};
