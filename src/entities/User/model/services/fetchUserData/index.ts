import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser } from 'entities/User/model/types/user'
import { URL } from 'shared/consts/urls'

export const fetchUserData = createAsyncThunk<IUser>(
    'users/fetchUserData',
    // @ts-ignore
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser>(`${URL}/users`)
            if (!response.data) {
                throw new Error('error')
            } else {
                return response.data
            }
        } catch (error) {
            return error
        }
    },
)
