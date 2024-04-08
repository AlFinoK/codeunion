import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchUserData } from '../services/fetchUserData'
import { UserSchema } from '../types/user'

const initialState: UserSchema = {
    userData: [],
    isLoading: false,
    error: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = ''
            state.userData = action.payload
        })
        builder.addCase(fetchUserData.rejected, (state, action: PayloadAction<any, string>) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
