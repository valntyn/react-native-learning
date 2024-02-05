import { StyleSheet, View } from 'react-native';
import { memo, ReactNode } from 'react';
import Animated, {
    interpolate,
    SharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface FlippedCardProps {
    childrenFront: ReactNode;
    childrenBack: ReactNode;
    rotate: SharedValue<number>;
}

const cardGradientColors = ['#fff', '#f6fafd'];

export const FlippedCard = memo((props: FlippedCardProps) => {
    const { childrenFront, childrenBack, rotate } = props;

    const rFrontCardStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    scale: withTiming(interpolate(rotate.value, [0, 1], [1, 0.95, 1])),
                },
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
                },
            ],
            zIndex: rotateValue ? -100 : 1,
        };
    }, [rotate]);

    const rBackCardStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    scale: withTiming(interpolate(rotate.value, [1, 0], [1, 0.95, 1])),
                },
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
                },
            ],
            zIndex: !rotateValue ? -100 : 1,
        };
    }, [rotate]);

    return (
        <View>
            <Animated.View style={[styles.frontCard, rBackCardStyles]}>
                <LinearGradient colors={cardGradientColors} style={styles.linerGradient}>
                    {childrenBack}
                </LinearGradient>
            </Animated.View>
            <Animated.View style={[styles.backCard, rFrontCardStyles]}>
                <LinearGradient colors={cardGradientColors} style={styles.linerGradient}>
                    {childrenFront}
                </LinearGradient>
            </Animated.View>
        </View>
    );
});

const styles = StyleSheet.create({
    backCard: {
        backfaceVisibility: 'hidden',
        width: '100%',
    },
    frontCard: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
    },
    linerGradient: { borderRadius: 8, flex: 1 },
});
