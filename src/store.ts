// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import warrantySlice from './warrantySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    warranty: warrantySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
