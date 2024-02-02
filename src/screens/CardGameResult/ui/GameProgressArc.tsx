import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { memo, useContext } from 'react';
import { ArcProgress } from '@/shared/lib/ui/ArcProgress';
import { RNText } from '@/shared/lib/ui/Text';
import { CardGameResultContext } from './CardGameResult';

interface GameProgressArcProps {
    onProgressEnd: () => void;
}

export const GameProgressArc = memo((props: GameProgressArcProps) => {
    const { onProgressEnd } = props;

    const { params } = useContext(CardGameResultContext);
    const { correctAnswers, totalAnswers } = params;

    return (
        <View
            style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ArcProgress
                style={{ position: 'absolute', bottom: '10%' }}
                completeQnty={correctAnswers}
                totalQnty={totalAnswers}
                onComplete={onProgressEnd}
            >
                <Animated.View
                    entering={FadeIn.duration(1000)}
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <RNText text={correctAnswers.toString()} family="InterBold" textSize="l" />
                    <RNText text="Correctly" family="InterRegular" />
                </Animated.View>
            </ArcProgress>
        </View>
    );
});

const styles = StyleSheet.create({});
