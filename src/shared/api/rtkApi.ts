import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.6:8000/',
        prepareHeaders: (headers) => {
            const token = '';

            if (token) {
                headers.set('Authorization', token);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
