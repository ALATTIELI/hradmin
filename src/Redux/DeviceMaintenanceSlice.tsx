import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockMaintenanceData from '../DeviceMaintenance/MockDeviceMaintenanceData';

type DeviceMaintenanceItem = {
    branchName: string;
    customerName: string;
    serialNumber: string;
    phoneNumber: string;
    dateReceived: string;
    description: string;
    device: string;
    price: string;
    repairType: string;
    status: 'Pending' | 'Received' | 'Replaced' | 'Rejected' | 'Sent Back';
    statusDate?: string; // Date & time when the status was updated
    rejectReason?: string; // Reason for rejection
};


const initialState: DeviceMaintenanceItem[] = mockMaintenanceData;

const deviceMaintenanceSlice = createSlice({
    name: 'deviceMaintenance',
    initialState,
    reducers: {
        addMaintenanceItem: (state, action: PayloadAction<DeviceMaintenanceItem>) => {
            state.push(action.payload);
        },
        setStatusReceived: (state, action: PayloadAction<string>) => {
            const item = state.find(i => i.serialNumber === action.payload);
            if (item) {
                item.status = 'Received';
                item.statusDate = new Date().toISOString();
            }
        },
        setStatusReplaced: (state, action: PayloadAction<string>) => {
            const item = state.find(i => i.serialNumber === action.payload);
            if (item) {
                item.status = 'Replaced';
                item.statusDate = new Date().toISOString();
            }
        },
        setStatusRejected: (state, action: PayloadAction<{ serialNumber: string; reason: string }>) => {
            const item = state.find(i => i.serialNumber === action.payload.serialNumber);
            if (item) {
                item.status = 'Rejected';
                item.statusDate = new Date().toISOString();
                item.rejectReason = action.payload.reason;
            }
        },
        setStatusSentBack: (state, action: PayloadAction<string>) => {
            const item = state.find(i => i.serialNumber === action.payload);
            if (item) {
                item.status = 'Sent Back';
                item.statusDate = new Date().toISOString();
            }
        }
    },
});

export const { 
    addMaintenanceItem, 
    setStatusReceived, 
    setStatusReplaced, 
    setStatusRejected, 
    setStatusSentBack 
} = deviceMaintenanceSlice.actions;

export default deviceMaintenanceSlice.reducer;
