import React, { memo } from 'react';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export enum IconType {
    MaterialIcon = 'MaterialIcon',
    FontAwesomeIcon = 'FontAwesomeIcon',
    Ionicon = 'Ionicon',
}

export interface IconProps {
    icon:
        | { type: IconType.MaterialIcon; iconName: keyof typeof MaterialIcons.glyphMap }
        | { type: IconType.FontAwesomeIcon; iconName: keyof typeof FontAwesome5.glyphMap }
        | { type: IconType.Ionicon; iconName: keyof typeof Ionicons.glyphMap };
    size?: number;
    style?: Record<string, string | number>;
    color?: string;
}

export const Icon = memo((props: IconProps) => {
    const {
        color, size = 24, style, icon,
    } = props;

    const IconComponent = (() => {
        switch (icon?.type) {
        case IconType.FontAwesomeIcon:
            return FontAwesome5;
        case IconType.MaterialIcon:
            return MaterialIcons;
        case IconType.Ionicon:
            return Ionicons;
        default:
            return null;
        }
    })();

    if (!IconComponent) {
        return null;
    }

    return <IconComponent name={icon.iconName} size={size} color={color} style={style} />;
});
