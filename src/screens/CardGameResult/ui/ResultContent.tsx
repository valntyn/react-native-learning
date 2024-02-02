import { StyleSheet, View, ViewStyle } from 'react-native';
import { memo, useContext } from 'react';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Card, CardTheme } from '@/shared/lib/ui/Card';
import { RNText } from '@/shared/lib/ui/Text';
import { Circle } from '@/shared/lib/ui/Circle';
import { CardGameResultContext } from './CardGameResult';

interface ResultContentProps {
    style?: ViewStyle;
    isAnimVisible: boolean;
}

export const ResultContent = memo((props: ResultContentProps) => {
    const { style, isAnimVisible } = props;

    const { params } = useContext(CardGameResultContext);
    const { correctAnswers, totalAnswers, totalCards } = params;
    const wrongAnswers = totalAnswers - correctAnswers;

    const rContentStyles = useAnimatedStyle(() => {
        const zoomValue = isAnimVisible ? 1 : 0;
        return {
            transform: [
                {
                    scale: withTiming(interpolate(zoomValue, [0, 1], [0.9, 1])),
                },
            ],
        };
    }, [isAnimVisible]);

    return (
        <Animated.View style={[rContentStyles, { width: 220 }]}>
            <Card theme={CardTheme.DEFAULT} style={style}>
                <RNText
                    textSize="l"
                    family="RobotoBold"
                    text="Result"
                    alignSelf="center"
                    type="defaultSecondary"
                />
                <RNText
                    family="InterRegular"
                    alignSelf="center"
                    text={`Total Answered ${totalAnswers}/${totalCards}`}
                    type="defaultSecondary"
                    style={{ marginBottom: 10 }}
                />
                <View style={[styles.labelContainer, { marginBottom: 4 }]}>
                    <Circle size={10} color="#84ce01" />
                    <RNText
                        text={correctAnswers.toString()}
                        type="defaultSecondary"
                        family="InterBold"
                    />
                    <RNText text="Cards Correct" type="defaultSecondary" family="InterRegular" />
                </View>
                <View style={styles.labelContainer}>
                    <Circle size={10} color="tomato" />
                    <RNText
                        text={wrongAnswers.toString()}
                        type="defaultSecondary"
                        family="InterBold"
                    />
                    <RNText text="Cards Wrong" type="defaultSecondary" family="InterRegular" />
                </View>
            </Card>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    labelContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
});
