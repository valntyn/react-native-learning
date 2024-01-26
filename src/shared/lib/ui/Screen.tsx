import { memo, ReactNode } from 'react';
import {
    SafeAreaView,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    View,
    ViewStyle,
} from 'react-native';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import {
    Canvas, LinearGradient, Rect, vec,
} from '@shopify/react-native-skia';
import { useInterval } from '@/shared/lib/hooks/useInterval';

interface ScreenProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const gradientColors = {
    firstA: '#fae2f1',
    firstB: '#88b5da',
    secondA: '#8ac6d1',
    secondB: '#f7d8be',
};

export const Screen = memo((props: ScreenProps) => {
    const { children, style } = props;

    const leftColor = useSharedValue(gradientColors.firstA);
    const rightColor = useSharedValue(gradientColors.firstB);

    const { width, height } = useWindowDimensions();

    const colors = useDerivedValue(() => {
        return [leftColor.value, rightColor.value];
    });

    useInterval(() => {
        leftColor.value = withTiming(gradientColors.secondA, { duration: 1500 });
        rightColor.value = withTiming(gradientColors.secondB, { duration: 1500 });
        setTimeout(() => {
            leftColor.value = withTiming(gradientColors.firstA, { duration: 1500 });
            rightColor.value = withTiming(gradientColors.firstB, { duration: 1500 });
        }, 5000);
    }, 10000);

    return (
        <View
            style={[
                {
                    flex: 1,
                    position: 'relative',
                    paddingBottom: height * 0.2,
                    paddingTop: height * 0.05,
                },
                styles.view,
            ]}
        >
            <Canvas
                style={{
                    width,
                    height,
                    position: 'absolute',
                    zIndex: -1,
                }}
            >
                <Rect x={0} y={0} width={width} height={height} />
                <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={colors} />
            </Canvas>
            <SafeAreaView
                style={[
                    styles.view,
                    style,
                    {
                        flex: 1,
                        zIndex: 1,
                    },
                ]}
            >
                {children}
            </SafeAreaView>
        </View>
    );
});

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
    },
});
