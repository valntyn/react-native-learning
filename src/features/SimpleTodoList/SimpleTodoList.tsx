import { memo, useCallback } from 'react';
import { TodoList } from '@/entities/Todo';
import { useDeleteTodo, useGetTodos, usePostTodos } from '@/entities/Todo/api/todoApi';

interface SimpleTodoListProps {
    className?: string;
    userId: string;
}

export const SimpleTodoList = memo((props: SimpleTodoListProps) => {
    const { className, userId } = props;
    const { data, isLoading } = useGetTodos(
        { userId },
        {
            pollingInterval: 3000,
        },
    );
    const [deleteTodoMutation, { isLoading: isDeleting }] = useDeleteTodo();
    const [postTodoMutation, { isLoading: isPosting }] = usePostTodos();

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
        [data, postTodoMutation],
    );

    if (isLoading) {
        return null;
    }

    return <TodoList items={data ?? []} isLoading={isLoading} onDelete={onDelete} onAdd={onAdd} />;
});
