import { rtkApi } from '@/shared/api/rtkApi';
import { GetTodo } from '@/entities/Todo/model/types/getTodo';

const todoApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<GetTodo[], void>({
            query: () => ({
                url: '/todos',
                method: 'GET',
            }),
        }),
    }),
});

export const useTodos = todoApi.useGetTodosQuery;
