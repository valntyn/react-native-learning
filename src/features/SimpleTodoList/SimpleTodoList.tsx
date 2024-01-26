import {
    memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { Keyboard, Text, View } from 'react-native';
import { TodoList } from '@/entities/Todo';
import { useDeleteTodo, useGetTodos, usePostTodos } from '@/entities/Todo/api/todoApi';
import { BottomSheet, BottomSheetPropsRef, MAX_TRANSLATE_Y } from '@/shared/lib/ui/BottomSheet';
import { RNButton } from '@/shared/lib/ui/Button';
import { TodoCreationContent } from './ui/TodoCreationContent/TodoCreationContent';
import { SegmentedControl } from '@/shared/lib/ui/SegmentedControl';

interface SimpleTodoListProps {
    userId: string;
}

export enum filterOptions {
    ALL = 'All',
    Active = 'Active',
    FINISHED = 'Finished',
}

export const SimpleTodoList = memo((props: SimpleTodoListProps) => {
    const { userId } = props;
    const [value, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(filterOptions.ALL);
    const ref = useRef<BottomSheetPropsRef>(null);

    const {
        data, isLoading, isFetching, refetch,
    } = useGetTodos({
        userId,
        filter: selectedOption,
    });
    const [deleteTodoMutation] = useDeleteTodo();
    const [postTodoMutation, { isLoading: isPosting }] = usePostTodos();

    useEffect(() => {
        refetch();
    }, [refetch, selectedOption]);

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
            userId,
            description: value.trim(),
            completed: false,
        };
        await postTodoMutation(body);
        closeDrawer();
        setValue('');
    }, [closeDrawer, postTodoMutation, userId, value]);

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
        <View style={{ alignItems: 'center' }}>
            <SegmentedControl
                options={Object.values(filterOptions)}
                selectedOption={selectedOption}
                onOptionPress={setSelectedOption}
            />
            <TodoList items={data ?? []} isLoading={isLoading || isFetching} onDelete={onDelete} />
            <RNButton
                fullWidth
                height={48}
                theme="initial"
                onPress={openDrawer}
                style={{ marginTop: 'auto' }}
            >
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
        </View>
    );
});
