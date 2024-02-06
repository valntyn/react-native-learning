import { StyleSheet, TextInput, View } from 'react-native';
import { memo } from 'react';
import { cardStyles } from '@/widgets/FlippedCard/ui/styles';
import { cardEditSharedStyles } from '@/screens/PreGameScreen/ui/EditContent/styles';
import { RNText } from '@/shared/lib/ui/Text';
import { GetCard } from '@/entities/Cards/model/types/getCard';

interface CardEditBackProps {
    className?: string;
    item: GetCard;
    content: { word: string; hint: string };
    onChangeContent: (newContent: { word: string; hint: string }) => void;
}

export const CardEditBack = memo((props: CardEditBackProps) => {
    const {
        className, item, content, onChangeContent,
    } = props;

    const handleOnChangeContent = (text: string) => {
        if (onChangeContent) {
            onChangeContent({ ...content, hint: text });
        }
    };

    return (
        <View style={cardStyles.card}>
            <TextInput
                onChangeText={handleOnChangeContent}
                value={content.hint}
                numberOfLines={4}
                style={cardEditSharedStyles.textArea}
                textAlign="center"
                placeholder="Write your back card content here"
                multiline
            />
            <RNText
                text="back side"
                style={[cardEditSharedStyles.sideLabel, { right: -1, borderBottomRightRadius: 10 }]}
                textSize="s"
                type="defaultSecondary"
            />
        </View>
    );
});

const styles = StyleSheet.create({});
