import { StyleSheet, useWindowDimensions } from 'react-native';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RNButton } from '@/shared/lib/ui/Button';
import { RNText } from '@/shared/lib/ui/Text';
import { getIsGameStarted } from '../../model/selectors/getCardsGameSelectors';

interface GameButtonsProps {
    className?: string;
    onStartGame: () => void;
    onClearGame: () => void;
}

export const GameButtons = memo((props: GameButtonsProps) => {
    const { className, onStartGame, onClearGame } = props;
    const { height } = useWindowDimensions();

    const isGameStarted = useSelector(getIsGameStarted);

    return isGameStarted ? (
        <RNButton onPress={onClearGame} fullWidth style={styles.button}>
            <RNText text="Clear game" family="InterBold" />
        </RNButton>
    ) : (
        <RNButton onPress={onStartGame} fullWidth style={styles.button}>
            <RNText text="Game" family="InterBold" />
        </RNButton>
    );
});

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        bottom: -100,
        position: 'absolute',
    },
});
