import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/lib/ui/Text';
import { getActiveCard } from '../../model/selectors/getCardsGameSelectors';
import { Card } from '@/entities/Cards/model/types/getPack';
import { cardStyles } from '@/widgets/FlippedCard/ui/styles';

interface FrontContentProps {
    className?: string;
    item: Card;
}

export const CardBackContent = memo((props: FrontContentProps) => {
    const { className, item } = props;
    const activeItem = useSelector(getActiveCard);

    return (
        <View style={cardStyles.card}>
            <RNText text={item.word} family="RobotoBold" />
        </View>
    );
});

const styles = StyleSheet.create({});
