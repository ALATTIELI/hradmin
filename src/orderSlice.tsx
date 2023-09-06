// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Item = {
  name: string;
  quantity: number;
};

type Stockorder = {
  id: number;
  branchName: string;
  date: string;
  items: Item[];
  status: string;
};

const initialState: Stockorder[] = [
  // sample data
  {
    id: 1,
    branchName: "Branch A",
    date: "2023-09-01",
    items: [
      { name: "Item 1", quantity: 10 },
      { name: "Item 2", quantity: 5 },
    ],
    status: "Pending"
  },
];

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Stockorder>) => {
      state.push(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const order = state.find(order => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    // ... any other order-related actions you want
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
