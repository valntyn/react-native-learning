import { memo, useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
    FadeInLeft,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { FlippedCard } from './FlippedCard/FlippedCard';
import { CircularProgressBar } from '@/shared/lib/ui/CircularProgressBar';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { cardsGameActions, cardsGameReducer } from '../model/slice/flippingCardsSlice';
import { getIsGameStarted } from '../model/selectors/getCardsGameSelectors';
import { RNButton } from '@/shared/lib/ui/Button';
import { RNText } from '@/shared/lib/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

const styles = StyleSheet.create({});

interface FlippingVocabularyCardsProps {
    data: Card[];
}

const initialReducers: ReducersList = {
    cardGame: cardsGameReducer,
};

export const FlippingVocabularyCards = memo((props: FlippingVocabularyCardsProps) => {
    const { data } = props;
    const { height } = useWindowDimensions();

    const isGameStarted = useSelector(getIsGameStarted);
    const dispatch = useAppDispatch();

    const activeIndex = useSharedValue(0);
    const [activeCard, setActiveCard] = useState<Card>(data[activeIndex.value]);

    const setActiveItem = useCallback(() => {
        setActiveCard(data[activeIndex.value]);
    }, [activeIndex.value, data]);

    const onComplete = () => {
        console.warn('123');
    };

    const onStartGame = useCallback(() => {
        dispatch(cardsGameActions.setGameIsStarted(true));
    }, [dispatch]);

    const rCardListStyles = useAnimatedStyle(() => {
        const translateY = withTiming(isGameStarted ? 100 : 0);

        return {
            transform: [
                {
                    translateY,
                },
            ],
        };
    }, [isGameStarted]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <Animated.View
                style={[{ width: '100%', height: height * 0.3, marginTop: 20 }, rCardListStyles]}
                entering={FadeInLeft.duration(400)}
            >
                {data.map((i, index) => {
                    return (
                        <FlippedCard
                            key={i.id}
                            index={index}
                            length={data.length}
                            activeIndex={activeIndex}
                            item={i}
                            activeItem={activeCard}
                            setActiveItem={setActiveItem}
                        />
                    );
                })}
            </Animated.View>
            {isGameStarted ? (
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        height: 100,
                        width: 100,
                    }}
                >
                    <CircularProgressBar width={100} duration={10000} onComplete={onComplete} />
                </View>
            ) : (
                <RNButton
                    onPress={onStartGame}
                    fullWidth
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        alignSelf: 'center',
                    }}
                >
                    <RNText text="Game" family="InterBold" />
                </RNButton>
            )}
        </DynamicModuleLoader>
    );
});
