import { rtkApi } from '@/shared/api/rtkApi';
import { GetTodo } from '@/entities/Todo/model/types/getTodo';
import { PostTodo } from '@/entities/Todo/model/types/postTodo';

const todoApi = rtkApi
    .enhanceEndpoints({
        addTagTypes: ['Todo'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getTodos: build.query<GetTodo[], { userId: string }>({
                query: ({ userId }) => ({
                    url: '/todos',
                    params: {
                        userId,
                    },
                    method: 'GET',
                }),
                providesTags: (_) => ['Todo'],
            }),
            postTodos: build.mutation<void, PostTodo>({
                query: (body) => ({
                    url: '/todos',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Todo'],
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
