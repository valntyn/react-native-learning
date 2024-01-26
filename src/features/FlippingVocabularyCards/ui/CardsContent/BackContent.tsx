import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { cardStyles } from './styles';
import { getIsGameStarted } from '@/features/FlippingVocabularyCards/model/selectors/getCardsGameSelectors';
import { RNText } from '@/shared/lib/ui/Text';

interface BackContentProps {
    className?: string;
    item: any;
}

export const BackContent = memo((props: BackContentProps) => {
    const { className, item } = props;
    const isGameStarted = useSelector(getIsGameStarted);

    return (
        <View className={classNames('', {}, [className])} style={cardStyles.card}>
            <RNText text={isGameStarted ? item.hint : 'Press Game to start'} family="RobotoBold" />
        </View>
    );
});

const styles = StyleSheet.create({});
