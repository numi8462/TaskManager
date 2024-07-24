import {configureStore} from '@reduxjs/toolkit';

import authReducer from './authSlice';
import taskReducer from './taskSlice';

// store authentication key to the local database
export const store = configureStore({
    reducer: {auth: authReducer}
})
