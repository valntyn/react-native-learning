import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    runOnJS,
    SharedValue,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { GetVocabulary } from '@/screens/Vocabulary/ui/VocabularyScreen';
import { BackContent } from '@/features/FlippingVocabularyCards/ui/CardsContent/BackContent';
import { FrontContent } from '@/features/FlippingVocabularyCards/ui/CardsContent/FrontContent';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

interface FlippedCardProps {
    activeIndex: SharedValue<number>;
    activeItem: GetVocabulary | null;
    item: GetVocabulary;
    setActiveItem: () => void;
    maxVisibleItems?: number;
    index?: number;
    length?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FlippedCard = (props: FlippedCardProps) => {
    const {
        activeIndex,
        length = 1,
        index = 1,
        activeItem,
        item,
        setActiveItem,
        maxVisibleItems = 4,
    } = props;

    const translateX = useSharedValue(0);
    const rotate = useSharedValue(1);

    const rGeneralStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                activeIndex.value,
                [index - 1, index, index + 1],
                [1 - 0.5 / maxVisibleItems, 1, 1],
            ),
            zIndex: length - index,
            transform: [
                { translateX: translateX.value },
                {
                    translateY: withTiming(
                        interpolate(activeIndex.value, [index - 1, index, index + 1], [-14, 0, 0]),
                    ),
                },
                {
                    scale: withTiming(
                        interpolate(activeIndex?.value, [index - 1, index, index + 1], [0.96, 1, 1]),
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

            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
            } else {
                translateX.value = withTiming(SCREEN_WIDTH);
            }

            activeIndex.value += 1;
            runOnJS(setActiveItem)();
        },
    });

    const rCardProps = useAnimatedProps(() => {
        return {
            pointerEvents: activeItem?.id === item.id ? 'auto' : 'none',
        } as any;
    });

    const onRotate = () => {
        rotate.value = rotate.value ? 0 : 1;
    };

    const gradientColors = ['#fff', '#f6fafd'];

    return (
        <PanGestureHandler
            activeOffsetX={[-10, 10]}
            onGestureEvent={panGesture}
            enabled={activeItem?.id === item.id}
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
};

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
