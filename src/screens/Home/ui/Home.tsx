import { memo } from 'react';
import {
    FlatList, Pressable, StyleSheet, Text,
} from 'react-native';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { Screen } from '@/shared/lib/ui/Screen';

const days = [...Array(24)].map((el, i) => i + 1);

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        aspectRatio: 1,
        backgroundColor: '#f9ede3',
        borderColor: '#9b4521',
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth + 2,
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    column: {
        gap: 10,
    },
    content: { gap: 10 },
    text: {
        color: '#9b4521',
        fontFamily: 'Inter',
        fontSize: 70,
    },
});

export const Home = memo(() => {
    const navigation = useAppNavigation();

    const getDayItem = ({ item }: { item: number }) => (
        <Pressable style={styles.box}>
            <Text style={styles.text}>{item}</Text>
        </Pressable>
    );

    return (
        <Screen>
            <FlatList
                data={days}
                renderItem={getDayItem}
                numColumns={2}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
            />
        </Screen>
    );
});
