import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/Login/'}),
    endpoints: (builder) => ({
        Login:builder.mutation({
            query: (LoginPayload) => ({
                url: 'LoginUser',
                method: 'POST',
                body: LoginPayload
            }),
        }),
    }),
});

export const {useLoginMutation} = loginApi