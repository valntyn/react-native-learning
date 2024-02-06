import { Pressable, StyleSheet } from 'react-native';
import { memo, useCallback, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { FlippedCard } from '@/widgets/FlippedCard';
import { CardEditFront } from '../EditContent/CardEditFront';
import { CardEditBack } from '../EditContent/CardEditBack';
import { CardButtons } from '@/screens/PreGameScreen/ui/CardItem/CardButtons/CardButtons';
import { GetCard } from '@/entities/Cards/model/types/getCard';

interface CardItemProps {
    item: GetCard;
    className?: string;
}

export const CardItem = memo((props: CardItemProps) => {
    const { className, item } = props;

    const rotate = useSharedValue(1);

    const [cardContent, setCardContent] = useState({
        word: item.word,
        hint: item.hint,
    });

    const onRotate = useCallback(() => {
        rotate.value = rotate.value ? 0 : 1;
    }, [rotate]);

    const onChangeContent = useCallback((newContent: { word: string; hint: string }) => {
        setCardContent(newContent);
    }, []);

    const onClear = useCallback(() => {
        setCardContent({ word: '', hint: '' });
    }, []);

    return (
        <Pressable style={{ gap: 10 }}>
            <CardButtons onRotate={onRotate} onClear={onClear} />
            <FlippedCard
                rotate={rotate}
                childrenBack={(
                    <CardEditFront
                        item={item}
                        content={cardContent}
                        onChangeContent={onChangeContent}
                    />
                )}
                childrenFront={(
                    <CardEditBack
                        item={item}
                        content={cardContent}
                        onChangeContent={onChangeContent}
                    />
                )}
            />
        </Pressable>
    );
});

const styles = StyleSheet.create({});
