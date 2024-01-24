import { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Card, CardTheme } from '@/shared/lib/ui/Card';
import { SCREEN_WIDTH, TRANSLATE_X_THRESHOLD } from '@/entities/Todo/todo.config';

interface FlippedCardProps {
    front: ReactNode;
    back: ReactNode;
    activeIndex: SharedValue<number>;
    item: any;
    index?: number;
    length?: number;
}

const maxVisibleItems = 6;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// todo refactor const avoid magic numbers, do not mutate props, refactor card flip to make more reusable

export const FlippedCard = (props: FlippedCardProps) => {
    const {
        front, back, activeIndex, length = 1, index = 1, item,
    } = props;

    const rotate = useSharedValue(1);
    const translateX = useSharedValue(0);

    const rGeneralStyles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            width: '100%',
            opacity: interpolate(
                activeIndex.value,
                [index - 1, index, index + 1],
                [1 - 1 / maxVisibleItems, 1, 1],
            ),
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowRadius: 10,
            shadowOpacity: interpolate(activeIndex.value, [index - 1, index, index + 1], [0, 0, 1]),
            zIndex: length - index,
            transform: [
                { translateX: translateX.value },
                {
                    translateY: interpolate(
                        activeIndex.value,
                        [index - 1, index, index + 1],
                        [-22, 0, 300 + 22],
                        Extrapolation.EXTEND,
                    ),
                },
                {
                    scale: interpolate(
                        activeIndex?.value,
                        [index - 1, index, index + 1],
                        [0.96, 1, 1],
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
                    scale: interpolate(rotate.value, [0, 1], [1, 0.98]),
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
                    scale: interpolate(rotate.value, [1, 0], [1, 0.98]),
                },
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
                },
            ],
        };
    }, [rotate]);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            {
                const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

                if (shouldBeDismissed) {
                    translateX.value = withTiming(-SCREEN_WIDTH);
                } else {
                    translateX.value = withTiming(SCREEN_WIDTH);
                }

                activeIndex.value = withTiming(Math.min(length - 1, activeIndex.value + 1), {
                    duration: 1000,
                });
            }
        },
    });

    return (
        <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={panGesture}>
            <AnimatedPressable
                style={rGeneralStyles}
                onPress={() => {
                    rotate.value = rotate.value ? 0 : 1;
                }}
            >
                <Animated.View style={[styles.frontCard, rFrontCardStyles]}>
                    <Card theme={CardTheme.NORMAL}>{front}</Card>
                </Animated.View>
                <Animated.View style={[styles.backCard, rBackCardStyles]}>
                    <Card theme={CardTheme.NORMAL}>{back}</Card>
                </Animated.View>
            </AnimatedPressable>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    backCard: {
        backfaceVisibility: 'hidden',
    },
    frontCard: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
    },
});
