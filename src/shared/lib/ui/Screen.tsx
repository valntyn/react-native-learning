import { memo, ReactNode } from 'react';
import {
    SafeAreaView,
    StatusBar,
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
    withBottom?: boolean;
}

export const gradientColors = {
    firstA: '#fae2f1',
    firstB: '#88b5da',
    secondA: '#8ac6d1',
    secondB: '#f7d8be',
};

export const Screen = memo((props: ScreenProps) => {
    const { children, style, withBottom = true } = props;

    const leftColor = useSharedValue(gradientColors.firstA);
    const rightColor = useSharedValue(gradientColors.firstB);

    const { width, height } = useWindowDimensions();

    const colors = useDerivedValue(() => {
        return [leftColor.value, rightColor.value];
    });

    useInterval(() => {
        leftColor.value = withTiming(gradientColors.secondA, { duration: 3000 });
        rightColor.value = withTiming(gradientColors.secondB, { duration: 3000 });
        setTimeout(() => {
            leftColor.value = withTiming(gradientColors.firstA, { duration: 3000 });
            rightColor.value = withTiming(gradientColors.firstB, { duration: 3000 });
        }, 5000);
    }, 10000);

    return (
        <View
            style={[
                {
                    flex: 1,
                    position: 'relative',
                    paddingBottom: withBottom ? height * 0.2 : height * 0.05,
                    paddingTop: height * 0.02,
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
                    style,
                    {
                        flex: 1,
                        zIndex: 1,
                    },
                ]}
            >
                <StatusBar barStyle="default" />
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
