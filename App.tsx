import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { StoreProvider } from './src/app/providers/StoreProvider';

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'tomato',
        height: 300,
        padding: 10,
        width: 300,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        gap: 10,
        justifyContent: 'center',
    },
    text: {},
});

export default function App() {
    return (
        <StoreProvider>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.text}>1</Text>
                </View>

                <View style={styles.box}>
                    <Text>1</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        </StoreProvider>
    );
}
