// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import warrantySlice from './warrantySlice';
import DeviceMaintenanceSlice from './DeviceMaintenanceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    warranty: warrantySlice,
    DeviceMaintenance: DeviceMaintenanceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
