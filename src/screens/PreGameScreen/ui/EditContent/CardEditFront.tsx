import { StyleSheet, TextInput, View } from 'react-native';
import { memo } from 'react';
import { cardStyles } from '@/widgets/FlippedCard/ui/styles';
import { RNText } from '@/shared/lib/ui/Text';
import { cardEditSharedStyles } from '@/screens/PreGameScreen/ui/EditContent/styles';
import { GetCard } from '@/entities/Cards/model/types/getCard';

interface BackContentProps {
    className?: string;
    content: { word: string; hint: string };
    item: GetCard;
    onChangeContent: (newContent: { word: string; hint: string }) => void;
}

export const CardEditFront = memo((props: BackContentProps) => {
    const {
        className, item, content, onChangeContent,
    } = props;

    const handleOnChangeContent = (text: string) => {
        if (onChangeContent) {
            onChangeContent({ ...content, word: text });
        }
    };

    return (
        <View style={cardStyles.card}>
            <TextInput
                value={content.word}
                onChangeText={handleOnChangeContent}
                numberOfLines={4}
                style={cardEditSharedStyles.textArea}
                textAlign="center"
                placeholder="Write your front card content here"
                multiline
            />
            <RNText
                text="front side"
                style={[cardEditSharedStyles.sideLabel, { left: -1, borderBottomLeftRadius: 10 }]}
                textSize="s"
                type="defaultSecondary"
            />
        </View>
    );
});

const styles = StyleSheet.create({});
