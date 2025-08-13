import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const stuffApi = createApi({
    reducerPath: 'stuffApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/FoundationV1/'}),
    endpoints: (builder) => ({
        getStuff: builder.query({
            query:() => 'GetStuff',
        }),
        addStuff:builder.mutation({
            query: (newStuff) => ({
                url: 'AddStuff',
                method: 'POST',
                body: newStuff
            }),
        }),
    }),
});

export const {useGetStuffQuery, useAddStuffMutation} = stuffApi