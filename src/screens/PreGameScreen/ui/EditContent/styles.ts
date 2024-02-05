import { StyleSheet } from 'react-native';
import { bgColors } from '@/shared/lib/ui/Button';

export const cardEditSharedStyles = StyleSheet.create({
    sideLabel: {
        backgroundColor: bgColors.initial,
        bottom: -1,
        opacity: 0.7,
        padding: 10,
        position: 'absolute',
    },
    textArea: {
        fontFamily: 'InterRegular',
        fontSize: 22,
    },
});
