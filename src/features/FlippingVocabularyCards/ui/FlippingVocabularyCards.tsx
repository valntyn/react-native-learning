import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { cardsGameActions, cardsGameReducer } from '../model/slice/flippingCardsSlice';
import {
    getCardIndex,
    getCorrectCount,
    getWrongCount,
} from '../model/selectors/getCardsGameSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { GameButtons } from './GameButtons/GameButtons';
import { GameHeader } from './GameHeader/GameHeader';
import { useAppNavigation, useTabAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { AppRouterEnum } from '@/shared/lib/config/routeConfig/routeConfig';
import { tabRouterEnum } from '@/shared/lib/config/routeConfig/tabRouterConfig';
import { GameCardList } from '@/features/FlippingVocabularyCards/ui/GameCardList/GameCardList';

interface FlippingVocabularyCardsProps {
    data: Card[];
}

const initialReducers: ReducersList = {
    cardGame: cardsGameReducer,
};

export const FlippingVocabularyCards = memo((props: FlippingVocabularyCardsProps) => {
    const { data } = props;

    const dispatch = useAppDispatch();
    const activeIndex = useSelector(getCardIndex);
    const correctCount = useSelector(getCorrectCount);
    const wrongCount = useSelector(getWrongCount);

    const navigation = useAppNavigation();
    const tabNavigation = useTabAppNavigation();

    const onClearGame = useCallback(() => {
        const total = correctCount + wrongCount;

        if (!total) {
            tabNavigation.navigate(tabRouterEnum.VOCABULARY);
            return;
        }

        navigation.navigate(AppRouterEnum.CARD_GAME_RESULT, {
            totalAnswers: total,
            correctAnswers: correctCount,
            totalCards: data.length,
        });
        dispatch(cardsGameActions.clearGame());
    }, [correctCount, data.length, dispatch, navigation, tabNavigation, wrongCount]);

    useEffect(() => {
        const totalAnswers = correctCount + wrongCount;

        if (totalAnswers === data.length) {
            onClearGame();
        }
    }, [correctCount, data.length, onClearGame, wrongCount]);

    const setActiveItem = useCallback(() => {
        dispatch(cardsGameActions.increaseActiveIndex());
        const currentActiveIndex = activeIndex + 1;
        const selectedItem = data[currentActiveIndex];

        if (selectedItem) {
            dispatch(cardsGameActions.setActiveCard(selectedItem));
        }
    }, [activeIndex, data, dispatch]);

    const onStartGame = useCallback(() => {
        dispatch(cardsGameActions.setGameIsStarted(true));
        dispatch(cardsGameActions.setActiveCard(data[0]));
    }, [data, dispatch]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <GameHeader onClearGame={onClearGame} />
            <GameCardList cards={data} setActiveItem={setActiveItem} />
            <GameButtons onClearGame={onClearGame} onStartGame={onStartGame} />
        </DynamicModuleLoader>
    );
});
