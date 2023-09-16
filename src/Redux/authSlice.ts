import { createSlice } from '@reduxjs/toolkit';

// Define a type for the employee
type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    position: string;
    department: string;
    dateJoined: string;
    photoUrl?: string;
  };
  
  // Define the AuthState type
  type AuthState = {
    isAuthenticated: boolean;
    user: Employee | null;
  };
  
  // Initial state using the AuthState type
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
  };
  
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
