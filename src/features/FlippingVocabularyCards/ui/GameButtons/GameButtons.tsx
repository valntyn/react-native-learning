import { Dimensions, StyleSheet } from 'react-native';
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

const { height } = Dimensions.get('window');

export const GameButtons = memo((props: GameButtonsProps) => {
    const { className, onStartGame, onClearGame } = props;

    const isGameStarted = useSelector(getIsGameStarted);

    return isGameStarted ? (
        <RNButton onPress={onClearGame} fullWidth style={styles.button}>
            <RNText text="Finish Game" family="InterBold" type="defaultSecondary" />
        </RNButton>
    ) : (
        <RNButton onPress={onStartGame} fullWidth style={styles.button}>
            <RNText text="Start Game" family="InterBold" type="defaultSecondary" />
        </RNButton>
    );
});

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        bottom: -height * 0.15,
        position: 'absolute',
    },
});
