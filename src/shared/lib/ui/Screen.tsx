import { memo, ReactNode } from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { globalStyles } from '@/app/styles/globalStyles';

interface ScreenProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const Screen = memo((props: ScreenProps) => {
    const { children, style } = props;

    return <View style={[styles.view, style]}>{children}</View>;
});

const styles = StyleSheet.create({
    view: {
        backgroundColor: globalStyles.background,
        paddingBottom: 120,
        paddingHorizontal: 20,
    },
});
