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
import { GetPack } from '@/screens/Vocabulary/model/types/getPack';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';

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
                <RNText text={item.title} numberOfLines={1} />
            </Card>
        </Animated.View>
    );
});
