import {
    memo, useCallback, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressBarRefProps } from '@/shared/lib/ui/CircularProgressBar';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { cardsGameActions, cardsGameReducer } from '../model/slice/flippingCardsSlice';
import { getCardIndex, getIsGameStarted } from '../model/selectors/getCardsGameSelectors';
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
    const isGameStarted = useSelector(getIsGameStarted);
    const activeIndex = useSelector(getCardIndex);

    const refTimer = useRef<CircularProgressBarRefProps>(null);

    const setActiveItem = useCallback(() => {
        dispatch(cardsGameActions.increaseActiveIndex());
        refTimer?.current?.reset();
    }, [dispatch]);

    const onClearGame = useCallback(() => {
        dispatch(cardsGameActions.clearGame());
    }, [dispatch]);

    const onStartGame = useCallback(() => {
        dispatch(cardsGameActions.setGameIsStarted(true));
    }, [dispatch]);

    useEffect(() => {
        if (isGameStarted) {
            dispatch(cardsGameActions.setActiveCard(data[0]));
        }
    }, [data, dispatch, isGameStarted]);

    useEffect(() => {
        const selectedItem = data[activeIndex];

        if (selectedItem) {
            dispatch(cardsGameActions.setActiveCard(selectedItem));
        }
    }, [activeIndex, data, dispatch]);

    useEffect(() => {
        if (activeIndex === data.length) {
            onClearGame();
        }
    }, [activeIndex, data.length, onClearGame]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <GameHeader onClearGame={onClearGame} refTimer={refTimer} />
            <FlippedCardList cards={data} setActiveItem={setActiveItem} />
            <GameButtons onClearGame={onClearGame} onStartGame={onStartGame} />
        </DynamicModuleLoader>
    );
});
