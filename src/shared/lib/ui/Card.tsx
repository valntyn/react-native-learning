import React from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
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
        margin: 8,
        padding: 16,
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
