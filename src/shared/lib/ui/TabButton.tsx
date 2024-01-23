import { StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/src/types';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon } from '@/shared/lib/ui/Icon';
import { bgColors } from '@/shared/lib/ui/Button';
import { TabRouteParams } from '@/shared/lib/config/routeConfig/tabRouterConfig';

interface TabButtonProps extends BottomTabBarButtonProps {
    item: TabRouteParams;
}

export const TabButton = (props: TabButtonProps) => {
    const { item, accessibilityState, onPress } = props;
    const focused = accessibilityState?.selected;

    const rIconStyle = useAnimatedStyle(() => {
        const translateY = withTiming(focused ? -20 : 0);

        return {
            transform: [
                {
                    translateY,
                },
            ],
        };
    });

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={1}>
            <Animated.View style={[rIconStyle, styles.iconBox]}>
                <Icon
                    icon={item.icon}
                    color={focused ? bgColors.initial : 'grey'}
                    size={item.iconSize}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    iconBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 60,
        justifyContent: 'center',
        width: 60,
    },
});
