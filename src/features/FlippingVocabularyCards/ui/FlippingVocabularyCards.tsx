import {
    memo, useCallback, useEffect, useRef,
} from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
    FadeInLeft,
    FadeInUp,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { FlippedCard } from './FlippedCard/FlippedCard';
import {
    CircularProgressBar,
    CircularProgressBarRefProps,
} from '@/shared/lib/ui/CircularProgressBar';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { cardsGameActions, cardsGameReducer } from '../model/slice/flippingCardsSlice';
import {
    getCardIndex,
    getCorrectCount,
    getIsGameStarted,
    getWrongCount,
} from '../model/selectors/getCardsGameSelectors';
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

// todo refactor

export const FlippingVocabularyCards = memo((props: FlippingVocabularyCardsProps) => {
    const { data } = props;
    const { height } = useWindowDimensions();

    const isGameStarted = useSelector(getIsGameStarted);
    const activeIndex = useSelector(getCardIndex);
    const correctCount = useSelector(getCorrectCount);
    const wrongCount = useSelector(getWrongCount);
    const dispatch = useAppDispatch();

    const refTimer = useRef<CircularProgressBarRefProps>(null);

    const setActiveItem = useCallback(() => {
        dispatch(cardsGameActions.increaseActiveIndex());
        refTimer?.current?.reset();
    }, [dispatch]);

    const onClearGame = () => {
        dispatch(cardsGameActions.clearGame());
    };

    const onStartGame = useCallback(() => {
        dispatch(cardsGameActions.setGameIsStarted(true));
    }, [dispatch]);

    const rCardListStyles = useAnimatedStyle(() => {
        const translateY = withTiming(isGameStarted ? height * 0.15 : 0);

        return {
            transform: [
                {
                    translateY,
                },
            ],
        };
    }, [isGameStarted]);

    useEffect(() => {
        if (isGameStarted) {
            dispatch(cardsGameActions.setActiveCard(data[0]));
        }
    }, [dispatch, isGameStarted]);

    useEffect(() => {
        const selectedItem = data[activeIndex];

        if (selectedItem) {
            dispatch(cardsGameActions.setActiveCard(selectedItem));
        }
    }, [activeIndex, data, dispatch]);

    useEffect(() => {
        if (activeIndex === data.length) {
            onClearGame();
        }
    }, [activeIndex, data.length, onClearGame]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            {isGameStarted && (
                <Animated.View
                    entering={FadeInUp.duration(400)}
                    style={{
                        marginBottom: 40,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <View>
                        <RNText text={`Correct ${correctCount.toString()}`} />
                        <RNText text={`Wrong ${wrongCount.toString()}`} />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <RNText text="Time left:" family="InterBold" />
                    </View>
                    <View
                        style={{
                            height: 100,
                            width: 100,
                        }}
                    >
                        <CircularProgressBar
                            ref={refTimer}
                            width={100}
                            duration={15000}
                            onComplete={onClearGame}
                        />
                    </View>
                </Animated.View>
            )}
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
                            item={i}
                            setActiveItem={setActiveItem}
                        />
                    );
                })}
            </Animated.View>
            {isGameStarted ? (
                <RNButton
                    onPress={onClearGame}
                    fullWidth
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        alignSelf: 'center',
                    }}
                >
                    <RNText text="Clear game" family="InterBold" />
                </RNButton>
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
