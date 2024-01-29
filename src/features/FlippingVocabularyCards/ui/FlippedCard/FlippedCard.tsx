import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { memo, useEffect } from 'react';
import { BackContent } from '@/features/FlippingVocabularyCards/ui/CardsContent/BackContent';
import { FrontContent } from '@/features/FlippingVocabularyCards/ui/CardsContent/FrontContent';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    getActiveCard,
    getCardIndex,
    getIsGameStarted,
} from '../../model/selectors/getCardsGameSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { cardsGameActions } from '@/features/FlippingVocabularyCards/model/slice/flippingCardsSlice';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

interface FlippedCardProps {
    item: Card;
    setActiveItem: () => void;
    maxVisibleItems?: number;
    index?: number;
    length?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FlippedCard = memo((props: FlippedCardProps) => {
    const {
        length = 1, index = 1, item, setActiveItem, maxVisibleItems = 8,
    } = props;

    const dispatch = useAppDispatch();
    const isGameStarted = useSelector(getIsGameStarted);
    const activeIndex = useSelector(getCardIndex);
    const activeItem = useSelector(getActiveCard);

    const translateX = useSharedValue(0);
    const rotate = useSharedValue(1);

    useEffect(() => {
        if (!isGameStarted) {
            translateX.value = 0;
            rotate.value = 1;
        }
    }, [isGameStarted, rotate, translateX]);

    const rGeneralStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                activeIndex,
                [index - 1, index, index + 1],
                [1 - 0.5 / maxVisibleItems, 1, 1],
            ),
            zIndex: length - index,
            transform: [
                { translateX: translateX.value },
                {
                    translateY: withTiming(
                        interpolate(activeIndex, [index - 1, index, index + 1], [-14, 0, 0]),
                    ),
                },
                {
                    scale: withTiming(
                        interpolate(activeIndex, [index - 1, index, index + 1], [0.96, 1, 1]),
                    ),
                },
            ],
        };
    }, [activeIndex]);

    const rFrontCardStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    scale: withTiming(interpolate(rotate.value, [0, 1], [1, 0.95, 1])),
                },
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
                },
            ],
        };
    }, [rotate]);

    const rBackCardStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    scale: withTiming(interpolate(rotate.value, [1, 0], [1, 0.95, 1])),
                },
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
                },
            ],
        };
    }, [rotate]);

    const onSwipeCard = (shouldBeDismissed: boolean) => {
        if (shouldBeDismissed) {
            translateX.value = withTiming(-SCREEN_WIDTH);
            dispatch(cardsGameActions.increaseWrongCount());
        } else {
            translateX.value = withTiming(SCREEN_WIDTH);
            dispatch(cardsGameActions.increaseCorrectCount());
        }

        setActiveItem();
    };

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            if (Math.abs(translateX.value) / 2 < Math.abs(TRANSLATE_X_THRESHOLD)) {
                translateX.value = withTiming(0);
                return;
            }

            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

            runOnJS(onSwipeCard)(shouldBeDismissed);
        },
    });

    const rCardProps = useAnimatedProps(() => {
        return {
            pointerEvents: activeItem?.id === item.id && isGameStarted ? 'auto' : 'none',
        } as any;
    });

    const onRotate = () => {
        rotate.value = rotate.value ? 0 : 1;
    };

    const isActiveCardVisible = () => {
        return activeItem?.id === item.id;
    };

    const gradientColors = ['#fff', '#f6fafd'];

    return (
        <PanGestureHandler
            activeOffsetX={[-10, 10]}
            onGestureEvent={panGesture}
            enabled={isActiveCardVisible()}
        >
            <AnimatedPressable
                style={[rGeneralStyles, styles.container]}
                animatedProps={rCardProps}
                onPress={onRotate}
            >
                <Animated.View style={[styles.frontCard, rFrontCardStyles]}>
                    <LinearGradient colors={gradientColors} style={{ flex: 1, borderRadius: 8 }}>
                        <FrontContent item={item} />
                    </LinearGradient>
                </Animated.View>
                <Animated.View style={[styles.backCard, rBackCardStyles]}>
                    <LinearGradient colors={gradientColors} style={{ flex: 1, borderRadius: 8 }}>
                        <BackContent item={item} />
                    </LinearGradient>
                </Animated.View>
            </AnimatedPressable>
        </PanGestureHandler>
    );
});

const styles = StyleSheet.create({
    backCard: {
        backfaceVisibility: 'hidden',
    },
    container: {
        position: 'absolute',
        width: '100%',
    },
    frontCard: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
    },
});
