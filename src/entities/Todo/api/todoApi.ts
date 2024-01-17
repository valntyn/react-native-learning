import { rtkApi } from '@/shared/api/rtkApi';
import { GetTodo } from '@/entities/Todo/model/types/getTodo';

const todoApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<GetTodo[], { userId: string }>({
            query: ({ userId }) => ({
                url: '/todos',
                params: {
                    userId,
                },
                method: 'GET',
            }),
        }),
        postTodos: build.mutation<void, void>({
            query: (body) => ({
                url: '/todos',
                method: 'POST',
                body,
            }),
        }),
        putTodo: build.mutation<void, GetTodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo,
            }),
        }),
        deleteTodo: build.mutation<void, { todoId: string }>({
            query: ({ todoId }) => ({
                url: `/todos/${todoId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const useGetTodos = todoApi.useGetTodosQuery;
export const usePostTodos = todoApi.usePostTodosMutation;
export const usePutTodos = todoApi.usePutTodoMutation;
export const useDeleteTodo = todoApi.useDeleteTodoMutation;
