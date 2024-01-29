import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsGameStarted = (state: StateSchema) => state?.cardGame?.isStarted || false;
export const getCardIndex = (state: StateSchema) => state?.cardGame?.activeIndex || 0;
export const getActiveCard = (state: StateSchema) => state?.cardGame?.activeCard || null;
export const getCorrectCount = (state: StateSchema) => state?.cardGame?.correctCount || 0;
export const getWrongCount = (state: StateSchema) => state?.cardGame?.wrongCount || 0;
