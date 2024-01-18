import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface SkeletonProps {
    width?: number | string;
    height?: number;
    border?: number;
    style?: object;
    colors?: string[];
}

export const Skeleton = (props: SkeletonProps) => {
    const {
        width = 150,
        height = 50,
        border = 0,
        style,
        colors = ['lightgray', '#e0e0e0', 'lightgray'],
    } = props;
    const translateX = useRef(new Animated.Value(-150)).current;
    const duration = 600;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(translateX, {
                toValue: 300,
                duration,
                useNativeDriver: false,
            }),
        );

        animation.start();

        return () => {
            animation.stop();
        };
    }, [translateX, duration, width]);

    return (
        <View style={[styles.skeleton, { width, height, borderRadius: border }, style]}>
            <Animated.View
                style={{
                    width: '100%',
                    height: '100%',
                    transform: [{ translateX }],
                }}
            >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
        position: 'relative',
    },
});
