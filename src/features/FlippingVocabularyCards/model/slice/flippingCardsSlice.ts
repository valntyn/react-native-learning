import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsGameSchema } from '../../types/cardsGameSchema';
import { GetCard } from '@/entities/Cards/model/types/getCard';

const initialState: CardsGameSchema = {
    isStarted: false,
    activeIndex: 0,
    activeCard: null,
    correctCount: 0,
    wrongCount: 0,
};

export const flippingCardsSlice = createSlice({
    name: 'flippingCardsGame',
    initialState,
    reducers: {
        setGameIsStarted: (state, action: PayloadAction<boolean>) => {
            state.isStarted = action.payload;
        },
        increaseActiveIndex: (state) => {
            state.activeIndex += 1;
        },
        increaseCorrectCount: (state) => {
            state.correctCount += 1;
        },
        increaseWrongCount: (state) => {
            state.wrongCount += 1;
        },
        setActiveCard: (state, action: PayloadAction<GetCard>) => {
            state.activeCard = action.payload;
        },
        clearGame: (state) => {
            state.wrongCount = initialState.wrongCount;
            state.correctCount = initialState.correctCount;
            state.activeCard = initialState.activeCard;
            state.activeIndex = initialState.activeIndex;
            state.isStarted = initialState.isStarted;
        },
    },
});

export const { actions: cardsGameActions } = flippingCardsSlice;
export const { reducer: cardsGameReducer } = flippingCardsSlice;
