import { memo, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    const scrollRef = useRef(null);

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

    const getTodoItem = (item: GetTodo) => {
        return (
            <TodoItem
                item={item}
                onDelete={onDelete}
                key={item.id}
                simultaneousHandlers={scrollRef}
            />
        );
    };

    return <ScrollView ref={scrollRef}>{items.map((i) => getTodoItem(i))}</ScrollView>;
});

const styles = StyleSheet.create({
    content: { padding: 10 },
});
