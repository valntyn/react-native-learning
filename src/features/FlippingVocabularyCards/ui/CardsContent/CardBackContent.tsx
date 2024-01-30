import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { cardStyles } from './styles';
import { RNText } from '@/shared/lib/ui/Text';
import { getActiveCard } from '@/features/FlippingVocabularyCards/model/selectors/getCardsGameSelectors';

interface FrontContentProps {
    className?: string;
    item: any;
}

export const CardBackContent = memo((props: FrontContentProps) => {
    const { className, item } = props;
    const activeItem = useSelector(getActiveCard);

    return (
        <View style={cardStyles.card}>
            <RNText text={item.title} family="RobotoBold" />
        </View>
    );
});

const styles = StyleSheet.create({});
