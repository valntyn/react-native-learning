import { memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface ScreenProps {
    children: ReactNode;
}

export const Screen = memo((props: ScreenProps) => {
    const { children } = props;

    return <View style={styles.view}>{children}</View>;
});

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
});
