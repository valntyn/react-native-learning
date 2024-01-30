import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { cardsGameActions, cardsGameReducer } from '../model/slice/flippingCardsSlice';
import { getCardIndex } from '../model/selectors/getCardsGameSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { GameButtons } from './GameButtons/GameButtons';
import { FlippedCardList } from './FlippedCardList/FlippedCardList';
import { GameHeader } from './GameHeader/GameHeader';

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

    const onClearGame = useCallback(() => {
        dispatch(cardsGameActions.clearGame());
    }, [dispatch]);

    const setActiveItem = useCallback(() => {
        dispatch(cardsGameActions.increaseActiveIndex());
        const currentActiveIndex = activeIndex + 1;
        const selectedItem = data[currentActiveIndex];

        if (selectedItem) {
            dispatch(cardsGameActions.setActiveCard(selectedItem));
        }
        if (currentActiveIndex === data.length) {
            onClearGame();
        }
    }, [activeIndex, data, dispatch, onClearGame]);

    const onStartGame = useCallback(() => {
        dispatch(cardsGameActions.setGameIsStarted(true));
        dispatch(cardsGameActions.setActiveCard(data[0]));
    }, [data, dispatch]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <GameHeader onClearGame={onClearGame} />
            <FlippedCardList cards={data} setActiveItem={setActiveItem} />
            <GameButtons onClearGame={onClearGame} onStartGame={onStartGame} />
        </DynamicModuleLoader>
    );
});