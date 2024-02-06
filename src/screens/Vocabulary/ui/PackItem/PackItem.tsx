import { StyleSheet } from 'react-native';
import { memo } from 'react';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { Card, CardTheme } from '@/shared/lib/ui/Card';
import { RNText } from '@/shared/lib/ui/Text';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { RNButton } from '@/shared/lib/ui/Button';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { AppRouterEnum } from '@/shared/lib/config/routeConfig/routeConfig';
import { GetPack } from '@/entities/Pack/model/types/getPack';

interface PacksListProps {
    className?: string;
    item: GetPack;
    index: number;
    scrollY: SharedValue<number>;
    containerHeight: number;
}

const styles = StyleSheet.create({});

export const PackItem = memo((props: PacksListProps) => {
    const {
        className, index, item, scrollY, containerHeight,
    } = props;
    const navigation = useAppNavigation();

    const startPosition = 30 * index;
    const marginTop = 17;

    const rLastContainerTodoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [startPosition - containerHeight, startPosition - containerHeight + 320],
                        [-marginTop * 2, 0],
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View style={rLastContainerTodoStyle}>
            <Card style={{ marginTop }} theme={CardTheme.OUTLINED}>
                <RNText text={item.title} numberOfLines={1} family="RobotoRegular" />
                <RNButton
                    style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 2,
                        backgroundColor: 'transparent',
                    }}
                    height={48}
                    width={48}
                    theme="secondary"
                    onPress={() => navigation.navigate(AppRouterEnum.PRE_GAME_SCREEN, { packId: item.id })}
                >
                    <Icon icon={{ type: IconType.Ionicon, iconName: 'settings-sharp' }} size={24} />
                </RNButton>
            </Card>
        </Animated.View>
    );
});
