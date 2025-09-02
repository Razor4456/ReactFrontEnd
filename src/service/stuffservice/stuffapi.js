import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const stuffApi = createApi({
    reducerPath: 'stuffApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/FoundationV1/'}),
    endpoints: (builder) => ({
        getStuff: builder.query({
            query:(GetStuff) => ({
                url: 'GetStuff',
                method: 'GET',
            }),
        }),
        getStuffById: builder.query({
            query: (id) => `GetStuffId/${id}`
        }),
        addStuff:builder.mutation({
            query: (newStuff) => ({
                url: 'AddStuff',
                method: 'POST',
                body: newStuff
            }),
        }),
        EditStuff:builder.mutation({
            query: ({id,data}) => ({
                url: `EditStuff/${id}`,
                method: 'PUT',
                body: data
            }),
        }),
        DeletStuff:builder.mutation({
            query: ({id}) => ({
                url: `DeleteStuff`,
                method: 'DELETE',
                body: { id: id}
            }),
        }),
    }),
});

export const {useGetStuffQuery, useAddStuffMutation, useEditStuffMutation, useGetStuffByIdQuery,useDeletStuffMutation} = stuffApi