export interface Card {
    id: number;
    title: string;
    hint: string;
}

export interface GetPack {
    id: string;
    title: string;
    cards: Card[];
}
