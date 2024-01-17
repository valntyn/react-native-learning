import { Text } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TodoList } from '@/entities/Todo';
import { Screen } from '@/shared/lib/ui/Screen';

interface SimpleTodoProps {
    className?: string;
}

export const SimpleTodo = memo((props: SimpleTodoProps) => {
    const { className } = props;

    return (
        <Screen className={classNames('p-4', {}, [className])}>
            <Text className="text-gray-500 italic mb-4">Press to finish an activity</Text>
            <TodoList />
        </Screen>
    );
});
