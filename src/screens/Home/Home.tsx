import { memo, useEffect } from 'react';
import {
    FlatList, StyleSheet, Text, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Inter_900Black as Inter900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

const days = [...Array(24)].map((el, i) => i + 1);

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

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
    const [fontsLoaded, fontError] = useFonts({
        Inter: Inter900Black,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const getDayItem = ({ item }: { item: number }) => (
        <View style={styles.box}>
            <Text style={styles.text}>{item}</Text>
        </View>
    );

    return (
        <View className="bg-[#1e1c2e] flex-1">
            <FlatList
                data={days}
                renderItem={getDayItem}
                numColumns={2}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
            />

            <StatusBar style="auto" />
        </View>
    );
});
