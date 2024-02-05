import {
    FlatList, ListRenderItem, StyleSheet, useWindowDimensions,
} from 'react-native';
import { memo } from 'react';
import { Card } from '@/entities/Cards/model/types/getPack';
import { CardItem } from '../CardItem/CardItem';

interface CardListProps {
    className?: string;
    cards: Card[];
}

export const CardList = memo((props: CardListProps) => {
    const { className, cards } = props;
    const { height } = useWindowDimensions();

    const getCardItem: ListRenderItem<Card> = ({ item }) => {
        return <CardItem item={item} key={item.id} />;
    };

    return (
        <FlatList contentContainerStyle={styles.content} data={cards} renderItem={getCardItem} />
    );
});

const styles = StyleSheet.create({
    content: { gap: 20, padding: 10 },
});
