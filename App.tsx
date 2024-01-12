import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const colors = {
    white: '#fff',
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
    },
});

export default function App() {
    console.log('hello');

    return (
        <View style={styles.container}>
            <Text>Hello world</Text>
            <StatusBar style="auto" />
        </View>
    );
}

console.log(styles);
