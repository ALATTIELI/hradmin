    import { createSlice, PayloadAction } from '@reduxjs/toolkit';
    import mockWarrantyData from '../WarrantyItems/mockWarrantyData';

    type WarrantyItem = {
        branch: string;
        employeeName: string;
        invoiceNumber: string;
        phoneNumber: string;
        dateReceived: string;
        description: string;
        status: 'Pending' | 'Received' | 'Replaced' | 'Rejected' | 'Sent Back';
        statusDate?: string; // Date & time when the status was updated
        rejectReason?: string; // Reason for rejection
    };

    const initialState: WarrantyItem[] = mockWarrantyData;

    const warrantySlice = createSlice({
        name: 'warranty',
        initialState,
        reducers: {
            addWarrantyItem: (state, action: PayloadAction<WarrantyItem>) => {
                state.push(action.payload);
            },
            setStatusReceived: (state, action: PayloadAction<string>) => {
                const item = state.find(i => i.invoiceNumber === action.payload);
                if (item) {
                    item.status = 'Received';
                    item.statusDate = new Date().toISOString();
                }
            },
            setStatusReplaced: (state, action: PayloadAction<string>) => {
                const item = state.find(i => i.invoiceNumber === action.payload);
                if (item) {
                    item.status = 'Replaced';
                    item.statusDate = new Date().toISOString();
                }
            },
            setStatusRejected: (state, action: PayloadAction<{ invoiceNumber: string; reason: string }>) => {
                const item = state.find(i => i.invoiceNumber === action.payload.invoiceNumber);
                if (item) {
                    item.status = 'Rejected';
                    item.statusDate = new Date().toISOString();
                    item.rejectReason = action.payload.reason;
                }
            },
            setStatusSentBack: (state, action: PayloadAction<string>) => {
                const item = state.find(i => i.invoiceNumber === action.payload);
                if (item) {
                    item.status = 'Sent Back';
                    item.statusDate = new Date().toISOString();
                }
            }
            
        },
    });

    export const { addWarrantyItem, setStatusReceived, setStatusReplaced, setStatusRejected, setStatusSentBack } = warrantySlice.actions;

    export default warrantySlice.reducer;
