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
    const listHeight = height * 0.6;

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
                style={{ height: listHeight }}
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
            style={{ height: listHeight }}
            renderItem={getTodoItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.content}
            scrollEventThrottle={16}
        />
    );
});

const styles = StyleSheet.create({
    content: { padding: 10 },
});
