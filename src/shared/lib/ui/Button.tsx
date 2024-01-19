import { ReactNode } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Theme = 'initial' | 'secondary';
type Size = 'm' | 'l';

interface RNButtonProps extends TouchableOpacityProps {
    children: ReactNode;
    theme?: Theme;
    disabled?: boolean;
    border?: number;
    fullWidth?: boolean;
    center?: boolean;
    width?: number;
    height?: number;
    textSize?: Size;
    style?: StyleProp<ViewStyle>;
}

const bgColors: Record<Theme, string> = {
    initial: '#2563eb',
    secondary: '#f1f5f9',
};

const textColors: Record<Theme, string> = {
    initial: '#f1f5f9',
    secondary: '#2563eb',
};

const size: Record<Size, number> = {
    m: 16,
    l: 20,
};

export const RNButton = (props: RNButtonProps) => {
    const {
        children,
        theme = 'initial',
        height = 40,
        width = 20,
        disabled,
        border = 16,
        fullWidth,
        textSize = 'm',
        center = false,
        onPress,
        style,
        ...otherProps
    } = props;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: bgColors[theme],
            borderRadius: border || 0,
            borderWidth: 0,
            justifyContent: 'center',
            padding: 10,
        },
        buttonText: {
            color: textColors[theme],
            fontSize: size[textSize],
        },
        centerButton: {
            alignSelf: 'center',
        },
        disabledButton: {
            opacity: 0.5,
        },
        fullwidthButton: {
            width: '100%',
        },
        height: {
            height,
        },
        width: {
            width,
        },
    });

    const buttonStyles = [
        styles.button,
        styles.height,
        styles.width,
        fullWidth && styles.fullwidthButton,
        center && styles.centerButton,
        disabled && styles.disabledButton,
    ];

    return (
        <TouchableOpacity
            style={[buttonStyles, style]}
            disabled={disabled}
            onPress={onPress}
            {...otherProps}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
};
