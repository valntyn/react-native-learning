import { GetCard } from '@/entities/Cards/model/types/getCard';

export interface CardsGameSchema {
    isStarted: boolean;
    activeIndex: number;
    wrongCount: number;
    correctCount: number;
    activeCard: GetCard | null;
}
