import { StyleSheet } from 'react-native';

export const todoItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        zIndex: 1,
    },
    iconContainer: {
        bottom: 12,
        position: 'absolute',
        right: 12,
    },
    text: { marginLeft: 10 },
});
