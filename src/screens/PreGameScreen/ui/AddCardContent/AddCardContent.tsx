import {
    StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AddCardContentProps {
    className?: string;
}

export const AddCardContent = memo((props: AddCardContentProps) => {
    const { className } = props;
    const { height } = useWindowDimensions();

    return (
        <View className={classNames('', {}, [className])}>
            <Text>AddCardContent</Text>
        </View>
    );
});

const styles = StyleSheet.create({});
