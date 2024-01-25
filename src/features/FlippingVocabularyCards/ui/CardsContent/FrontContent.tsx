import { StyleSheet, Text, View } from 'react-native';
import { memo } from 'react';
import { cardStyles } from './styles';

interface FrontContentProps {
    className?: string;
    item: any;
}

export const FrontContent = memo((props: FrontContentProps) => {
    const { className, item } = props;

    return (
        <View style={cardStyles.card}>
            <Text>{item.title}</Text>
        </View>
    );
});

const styles = StyleSheet.create({});
