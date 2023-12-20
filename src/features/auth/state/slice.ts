/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { AuthModel } from 'pocketbase';
import { client } from '@/common/api/pocketbase-client';
import { createUser } from '../api/users';
import type { InferredSigninSchema, InferredSignupSchema } from '../types';

type User = AuthModel;

export type AuthState = {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	signinError: string | null;
	signupError: string | null;
};

const getInitialState = (): AuthState => {
	const user = client.authStore.model;
	const { token } = client.authStore;

	return {
		user,
		token,
		isAuthenticated: Boolean(user) && Boolean(token),
		isAuthenticating: false,
		signinError: null,
		signupError: null,
	};
};

const extractErrorMessage = (error: unknown): string => {
	console.log(error);
	if (error instanceof AxiosError && error.response?.data) {
		return (error.response.data as string) || 'An error occured.';
	}

	return 'An error occured.';
};

export const signin = createAsyncThunk(
	'auth/signin',
	async (credentials: InferredSigninSchema, { rejectWithValue }) => {
		try {
			const response = await client
				.collection('users')
				.authWithPassword(credentials.identity, credentials.password);

			return { token: response.token, user: response.record };
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	},
);

export const signup = createAsyncThunk(
	'auth/signup',
	async (credentials: InferredSignupSchema, { dispatch, rejectWithValue }) => {
		try {
			await createUser(credentials);

			const signinCredentials: InferredSigninSchema = {
				identity: credentials.email,
				password: credentials.password,
			};

			return await dispatch(signin(signinCredentials));
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: getInitialState(),
	reducers: {
		signout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.signinError = null;
			state.signupError = null;
			client.authStore.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signin.pending, (state) => {
				state.isAuthenticating = true;
			})
			.addCase(
				signin.fulfilled,
				(state, action: PayloadAction<{ user: User; token: string }>) => {
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.isAuthenticating = false;
					state.isAuthenticated = true;
				},
			)
			.addCase(signin.rejected, (state, action) => {
				state.isAuthenticating = false;
				state.isAuthenticated = false;
				state.signinError = action.payload as string;
			})
			.addCase(signup.pending, (state) => {
				state.isAuthenticating = true;
				state.signupError = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isAuthenticating = false;
				state.signupError =
					(action.payload as string) || 'Failed to create account.';
			});
	},
});

export const { signout } = authSlice.actions;
export const authReducer = authSlice.reducer;
