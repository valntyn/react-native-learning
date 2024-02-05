import { StyleSheet } from 'react-native';
import { memo } from 'react';
import { Card, CardTheme } from '@/shared/lib/ui/Card';
import { RNText } from '@/shared/lib/ui/Text';
import { RNButton } from '@/shared/lib/ui/Button';
import { Icon, IconType } from '@/shared/lib/ui/Icon';

interface VocabularyHeaderProps {
    className?: string;
}

export const VocabularyHeader = memo((props: VocabularyHeaderProps) => {
    const { className } = props;

    return (
        <Card theme={CardTheme.OUTLINED} style={{ position: 'relative', marginBottom: 20 }}>
            <RNText text="Card packs" family="InterBold" />
            <RNButton
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 6,
                }}
                border={50}
                height={40}
                width={40}
            >
                <Icon icon={{ type: IconType.FontAwesomeIcon, iconName: 'plus' }} size={18} />
            </RNButton>
        </Card>
    );
});

const styles = StyleSheet.create({});
