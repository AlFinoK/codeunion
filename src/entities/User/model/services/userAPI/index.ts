import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from 'shared/consts/urls'
import { IUser } from '../../types/user'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUserData: builder.query<IUser[], number>({
            query: (page: number = 2, limit: number = 10) => ({
                url: '/users',
                params: {
                    page,
                    limit,
                },
            }),
            providesTags: () => ['User'],
        }),
        createUser: builder.mutation<IUser, IUser>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})
