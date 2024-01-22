import React, { useState } from 'react';
import {
    StyleProp, StyleSheet, Text, TextInput, ViewStyle,
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface InputProps {
    value?: string;
    onChange?: (text: string) => void;
    placeholder?: string;
    autofocus?: boolean;
    readonly?: boolean;
    onFocusChange?: (isFocused: boolean) => void;
    style?: StyleProp<ViewStyle>;
}

export const Input = (props: InputProps) => {
    const {
        value, onChange, placeholder, autofocus, readonly, style, onFocusChange,
    } = props;
    const [isFocused, setIsFocused] = useState(false);

    const translateY = useSharedValue(0);

    const onFocus = () => {
        translateY.value = withTiming(-25);
        setIsFocused(true);
        onFocusChange?.(true);
    };

    const onBlur = () => {
        if (!value) {
            translateY.value = withTiming(0);
        }
        setIsFocused(false);
        onFocusChange?.(false);
    };

    const onChangeText = (text: string) => {
        onChange?.(text);
    };

    const rLabelStyle = useAnimatedStyle(() => {
        const translateX = interpolate(translateY.value, [-25, 0], [-20, 0], Extrapolate.CLAMP);
        return { transform: [{ translateY: translateY.value }, { translateX }] };
    }, []);

    const rBorderStyle = useAnimatedStyle(() => {
        return { borderColor: withTiming(isFocused ? 'blue' : 'grey') };
    }, [isFocused]);

    return (
        <Animated.View style={[styles.inputWrapper, rBorderStyle, style]}>
            <Animated.View style={[styles.labelWrapper, rLabelStyle]}>
                <Text style={styles.label}>{placeholder}</Text>
            </Animated.View>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus={autofocus}
                editable={!readonly}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
    inputWrapper: {
        borderBottomWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelWrapper: {
        padding: 20,
        position: 'absolute',
    },
});
