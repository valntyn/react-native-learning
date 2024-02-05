import { useWindowDimensions } from 'react-native';
import { memo } from 'react';
import Animated, { FadeInLeft, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Card } from '@/entities/Cards/model/types/getPack';
import { getIsGameStarted } from '../../model/selectors/getCardsGameSelectors';
import { GameFlippedCard } from '../GameFlippedCard/GameFlippedCard';

interface FlippedCardListProps {
    className?: string;
    cards: Card[];
    setActiveItem: () => void;
}

export const GameCardList = memo((props: FlippedCardListProps) => {
    const { className, cards, setActiveItem } = props;
    const { height } = useWindowDimensions();

    const isGameStarted = useSelector(getIsGameStarted);

    const rCardListStyles = useAnimatedStyle(() => {
        const translateY = withTiming(isGameStarted ? height * 0.1 : 0);

        return {
            transform: [
                {
                    translateY,
                },
            ],
        };
    }, [isGameStarted]);

    return (
        <Animated.View
            style={[{ width: '100%', height: height * 0.3, marginTop: 20 }, rCardListStyles]}
            entering={FadeInLeft.duration(400)}
        >
            {cards.map((i, index) => {
                return (
                    <GameFlippedCard
                        key={i.id}
                        index={index}
                        length={cards.length}
                        item={i}
                        setActiveItem={setActiveItem}
                    />
                );
            })}
        </Animated.View>
    );
});
