import {
    Dimensions, Keyboard, StyleSheet, View,
} from 'react-native';
import {
    forwardRef, ReactNode, useCallback, useImperativeHandle,
} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DismissKeyboard } from '@/shared/lib/components/DissmisKeyboard';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
export const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + SCREEN_HEIGHT / 3.3;

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
        zIndex: 101,
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
            } else if (translateY.value < -SCREEN_HEIGHT / 2) {
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
    }, []);

    const rBackdropStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(active.value ? 1 : 0),
        };
    }, []);

    const rBackDropsProps = useAnimatedProps(() => {
        return {
            pointerEvents: active.value ? 'auto' : 'none',
        } as any;
    });

    const onTouchStart = () => {
        scrollTo(0);
        Keyboard.dismiss();
    };

    return (
        <Portal name="sheet">
            <Animated.View
                animatedProps={rBackDropsProps}
                onTouchStart={onTouchStart}
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 100,
                    },
                    rBackdropStyle,
                ]}
            />
            <GestureDetector gesture={gesture}>
                <DismissKeyboard>
                    <Animated.View
                        className={classNames('', {}, [className])}
                        style={[styles.container, rBottomSheetStyle]}
                    >
                        <View style={styles.line} />
                        {children}
                    </Animated.View>
                </DismissKeyboard>
            </GestureDetector>
        </Portal>
    );
});
