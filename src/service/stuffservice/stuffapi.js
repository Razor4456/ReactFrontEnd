import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const stuffApi = createApi({
    reducerPath: 'stuffApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/FoundationV1/'}),
    endpoints: (builder) => ({
        getStuff: builder.query({
            query:(GetStuff) => ({
                url: 'GetStuff',
                method: 'GET',
                body: GetStuff
            }),
        }),
        addStuff:builder.mutation({
            query: (newStuff) => ({
                url: 'AddStuff',
                method: 'POST',
                body: newStuff
            }),
        }),
        EditStuff:builder.mutation({
            query: (editStuff) => ({
                url: 'EditStuff',
                method: 'PUT',
                body: editStuff
            }),
        }),
    }),
});

export const {useGetStuffQuery, useAddStuffMutation} = stuffApi