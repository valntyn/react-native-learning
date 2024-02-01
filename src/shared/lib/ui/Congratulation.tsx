import { memo, useRef } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';
import { View } from 'react-native';
import { classNames } from '@/shared/lib/classNames/classNames';
import congratulation from '@/shared/assests/animations/congratulation.json';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface AnimationProps {
    className?: string;
}

export const Congratulation = memo((props: AnimationProps) => {
    const { className } = props;
    const animation = useRef<LottieView>(null);

    return (
        <View
            className={classNames('flex-1 items-center justify-center bg-transparent', {}, [
                className,
            ])}
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
