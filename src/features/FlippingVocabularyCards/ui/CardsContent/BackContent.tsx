import { StyleSheet, Text, View } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { cardStyles } from './styles';

interface BackContentProps {
    className?: string;
    item: any;
}

export const BackContent = memo((props: BackContentProps) => {
    const { className, item } = props;

    return (
        <View className={classNames('', {}, [className])} style={cardStyles.card}>
            <Text>{item.hint}</Text>
        </View>
    );
});

const styles = StyleSheet.create({});
