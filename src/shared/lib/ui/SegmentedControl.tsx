import { memo } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { globalStyles } from '@/app/styles/globalStyles';

interface SegmentedControlProps {
    options: string[];
    selectedOption: string;
    onOptionPress: (selectedOption: string) => void;
    className?: string;
}

export const SegmentedControl = memo((props: SegmentedControlProps) => {
    const {
        className, options, selectedOption, onOptionPress,
    } = props;

    const { width: windowWidth } = useWindowDimensions();

    const onPress = (option: string) => () => {
        if (onOptionPress) {
            onOptionPress?.(option);
        }
    };

    const segmentedControlWidth = windowWidth - 40;
    const internalPadding = 20;
    const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
        return {
            left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2),
        };
    }, [selectedOption]);

    return (
        <View
            style={[
                styles.container,
                {
                    width: segmentedControlWidth,
                    borderRadius: 20,
                    paddingHorizontal: internalPadding / 2,
                },
            ]}
        >
            <Animated.View
                style={[
                    {
                        width: itemWidth,
                    },
                    rStyle,
                    styles.activeBox,
                ]}
            />
            {options.map((option) => {
                return (
                    <TouchableOpacity
                        onPress={onPress(option)}
                        key={option}
                        style={{
                            width: itemWidth,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.labelContainer}>{option}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    activeBox: {
        backgroundColor: globalStyles.secondary,
        borderRadius: 10,
        elevation: 3,
        height: '80%',
        position: 'absolute',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        top: '10%',
        zIndex: 0,
    },
    container: {
        backgroundColor: globalStyles.primary,
        flexDirection: 'row',
        height: 60,
    },
    labelContainer: {
        alignItems: 'center',
        color: globalStyles.primaryText,
        fontFamily: 'InterBold',
        justifyContent: 'center',
    },
});
