import {
    interpolate, SharedValue, useAnimatedStyle, withTiming,
} from 'react-native-reanimated';

export const useCardAnimation = (
    activeIndex: number,
    index: number,
    translateX: SharedValue<number>,
    rotate: SharedValue<number>,
    maxVisibleItems: number,
    length: number,
) => {
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

    return {
        rGeneralStyles,
        rFrontCardStyles,
        rBackCardStyles,
    };
};
