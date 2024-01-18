import { Dimensions, StyleSheet, View } from 'react-native';
import {
    forwardRef, ReactNode, useCallback, useImperativeHandle,
} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { classNames } from '@/shared/lib/classNames/classNames';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface BottomSheetProps {
    className?: string;
    children: ReactNode;
}

export interface BottomSheetPropsRef {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
    },
    line: {
        alignSelf: 'center',
        backgroundColor: 'grey',
        borderRadius: 2,
        height: 4,
        marginVertical: 15,
        width: 75,
    },
});

export const BottomSheet = forwardRef<BottomSheetPropsRef, BottomSheetProps>((props, ref) => {
    const { className, children } = props;

    const context = useSharedValue({ y: 0 });
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
        'worklet';

        active.value = destination !== 0;

        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
        return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [isActive, scrollTo]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + MAX_TRANSLATE_Y);
        })
        .onEnd(() => {
            if (translateY.value > -SCREEN_HEIGHT / 3) {
                scrollTo(0);
            } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                scrollTo(MAX_TRANSLATE_Y);
            }
        });

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP,
        );

        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                className={classNames('', {}, [className])}
                style={[styles.container, rBottomSheetStyle]}
            >
                <View style={styles.line} />
                {children}
            </Animated.View>
        </GestureDetector>
    );
});
