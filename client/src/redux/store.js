import {configureStore} from '@reduxjs/toolkit';
import userReduce from './user/userSlice.js';

export const store = configureStore({
    reducer:{user:userReduce},
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
})