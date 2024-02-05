import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { memo } from 'react';
import { RNButton } from '@/shared/lib/ui/Button';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { RNText } from '@/shared/lib/ui/Text';

interface CardButtonsProps {
    onRotate: () => void;
    onClear: () => void;
}

export const CardButtons = memo((props: CardButtonsProps) => {
    const { onRotate, onClear } = props;
    const { height } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', gap: 4 }}>
            <RNButton width="20%" theme="secondary">
                <Icon
                    icon={{ type: IconType.Ionicon, iconName: 'remove-circle' }}
                    size={28}
                    color="tomato"
                />
            </RNButton>
            <RNButton width="20%" style={{ marginRight: 'auto' }} onPress={onClear}>
                <RNText text="Clear" family="InterBold" type="defaultSecondary" />
            </RNButton>
            <RNButton width="30%" onPress={onRotate} theme="secondary">
                <RNText text="Turn" family="InterBold" type="default" />
            </RNButton>
        </View>
    );
});

const styles = StyleSheet.create({});
