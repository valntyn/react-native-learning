import { Text } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Screen } from '@/shared/lib/ui/Screen';
import { SimpleTodoList } from '@/features/SimpleTodoList/SimpleTodoList';

interface SimpleTodoProps {
    className?: string;
}

export const SimpleTodo = memo((props: SimpleTodoProps) => {
    const { className } = props;

    return (
        <Screen className={classNames('p-4', {}, [className])}>
            <Text className="text-gray-500 italic mb-4">Press to finish an activity</Text>
            <SimpleTodoList userId="1" />
        </Screen>
    );
});
