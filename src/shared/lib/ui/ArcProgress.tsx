import React, { memo, useEffect } from 'react';
import {
    Dimensions, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { globalStyles } from '@/app/styles/globalStyles';
import { gradientColors } from '@/shared/lib/ui/Screen';

const { width } = Dimensions.get('window');

interface ArcProgressProps {
    completeQnty: number;
    totalQnty: number;
    style?: StyleProp<ViewStyle>;
}

export const ArcProgress = memo((props: ArcProgressProps) => {
    const {
        style, totalQnty, completeQnty, ...otherProps
    } = props;

    const strokeWidth = 20;
    const center = width / 2;
    const r = (width - strokeWidth) / 2 - 40;
    const startAngle = Math.PI;
    const endAngle = Math.PI * 2;

    const x1 = center - r * Math.cos(startAngle);
    const y1 = -r * Math.sin(startAngle) + center;
    const x2 = center - r * Math.cos(endAngle);
    const y2 = -r * Math.sin(endAngle) + center;

    const backgroundPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
    const foregroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
    const skiaBackGroundPath = Skia.Path.MakeFromSVGString(backgroundPath);
    const skiaForegroundPath = Skia.Path.MakeFromSVGString(foregroundPath);

    const percentComplete = useSharedValue(0);

    useEffect(() => {
        if (completeQnty && totalQnty) {
            percentComplete.value = withTiming(
                calculateCompletionPercentage(completeQnty, totalQnty),
                {
                    duration: 1500,
                    easing: Easing.linear,
                },
            );
        }
    }, [completeQnty, percentComplete, totalQnty]);

    if (!skiaBackGroundPath || !skiaForegroundPath) {
        return <View />;
    }

    return (
        <View style={[styles.container, style]} {...otherProps}>
            <Canvas style={{ flex: 1 }}>
                <Path
                    path={skiaBackGroundPath}
                    strokeWidth={strokeWidth}
                    strokeCap="round"
                    color={gradientColors.secondB}
                    style="stroke"
                />
                <Path
                    path={skiaForegroundPath}
                    strokeWidth={strokeWidth}
                    strokeCap="round"
                    color={globalStyles.secondary}
                    style="stroke"
                    start={0}
                    end={percentComplete}
                />
            </Canvas>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

function calculateCompletionPercentage(completeQnty: number, totalQnty: number): number {
    if (totalQnty === 0) {
        return 0;
    }

    const percentage = completeQnty / totalQnty;

    return Math.min(Math.max(percentage, 0), 1);
}
