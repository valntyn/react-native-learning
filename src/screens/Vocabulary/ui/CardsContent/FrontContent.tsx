import { StyleSheet, Text, View } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { cardStyles } from '@/screens/Vocabulary/ui/CardsContent/styles';

interface FrontContentProps {
    className?: string;
    item: any;
}

export const FrontContent = memo((props: FrontContentProps) => {
    const { className, item } = props;

    return (
        <View className={classNames('', {}, [className])} style={cardStyles.card}>
            <Text>{item.title}</Text>
        </View>
    );
});

const styles = StyleSheet.create({});
