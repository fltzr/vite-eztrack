import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

type AuthState = {
	isAuthenticated: boolean | null;
	user: Partial<User> | null;
};

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		setUser: (state, action: PayloadAction<Partial<User>>) => {
			state.user = action.payload;
		},
		setAuthState: (state, action: PayloadAction<AuthState>) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.user = action.payload.user;
		},
	},
});

export const { setIsAuthenticated, setUser, setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
