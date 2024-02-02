import { StyleSheet } from 'react-native';
import { memo, useContext } from 'react';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { RNText } from '@/shared/lib/ui/Text';
import { CardGameResultContext } from './CardGameResult';

interface ResultMessageProps {
    className?: string;
}

export const ResultMessage = memo((props: ResultMessageProps) => {
    const { className } = props;

    const { params } = useContext(CardGameResultContext);
    const { correctAnswers, totalAnswers } = params;

    const message = () => {
        switch (true) {
        case correctAnswers === totalAnswers:
            return 'Perfect!';
        case correctAnswers >= totalAnswers / 2:
            return 'Good Job!';
        default:
            return 'Try harder next time!';
        }
    };

    return (
        <Animated.View
            entering={ZoomIn.duration(500)}
            style={{ position: 'absolute', bottom: '25%' }}
        >
            <RNText text={message()} textSize="xl" family="InterBold" />
        </Animated.View>
    );
});

const styles = StyleSheet.create({});
