import {
    interpolate, SharedValue, useAnimatedStyle, withTiming,
} from 'react-native-reanimated';

export const useCardAnimation = (
    activeIndex: number,
    index: number,
    translateX: SharedValue<number>,
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

    return {
        rGeneralStyles,
    };
};
