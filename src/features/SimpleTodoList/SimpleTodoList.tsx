import {
    memo, useCallback, useRef, useState,
} from 'react';
import { Keyboard, Text } from 'react-native';
import { TodoList } from '@/entities/Todo';
import { useDeleteTodo, useGetTodos, usePostTodos } from '@/entities/Todo/api/todoApi';
import { BottomSheet, BottomSheetPropsRef, MAX_TRANSLATE_Y } from '@/shared/lib/ui/BottomSheet';
import { RNButton } from '@/shared/lib/ui/Button';
import { TodoCreationContent } from './ui/TodoCreationContent/TodoCreationContent';

interface SimpleTodoListProps {
    userId: string;
}

export const SimpleTodoList = memo((props: SimpleTodoListProps) => {
    const { userId } = props;
    const { data, isLoading } = useGetTodos(
        { userId },
        {
            pollingInterval: 5000,
        },
    );
    const [value, setValue] = useState('');
    const [deleteTodoMutation] = useDeleteTodo();
    const [postTodoMutation, { isLoading: isPosting }] = usePostTodos();
    const ref = useRef<BottomSheetPropsRef>(null);

    const closeDrawer = useCallback(() => {
        ref?.current?.scrollTo(0);
        Keyboard.dismiss();
    }, []);

    const openDrawer = useCallback(() => {
        const isActive = ref?.current?.isActive();

        if (isActive) {
            closeDrawer();
        } else {
            ref?.current?.scrollTo(-250);
        }
    }, [closeDrawer]);

    const onFocusChange = useCallback((isFocused: boolean) => {
        if (isFocused) {
            ref?.current?.scrollTo(MAX_TRANSLATE_Y);
        }
    }, []);

    const onChangeValue = useCallback((text: string) => {
        setValue(text);
    }, []);

    const onAdd = useCallback(async () => {
        const body = {
            userId: '1',
            description: value.trim(),
            completed: false,
        };
        await postTodoMutation(body);
        closeDrawer();
        setValue('');
    }, [closeDrawer, postTodoMutation, value]);

    const onDismiss = useCallback(async () => {
        closeDrawer();
        setValue('');
    }, [closeDrawer]);

    const onDelete = useCallback(
        async (id: string) => {
            await deleteTodoMutation({ todoId: id });
        },
        [deleteTodoMutation],
    );

    return (
        <>
            <TodoList
                items={data ?? []}
                isLoading={isLoading}
                onDelete={onDelete}
                isAdding={isPosting}
            />
            <RNButton fullWidth height={48} theme="initial" onPress={openDrawer}>
                <Text>Create a new todo</Text>
            </RNButton>
            <BottomSheet ref={ref}>
                <TodoCreationContent
                    onAdd={onAdd}
                    onDismiss={onDismiss}
                    onFocusChange={onFocusChange}
                    value={value}
                    onChangeValue={onChangeValue}
                />
            </BottomSheet>
        </>
    );
});
