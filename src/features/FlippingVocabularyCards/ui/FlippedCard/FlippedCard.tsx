import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { memo, useEffect } from 'react';
import { CardFrontContent } from '../CardsContent/CardFrontContent';
import { CardBackContent } from '../CardsContent/CardBackContent';
import { Card } from '@/entities/Cards/model/types/getPack';
import {
    getActiveCard,
    getCardIndex,
    getIsGameStarted,
} from '../../model/selectors/getCardsGameSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { cardsGameActions } from '../../model/slice/flippingCardsSlice';
import { useCardAnimation } from './FlippedCard.hook';
import { useHaptic } from '@/shared/lib/hooks/useHaptic';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

interface FlippedCardProps {
    item: Card;
    setActiveItem: () => void;
    maxVisibleItems?: number;
    index?: number;
    length?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const cardGradientColors = ['#fff', '#f6fafd'];

export const FlippedCard = memo((props: FlippedCardProps) => {
    const {
        length = 1, index = 1, item, setActiveItem, maxVisibleItems = 8,
    } = props;

    const dispatch = useAppDispatch();
    const isGameStarted = useSelector(getIsGameStarted);
    const activeIndex = useSelector(getCardIndex);
    const activeItem = useSelector(getActiveCard);
    const hapticSelectionSuccess = useHaptic('success');
    const hapticSelectionError = useHaptic('error');

    const translateX = useSharedValue(0);
    const rotate = useSharedValue(1);

    useEffect(() => {
        if (!isGameStarted) {
            translateX.value = 0;
            rotate.value = 1;
        }
    }, [isGameStarted, rotate, translateX]);

    const onSwipeCard = async (shouldBeDismissed: boolean) => {
        if (shouldBeDismissed) {
            translateX.value = withTiming(-SCREEN_WIDTH);
            dispatch(cardsGameActions.increaseWrongCount());
            hapticSelectionError?.();
        } else {
            translateX.value = await withTiming(SCREEN_WIDTH);
            dispatch(cardsGameActions.increaseCorrectCount());
            hapticSelectionSuccess?.();
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

    const { rGeneralStyles, rFrontCardStyles, rBackCardStyles } = useCardAnimation(
        activeIndex,
        index,
        translateX,
        rotate,
        maxVisibleItems,
        length,
    );

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
                    <LinearGradient colors={cardGradientColors} style={styles.linerGradient}>
                        <CardBackContent item={item} />
                    </LinearGradient>
                </Animated.View>
                <Animated.View style={[styles.backCard, rBackCardStyles]}>
                    <LinearGradient colors={cardGradientColors} style={styles.linerGradient}>
                        <CardFrontContent item={item} />
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
    linerGradient: { borderRadius: 8, flex: 1 },
});
