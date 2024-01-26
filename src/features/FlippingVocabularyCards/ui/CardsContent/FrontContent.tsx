import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { cardStyles } from './styles';
import { RNText } from '@/shared/lib/ui/Text';

interface FrontContentProps {
    className?: string;
    item: any;
}

export const FrontContent = memo((props: FrontContentProps) => {
    const { className, item } = props;

    return (
        <View style={cardStyles.card}>
            <RNText text={item.title} family="RobotoBold" />
        </View>
    );
});

const styles = StyleSheet.create({});
