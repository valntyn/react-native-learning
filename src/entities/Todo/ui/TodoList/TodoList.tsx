import { memo } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { GetTodo } from '@/entities/Todo';
import { TodoItem } from '@/entities/Todo/ui/TodoItem/TodoItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/lib/ui/Skeleton';
import { LIST_ITEM_MARGIN } from '@/entities/Todo/todo.config';

interface TodoListProps {
    items: GetTodo[];
    isLoading: boolean;
    isAdding?: boolean;
    onDelete: (id: string) => void;
    className?: string;
}

export const TodoList = memo((props: TodoListProps) => {
    const {
        className, items = [], isLoading, onDelete, isAdding,
    } = props;

    if (isLoading) {
        return (
            <FlatList
                className={classNames('', {}, [className])}
                data={Array.from({ length: 6 })}
                renderItem={() => (
                    <Skeleton
                        height={50}
                        style={{ marginTop: LIST_ITEM_MARGIN }}
                        border={10}
                        width="100%"
                    />
                )}
                contentContainerStyle={styles.content}
            />
        );
    }

    const getTodoItem: ListRenderItem<GetTodo> = ({ item }) => {
        if (item.id.includes('skeleton') && isAdding) {
            return (
                <Skeleton
                    height={50}
                    style={{ marginTop: LIST_ITEM_MARGIN }}
                    border={10}
                    width="100%"
                />
            );
        }
        return <TodoItem item={item} onDelete={onDelete} key={item.id} isAdding={isAdding} />;
    };

    return (
        <FlatList
            className={classNames('', {}, [className])}
            data={[...items, { completed: false, id: 'skeleton' }]}
            renderItem={getTodoItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.content}
        />
    );
});

const styles = StyleSheet.create({
    content: { padding: 10 },
});
