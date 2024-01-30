import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/lib/ui/Text';
import { CircularProgressBar } from '@/shared/lib/ui/CircularProgressBar';
import { getIsGameStarted } from '../../model/selectors/getCardsGameSelectors';
import { CountAnswers } from './CountAnswers/CountAnswers';
import { globalStyles } from '@/app/styles/globalStyles';

interface GameHeaderProps {
    className?: string;
    onClearGame: () => void;
}

export const GameHeader = memo((props: GameHeaderProps) => {
    const { className, onClearGame } = props;

    const isGameStarted = useSelector(getIsGameStarted);

    return (
        isGameStarted && (
            <Animated.View entering={FadeInUp.duration(400)} style={styles.header}>
                <CountAnswers />
                <View style={styles.timerContainer}>
                    <RNText text="Time left:" family="InterBold" type="defaultSecondary" />
                    <View style={styles.timer}>
                        <CircularProgressBar
                            width={100}
                            duration={50000}
                            onComplete={onClearGame}
                        />
                    </View>
                </View>
            </Animated.View>
        )
    );
});

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 40,
    },
    timer: {
        height: 100,
        width: 100,
    },
    timerContainer: {
        alignItems: 'center',
        backgroundColor: globalStyles.primaryText,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});
