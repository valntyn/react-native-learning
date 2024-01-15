import React, { memo } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface IconProps {
    name: string;
    size: number;
    style?: Record<string, string | number>;
    color?: string;
}

export const Icon = memo((props: IconProps) => {
    const {
        color, size, name, style,
    } = props;

    return <FontAwesome5 style={style} name={name} size={size} color={color} />;
});
