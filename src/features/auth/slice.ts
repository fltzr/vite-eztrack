import axios, { AxiosError } from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { load, remove, save } from '@/common/utils';
import { SIGNIN, SIGNUP } from '@/common/api/auth';
import type { User } from '@/common/types/user';
import type { InferredSigninSchema, InferredSignupSchema } from './types';

export type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: string | null;
};

const getInitialState = (): AuthState => {
    const user = load<User>('user');
    const token = load<string>('auth');

    return {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isAuthenticating: false,
        error: null,
    };
};

const extractErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError && error.response) {
        return error.response.data.message || 'An error occured.';
    }

    return 'An error occured.';
};

export const signin = createAsyncThunk(
    'auth/signin',
    async (credentials: InferredSigninSchema, { rejectWithValue }) => {
        try {
            const response = await axios.post(SIGNIN, credentials);
            save<string>('auth', response.data.token);
            save<User>('user', response.data.record);

            return { token: response.data.token, user: response.data.record };
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (credentials: InferredSignupSchema, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(SIGNUP, credentials);

            const signinCredentials: InferredSigninSchema = {
                identity: credentials.email,
                password: credentials.password,
            };

            return dispatch(signin(signinCredentials));
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            remove('user');
            remove('auth');
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
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.isAuthenticating = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isAuthenticating = false;
                state.error = (action.payload as string) || 'Failed to create account.';
            });
    },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
