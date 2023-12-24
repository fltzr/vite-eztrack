import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
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
	},
});

export const { setIsAuthenticated, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
