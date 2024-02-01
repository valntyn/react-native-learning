import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Screen } from '@/shared/lib/ui/Screen';
import { MarkdownDisplay } from '@/shared/lib/ui/MarkdownDisplay';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'smoke',
    },
});

const copy = '# Markdown editor';

export const Home = memo(() => {
    return (
        <Screen>
            <ScrollView>
                <MarkdownDisplay>{copy}</MarkdownDisplay>
            </ScrollView>
        </Screen>
    );
});
