import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { classNames } from '@/shared/lib/classNames/classNames';

interface CustomCheckboxProps {
    isChecked: boolean;
    onToggle: (isChecked: boolean) => void;
    className?: string;
}

export const CustomCheckbox = ({ onToggle, isChecked, className }: CustomCheckboxProps) => {
    const onPress = () => {
        if (onToggle) {
            onToggle(!isChecked);
        }
    };

    return (
        <TouchableOpacity
            style={styles.checkbox}
            className={classNames('p-2', {}, [className])}
            onPress={onPress}
        >
            {isChecked && (
                <Ionicons name="checkmark" size={48} color="black" style={styles.checkmark} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        borderColor: 'black',
        borderRadius: 50,
        borderWidth: 1,
        height: 32,
        justifyContent: 'center',
        position: 'relative',
        width: 32,
    },
    checkmark: {
        bottom: 8,
        height: 40,
        left: -4,
        position: 'absolute',
        width: 40,
    },
});
