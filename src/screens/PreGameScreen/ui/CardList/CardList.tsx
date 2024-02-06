import {
    FlatList, ListRenderItem, StyleSheet, useWindowDimensions,
} from 'react-native';
import { memo } from 'react';
import { CardItem } from '../CardItem/CardItem';
import { GetCard } from '@/entities/Cards/model/types/getCard';

interface CardListProps {
    className?: string;
    cards: GetCard[];
}

export const CardList = memo((props: CardListProps) => {
    const { className, cards } = props;
    const { height } = useWindowDimensions();

    const getCardItem: ListRenderItem<GetCard> = ({ item }) => {
        return <CardItem item={item} key={item.id} />;
    };

    return (
        <FlatList contentContainerStyle={styles.content} data={cards} renderItem={getCardItem} />
    );
});

const styles = StyleSheet.create({
    content: { gap: 20, padding: 10 },
});
