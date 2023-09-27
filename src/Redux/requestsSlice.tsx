import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Request = {
  id: number;
  name: string;
  branch: string;
  type: string;
  details: string;
  status: "pending" | "approved" | "rejected";
};

const initialState: Request[] = [];

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Request>) => {
      state.push(action.payload);
    },
    approveRequest: (state, action: PayloadAction<number>) => {
      const request = state.find((req) => req.id === action.payload);
      if (request) {
        request.status = "approved";
      }
    },
    rejectRequest: (state, action: PayloadAction<number>) => {
      const request = state.find((req) => req.id === action.payload);
      if (request) {
        request.status = "rejected";
      }
    },
  },
});

export const { addRequest, approveRequest, rejectRequest } =
  requestsSlice.actions;
export default requestsSlice.reducer;
