import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '@/shared/lib/ui/Screen';
import { FlippingVocabularyCards } from '@/features/FlippingVocabularyCards';

const styles = StyleSheet.create({});

export interface GetVocabulary {
    id: number;
    title: string;
    hint: string;
}

// todo generate on fake todo and fetch
const data: GetVocabulary[] = [
    { id: 1, title: 'Test', hint: 'AnotherTest' },
    { id: 2, title: 'Tesdfsdfst', hint: 'sdfdsfdsf' },
    { id: 3, title: 'Tesdfsdfdsst', hint: 'AnosdfdsftherTest' },
    { id: 4, title: 'Tsdfdsfest', hint: 'sdfsdfsdf' },
    { id: 5, title: 'Tesdfdsfst', hint: 'sdfdsfdsf' },
    { id: 6, title: 'Tesdfdsfst', hint: 'AnotsfdsfherTest' },
];

export const VocabularyScreen = memo(() => {
    return (
        <Screen>
            <FlippingVocabularyCards data={data} />
        </Screen>
    );
});
