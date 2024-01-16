import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { Icon } from '@/shared/lib/ui/Icon';
import { StepsInterface } from '../../const';

const styles = StyleSheet.create({
    content: {},
    description: {
        color: 'gray',
        fontFamily: 'InterRegular',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 20,
    },
    image: {
        alignSelf: 'center',
        marginBottom: 'auto',
    },
    title: {
        color: '#fdfdfd',
        fontFamily: 'Inter',
        fontSize: 36,
        letterSpacing: 1.3,
        marginBottom: 20,
    },
    wrapper: {
        flex: 1,
    },
});

interface InitialContentProps {
    data: StepsInterface;
    positionIndex: number;
    quantity: number;
    onContinue: () => void;
    onSkip: () => void;
    onBack: () => void;
}

export const InitialContent = memo((props: InitialContentProps) => {
    const {
        data, onContinue, onSkip, onBack, positionIndex, quantity,
    } = props;

    const swipes = Gesture.Simultaneous(
        Gesture.Fling()
            .runOnJS(true)
            .direction(Directions.LEFT)
            .onEnd(() => {
                onContinue();
            }),
        Gesture.Fling()
            .runOnJS(true)
            .direction(Directions.RIGHT)
            .onEnd(() => {
                onBack();
            }),
    );

    const isLast = quantity - 1 === positionIndex;

    return (
        <GestureDetector gesture={swipes}>
            <View style={styles.wrapper} key={positionIndex}>
                <Animated.View
                    style={styles.image}
                    entering={FadeIn.duration(100)}
                    exiting={FadeOut}
                >
                    <Icon name={data.image} size={120} color="#cef202" />
                </Animated.View>
                <View style={styles.content}>
                    <Animated.Text style={styles.title} entering={SlideInRight.duration(300)}>
                        {data.title}
                    </Animated.Text>
                    <Animated.Text entering={SlideInRight.delay(200)} style={styles.description}>
                        {data.description}
                    </Animated.Text>
                    <ActionButtons onContinue={onContinue} onSkip={onSkip} last={isLast} />
                </View>
            </View>
        </GestureDetector>
    );
});
