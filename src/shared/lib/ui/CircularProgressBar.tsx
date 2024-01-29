import React, {
    forwardRef, useCallback, useEffect, useImperativeHandle, useState,
} from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import Animated, {
    runOnJS,
    useAnimatedProps,
    useAnimatedReaction,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { globalStyles } from '@/app/styles/globalStyles';
import { RNText } from '@/shared/lib/ui/Text';

interface CircularProgressBarProps {
    style?: StyleProp<ViewStyle>;
    width: number;
    duration: number;
    onComplete?: () => void;
}

export interface CircularProgressBarRefProps {
    reset: () => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgressBar = forwardRef<
    CircularProgressBarRefProps,
    CircularProgressBarProps
>((props, ref) => {
    const {
        style, width: boxDimension, duration, onComplete, ...otherProps
    } = props;
    const [remainingTime, setRemainingTime] = useState(duration / 1000);

    const progress = useSharedValue(0);
    const CIRCLE_LENGTH = boxDimension * 2;
    const R = CIRCLE_LENGTH / (2 * Math.PI);

    const startTimer = () => {
        return setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
    };

    const reset = useCallback(() => {
        progress.value = 0;
        setRemainingTime(duration / 1000);
    }, []);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    useEffect(() => {
        const intervalId = startTimer();

        return () => clearInterval(intervalId);
    }, []);

    useAnimatedReaction(
        () => {
            return progress.value;
        },
        () => {
            if (progress.value === 1) {
                if (onComplete) {
                    runOnJS(onComplete)();
                }
                progress.value = 0;
                runOnJS(setRemainingTime)(duration / 1000);
            }
        },
        [],
    );

    useEffect(() => {
        progress.value = withTiming(1, { duration });
    }, [duration, onComplete, progress]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    }));

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        text: {
            position: 'absolute',
            textAlign: 'center',
            width: 100,
        },
    });

    return (
        <View style={[styles.container, style]} {...otherProps}>
            <Svg>
                <Circle
                    cx={boxDimension / 2}
                    cy={boxDimension / 2}
                    r={R}
                    fill="transparent"
                    stroke={globalStyles.secondary}
                    strokeWidth={20}
                />
                <AnimatedCircle
                    cx={boxDimension / 2}
                    cy={boxDimension / 2}
                    r={R}
                    stroke={globalStyles.primary}
                    fill="transparent"
                    strokeWidth={10}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                />
            </Svg>
            <RNText
                style={{
                    position: 'absolute',
                }}
                family="InterBold"
                text={`${remainingTime}`}
            />
        </View>
    );
});
