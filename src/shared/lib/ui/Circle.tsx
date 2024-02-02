import { View } from 'react-native';

interface CircleProps {
    size: number;
    color: string;
}

export const Circle = ({ size = 50, color = 'black' }: CircleProps) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
            }}
        />
    );
};
