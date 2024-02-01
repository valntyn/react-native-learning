import { StyleSheet, View } from 'react-native';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { cardStyles } from './styles';
import { getActiveCard, getIsGameStarted } from '../../model/selectors/getCardsGameSelectors';
import { RNText } from '@/shared/lib/ui/Text';

interface BackContentProps {
    className?: string;
    item: any;
}

export const CardFrontContent = memo((props: BackContentProps) => {
    const { className, item } = props;
    const isGameStarted = useSelector(getIsGameStarted);
    const activeItem = useSelector(getActiveCard);

    const isActiveCardVisible = useCallback(() => {
        return activeItem?.id === item.id;
    }, [activeItem?.id, item.id]);

    const renderText = useCallback(() => {
        let text;

        if (isGameStarted) {
            text = <RNText text={isActiveCardVisible() ? item.hint : null} family="RobotoBold" />;
        } else {
            text = <RNText text="Press Game to Start" family="RobotoBold" />;
        }

        return text;
    }, [isActiveCardVisible, isGameStarted, item.hint]);

    return (
        <View className={classNames('', {}, [className])} style={cardStyles.card}>
            {renderText()}
        </View>
    );
});

const styles = StyleSheet.create({});
