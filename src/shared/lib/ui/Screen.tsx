import { memo, ReactNode } from 'react';
import { View } from 'react-native';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ScreenProps {
    className?: string;
    children: ReactNode;
}

export const Screen = memo((props: ScreenProps) => {
    const { className, children } = props;

    return <View className={classNames('px-4 py-4 flex-1', {}, [className])}>{children}</View>;
});
