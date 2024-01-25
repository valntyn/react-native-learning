import { memo } from 'react';
import {
    FlatList, ListRenderItem, StyleSheet, useWindowDimensions,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { GetTodo } from '@/entities/Todo';
import { TodoItem } from '@/entities/Todo/ui/TodoItem/TodoItem';
import { Skeleton } from '@/shared/lib/ui/Skeleton';
import { LIST_ITEM_MARGIN } from '@/entities/Todo/todo.config';

interface TodoListProps {
    items: GetTodo[];
    isLoading: boolean;
    onDelete: (id: string) => void;
    className?: string;
}

export const TodoList = memo((props: TodoListProps) => {
    const {
        className, items = [], isLoading, onDelete,
    } = props;
    const scrollY = useSharedValue(0);
    const { height } = useWindowDimensions();

    const handler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const { y } = event.contentOffset;

            scrollY.value = y;
        },
    });

    if (isLoading) {
        return (
            <FlatList
                data={Array.from({ length: 6 })}
                renderItem={() => (
                    <Skeleton
                        height={50}
                        style={{ marginTop: LIST_ITEM_MARGIN }}
                        border={10}
                        width="100%"
                    />
                )}
                style={{ width: '100%', height: '100%' }}
                contentContainerStyle={styles.content}
            />
        );
    }

    const getTodoItem: ListRenderItem<GetTodo> = ({ item, index }) => {
        return (
            <TodoItem
                item={item}
                onDelete={onDelete}
                key={item.id}
                scrollY={scrollY}
                index={index}
            />
        );
    };

    return (
        <Animated.FlatList
            onScroll={handler}
            data={items}
            renderItem={getTodoItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.content}
            scrollEventThrottle={16}
            style={{ width: '100%', height: '100%' }}
        />
    );
});

const styles = StyleSheet.create({
    content: { padding: 10 },
});
