import { memo } from 'react';
import {
    Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#302E38',
        borderRadius: 20,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        padding: 15,
        paddingHorizontal: 25,
    },
    buttons: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
    },
});

interface ActionButtonsProps {
    onContinue: () => void;
    onSkip: () => void;
    last: boolean;
}

export const ActionButtons = memo((props: ActionButtonsProps) => {
    const { onContinue, onSkip, last } = props;

    return (
        <View style={styles.buttons}>
            <Text style={styles.buttonText} onPress={onSkip}>
                Skip
            </Text>
            {last ? (
                <Pressable style={styles.button} onPress={onSkip}>
                    <Text style={styles.buttonText}>Start</Text>
                </Pressable>
            ) : (
                <Pressable style={styles.button} onPress={onContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            )}
        </View>
    );
});
