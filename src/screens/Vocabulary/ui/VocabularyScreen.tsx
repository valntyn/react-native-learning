import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Screen } from '@/shared/lib/ui/Screen';
import { PacksList } from '@/screens/Vocabulary/ui/PacksList/PacksList';
import { getUserAuthData } from '@/entities/User';
import { VocabularyHeader } from '@/screens/Vocabulary/ui/VocabularyHeader/VocabularyHeader';

const styles = StyleSheet.create({});

export const VocabularyScreen = memo(() => {
    const authData = useSelector(getUserAuthData);

    if (!authData?.id) {
        return null;
    }

    return (
        <Screen>
            <VocabularyHeader />
            <PacksList userId={authData.id} />
        </Screen>
    );
});
