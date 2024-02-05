import { ReactNode } from 'react';
import {
    DimensionValue,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { globalStyles } from '@/app/styles/globalStyles';

type Theme = 'initial' | 'secondary' | 'outlined';
type Size = 'm' | 'l';

interface RNButtonProps extends TouchableOpacityProps {
    children: ReactNode;
    theme?: Theme;
    disabled?: boolean;
    border?: number;
    fullWidth?: boolean;
    center?: boolean;
    width?: DimensionValue;
    height?: number;
    textSize?: Size;
    style?: StyleProp<ViewStyle>;
}

export const bgColors: Record<Theme, string> = {
    initial: globalStyles.primaryText,
    secondary: globalStyles.secondary,
    outlined: 'transparent',
};

const textColors: Record<Theme, string> = {
    initial: globalStyles.secondary,
    secondary: globalStyles.primaryText,
    outlined: globalStyles.secondary,
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
        disabled = false,
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
            {children}
        </TouchableOpacity>
    );
};
