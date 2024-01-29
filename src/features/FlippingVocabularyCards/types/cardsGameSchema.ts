import { Card } from '@/entities/Cards/model/types/getPack';

export interface CardsGameSchema {
    isStarted: boolean;
    activeIndex: number;
    wrongCount: number;
    correctCount: number;
    activeCard: Card | null;
}
