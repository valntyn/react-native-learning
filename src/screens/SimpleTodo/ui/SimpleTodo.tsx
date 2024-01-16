import { Text, View } from 'react-native';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTodos } from '@/entities/Todo/api/todoApi';

interface SimpleTodoProps {
  className?: string;
}

export const SimpleTodo = memo((props: SimpleTodoProps) => {
    const { className } = props;
    const { data, isLoading } = useTodos();

    if (isLoading) {
        return null;
    }

    console.log(data);

    return (
        <View className={classNames('', {}, [className])}>
            <Text>SimpleTodo</Text>
        </View>
    );
});
