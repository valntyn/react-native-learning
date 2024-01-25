import { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { FlippedCard } from './FlippedCard/FlippedCard';
import { GetVocabulary } from '@/screens/Vocabulary/ui/VocabularyScreen';
import { CircularProgressBar } from '@/shared/lib/ui/CircularProgressBar';

const styles = StyleSheet.create({});

interface FlippingVocabularyCardsProps {
    data: GetVocabulary[];
}

export const FlippingVocabularyCards = memo((props: FlippingVocabularyCardsProps) => {
    const { data } = props;

    const activeIndex = useSharedValue(0);

    const [activeCard, setActiveCard] = useState<GetVocabulary>(data[activeIndex.value]);

    const setActiveItem = useCallback(() => {
        setActiveCard(data[activeIndex.value]);
    }, [activeIndex.value, data]);

    const onComplete = () => {
        console.warn('123');
    };

    return (
        <View
            style={{
                marginTop: 50,
                flex: 1,
            }}
        >
            <View style={{ width: '100%', height: 300 }}>
                {data.map((i, index) => {
                    return (
                        <FlippedCard
                            key={i.id}
                            index={index}
                            length={data.length}
                            activeIndex={activeIndex}
                            item={i}
                            activeItem={activeCard}
                            setActiveItem={setActiveItem}
                        />
                    );
                })}
            </View>
            <View
                style={{
                    height: 100,
                    width: 100,
                }}
            >
                <CircularProgressBar width={100} duration={10000} onComplete={onComplete} />
            </View>
        </View>
    );
});
