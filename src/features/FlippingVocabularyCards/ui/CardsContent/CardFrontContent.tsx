import { StyleSheet, View } from 'react-native';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getActiveCard, getIsGameStarted } from '../../model/selectors/getCardsGameSelectors';
import { RNText } from '@/shared/lib/ui/Text';
import { cardStyles } from '@/widgets/FlippedCard/ui/styles';
import { GetCard } from '@/entities/Cards/model/types/getCard';

interface BackContentProps {
    className?: string;
    index: number;
    item: GetCard;
}

export const CardFrontContent = memo((props: BackContentProps) => {
    const { className, item, index } = props;
    const isGameStarted = useSelector(getIsGameStarted);
    const activeItem = useSelector(getActiveCard);

    const renderText = useCallback(() => {
        let text;

        if (isGameStarted) {
            text = (
                <RNText text={activeItem?.id === item.id ? item.hint : ''} family="RobotoBold" />
            );
        } else {
            text = <RNText text={!index ? 'Press Game to Start' : ''} family="RobotoBold" />;
        }

        return text;
    }, [activeItem?.id, index, isGameStarted, item.hint, item.id]);

    return (
        <View className={classNames('', {}, [className])} style={cardStyles.card}>
            {renderText()}
        </View>
    );
});

const styles = StyleSheet.create({});
