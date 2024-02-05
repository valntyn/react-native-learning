import { StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/globalStyles';

export const cardStyles = StyleSheet.create({
    card: {
        alignItems: 'center',
        borderColor: globalStyles.primary,
        borderRadius: 10,
        borderWidth: 1,
        display: 'flex',
        height: 200,
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        zIndex: 1000,
    },
});
