import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/entities/User';

interface LoginByUserNameProps {
    username: string;
    password: string;
}

const loginApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        loginByUserName: build.mutation<User, LoginByUserNameProps>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const useLoginByUserName = loginApi.useLoginByUserNameMutation;
