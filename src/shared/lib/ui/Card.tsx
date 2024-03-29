import React from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { globalStyles } from '@/app/styles/globalStyles';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
    DEFAULT = 'default',
}

interface CardProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    theme?: CardTheme;
}

export const Card = (props: CardProps) => {
    const {
        theme = CardTheme.NORMAL, children, style, ...otherProps
    } = props;
    return (
        <View style={StyleSheet.flatten([styles.card, styles[theme], style])} {...otherProps}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        elevation: 5,
        padding: 16,
    },
    default: {
        backgroundColor: globalStyles.primaryText,
        borderRadius: 20,
    },
    normal: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    outlined: {
        backgroundColor: 'white',
    },
});
