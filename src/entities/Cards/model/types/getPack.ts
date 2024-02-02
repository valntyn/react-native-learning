export interface Card {
    id: number;
    word: string;
    hint: string;
}

export interface GetPack {
    id: string;
    title: string;
    cards: Card[];
}
