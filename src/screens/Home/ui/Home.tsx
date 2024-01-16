import { memo } from 'react';
import {
    FlatList, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '@/shared/lib/config/routeConfig/routeConfig';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = memo(() => {
    const navigation = useAppNavigation();

    const getDayItem = ({ item }: { item: number }) => (
        <Pressable style={styles.box} onPress={() => navigation.navigate('Todo')}>
            <Text style={styles.text}>{item}</Text>
        </Pressable>
    );

    return (
        <View className="p-4">
            <FlatList
                data={days}
                renderItem={getDayItem}
                numColumns={2}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
            />
        </View>
    );
});
