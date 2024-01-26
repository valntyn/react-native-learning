import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsGameSchema } from '../../types/cardsGameSchema';

const initialState: CardsGameSchema = {
    isStarted: false,
};

export const flippingCardsSlice = createSlice({
    name: 'flippingCardsGame',
    initialState,
    reducers: {
        setGameIsStarted: (state, action: PayloadAction<boolean>) => {
            state.isStarted = action.payload;
        },
    },
});

export const { actions: cardsGameActions } = flippingCardsSlice;
export const { reducer: cardsGameReducer } = flippingCardsSlice;
