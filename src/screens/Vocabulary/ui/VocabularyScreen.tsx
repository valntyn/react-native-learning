import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Screen } from '@/shared/lib/ui/Screen';
import { Card, CardTheme } from '@/shared/lib/ui/Card';
import { RNText } from '@/shared/lib/ui/Text';
import { RNButton } from '@/shared/lib/ui/Button';
import { Icon, IconType } from '@/shared/lib/ui/Icon';
import { PacksList } from '@/screens/Vocabulary/ui/PacksList/PacksList';
import { getUserAuthData } from '@/entities/User';

const styles = StyleSheet.create({});

export const VocabularyScreen = memo(() => {
    const authData = useSelector(getUserAuthData);

    if (!authData?.id) {
        return null;
    }

    return (
        <Screen>
            <Card theme={CardTheme.OUTLINED} style={{ position: 'relative', marginBottom: 20 }}>
                <RNText text="Card packs" family="InterBold" />
                <RNButton
                    style={{
                        position: 'absolute',
                        right: 5,
                        top: 6,
                    }}
                    border={50}
                    height={40}
                    width={40}
                >
                    <Icon icon={{ type: IconType.FontAwesomeIcon, iconName: 'plus' }} size={18} />
                </RNButton>
            </Card>
            <PacksList userId={authData.id} />
        </Screen>
    );
});
