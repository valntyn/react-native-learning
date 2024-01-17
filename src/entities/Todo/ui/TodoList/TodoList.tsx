import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useDeleteTodo, useGetTodos } from '@/entities/Todo/api/todoApi';
import { GetTodo } from '@/entities/Todo';
import { TodoItem } from '@/entities/Todo/ui/TodoItem/TodoItem';
import { classNames } from '@/shared/lib/classNames/classNames';

interface TodoListProps {
    className?: string;
}

export const TodoList = memo((props: TodoListProps) => {
    const { className } = props;
    const { data, isLoading } = useGetTodos(
        { userId: '1' },
        {
            pollingInterval: 5000,
        },
    );
    const [deleteTodoMutation, { isLoading: isDeleting }] = useDeleteTodo();
    const [items, setItems] = useState<GetTodo[]>([]);

    useEffect(() => {
        setItems(data ?? []);
    }, [data]);

    const onDelete = useCallback(
        (id: string) => async () => {
            setItems(items.filter((i) => i.id !== id));
            // return func after POST implementation
            // await deleteTodoMutation({ todoId: id });
        },
        [deleteTodoMutation, items],
    );

    if (isLoading) {
        return null;
    }

    const getTodoItem: ListRenderItem<GetTodo> = ({ item }) => (
        <TodoItem item={item} onDelete={onDelete} isDeleting={isDeleting} />
    );

    return (
        <FlatList
            className={classNames('', {}, [className])}
            data={items}
            renderItem={getTodoItem}
            contentContainerStyle={styles.content}
        />
    );
});

const styles = StyleSheet.create({
    content: { padding: 10 },
});
