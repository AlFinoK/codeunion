import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from 'entities/User'
import { userAPI } from 'entities/User/model/services/userAPI'
import { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers = {
        user: userReducer,
        [userAPI.reducerPath]: userAPI.reducer,
    }

    const store = configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
    })

    return store
}
