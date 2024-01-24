import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Screen } from '@/shared/lib/ui/Screen';
import { FlippedCard } from '@/widgets/FlippedCard';
import { FrontContent } from '../ui/CardsContent/FrontContent';
import { BackContent } from '../ui/CardsContent/BackContent';

const styles = StyleSheet.create({});

// todo generate on fake todo and fetch
const data = [
    { id: 1, title: 'Test', hint: 'AnotherTest' },
    { id: 2, title: 'Tesdfsdfst', hint: 'sdfdsfdsf' },
    { id: 3, title: 'Tesdfsdfdsst', hint: 'AnosdfdsftherTest' },
    { id: 4, title: 'Tsdfdsfest', hint: 'sdfsdfsdf' },
    { id: 5, title: 'Tesdfdsfst', hint: 'sdfdsfdsf' },
    { id: 6, title: 'Tesdfdsfst', hint: 'AnotsfdsfherTest' },
];

export const VocabularyScreen = memo(() => {
    const activeIndex = useSharedValue(0);

    const flingDown = Gesture.Fling()
        .runOnJS(true)
        .direction(Directions.DOWN)
        .onStart(() => {
            if (activeIndex.value >= data.length - 1) {
                return;
            }

            activeIndex.value = withTiming(Math.min(data.length - 1, activeIndex.value + 1));
        });

    return (
        <Screen style={{ flex: 1 }}>
            <GestureDetector gesture={Gesture.Exclusive(flingDown)}>
                <View
                    style={{
                        marginTop: 50,
                        flex: 1,
                    }}
                >
                    {data.map((i, index) => {
                        return (
                            <FlippedCard
                                key={i.id}
                                index={index}
                                length={data.length}
                                activeIndex={activeIndex}
                                item={i}
                                front={<FrontContent item={i} />}
                                back={<BackContent item={i} />}
                            />
                        );
                    })}
                </View>
            </GestureDetector>
        </Screen>
    );
});
