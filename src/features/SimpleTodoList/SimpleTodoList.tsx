import { memo, useCallback, useRef } from 'react';
import {
    Button, Pressable, Text, View,
} from 'react-native';
import { TodoList } from '@/entities/Todo';
import { useDeleteTodo, useGetTodos, usePostTodos } from '@/entities/Todo/api/todoApi';
import { BottomSheet, BottomSheetPropsRef } from '@/shared/lib/ui/BottomSheet';

interface SimpleTodoListProps {
    className?: string;
    userId: string;
}

export const SimpleTodoList = memo((props: SimpleTodoListProps) => {
    const { className, userId } = props;
    const { data, isLoading } = useGetTodos(
        { userId },
        {
            pollingInterval: 5000,
        },
    );
    const [deleteTodoMutation, { isLoading: isDeleting }] = useDeleteTodo();
    const [postTodoMutation, { isLoading: isPosting }] = usePostTodos();
    const ref = useRef<BottomSheetPropsRef>(null);

    const onDelete = useCallback(
        async (id: string) => {
            await deleteTodoMutation({ todoId: id });
        },
        [deleteTodoMutation],
    );

    const onAdd = useCallback(
        (body: any) => async () => {
            await postTodoMutation({ ...body, completed: false });
        },
        [postTodoMutation],
    );

    const openDrawer = useCallback(() => {
        // to close the drawer
        const isActive = ref?.current?.isActive();

        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-200);
        }
    }, []);

    return (
        <>
            <TodoList
                items={data ?? []}
                isLoading={isLoading}
                onDelete={onDelete}
                isAdding={isPosting}
            />
            <Pressable style={{ marginBottom: 10 }} onPress={openDrawer}>
                <Text>Open drawer!</Text>
            </Pressable>
            <Button
                title="Add Todo"
                onPress={onAdd({
                    userId: '1',
                    description: '123',
                })}
            />
            <BottomSheet ref={ref}>
                <View style={{ flex: 1, backgroundColor: 'orange' }} />
            </BottomSheet>
        </>
    );
});
