import { memo, useRef } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';
import { StyleProp, View, ViewStyle } from 'react-native';
import congratulation from '@/shared/assests/animations/congratulation.json';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface AnimationProps {
    style?: StyleProp<ViewStyle>;
}

export const Congratulation = memo((props: AnimationProps) => {
    const { style } = props;
    const animation = useRef<LottieView>(null);

    return (
        <View
            style={[
                {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                },
                style,
            ]}
        >
            <AnimatedLottieView
                exiting={ZoomOut}
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                }}
                source={congratulation}
                loop={false}
            />
        </View>
    );
});
