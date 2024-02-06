import {
    ListRenderItem, StyleSheet, useWindowDimensions, View,
} from 'react-native';
import { memo } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { PackItem } from '@/screens/Vocabulary/ui/PackItem/PackItem';
import { useGetPacks } from '@/entities/Pack/api/packApi';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { GetPack } from '@/entities/Pack/model/types/getPack';

interface PacksListProps {
    className?: string;
    userId: string;
}

const styles = StyleSheet.create({});

export const PacksList = memo((props: PacksListProps) => {
    const { className, userId } = props;
    const navigation = useAppNavigation();

    const { data } = useGetPacks({
        userId,
    });

    const scrollY = useSharedValue(0);
    const { height } = useWindowDimensions();

    const handler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const { y } = event.contentOffset;

            scrollY.value = y;
        },
    });

    if (!data) {
        return null;
    }

    const getPackItem: ListRenderItem<GetPack> = ({ item, index }) => {
        return (
            <PackItem item={item} index={index} scrollY={scrollY} containerHeight={height * 0.65} />
        );
    };

    return (
        <View style={{ height: height * 0.65 }}>
            <Animated.FlatList
                onScroll={handler}
                data={data}
                renderItem={getPackItem}
                scrollEventThrottle={16}
                style={{ paddingHorizontal: 12 }}
            />
        </View>
    );
});
