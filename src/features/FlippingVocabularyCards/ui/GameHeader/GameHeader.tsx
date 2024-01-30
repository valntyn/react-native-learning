import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { memo, Ref } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/lib/ui/Text';
import {
    CircularProgressBar,
    CircularProgressBarRefProps,
} from '@/shared/lib/ui/CircularProgressBar';
import {
    getCorrectCount,
    getIsGameStarted,
    getWrongCount,
} from '@/features/FlippingVocabularyCards/model/selectors/getCardsGameSelectors';

interface GameHeaderProps {
    className?: string;
    onClearGame: () => void;
    refTimer: Ref<CircularProgressBarRefProps>;
}

export const GameHeader = memo((props: GameHeaderProps) => {
    const { className, onClearGame, refTimer } = props;
    const { height } = useWindowDimensions();

    const isGameStarted = useSelector(getIsGameStarted);
    const correctCount = useSelector(getCorrectCount);
    const wrongCount = useSelector(getWrongCount);

    return (
        isGameStarted && (
            <Animated.View
                entering={FadeInUp.duration(400)}
                style={{
                    marginBottom: 40,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <View>
                    <RNText text={`Correct ${correctCount.toString()}`} />
                    <RNText text={`Wrong ${wrongCount.toString()}`} />
                </View>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <RNText text="Time left:" family="InterBold" />
                </View>
                <View
                    style={{
                        height: 100,
                        width: 100,
                    }}
                >
                    <CircularProgressBar
                        ref={refTimer}
                        width={100}
                        duration={15000}
                        onComplete={onClearGame}
                    />
                </View>
            </Animated.View>
        )
    );
});

const styles = StyleSheet.create({});
