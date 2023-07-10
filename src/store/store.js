import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import customerSlice from './customerSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    customers: customerSlice,
  },
});
