import PockerBase, { AuthModel } from 'pocketbase';
import { AxiosError } from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { InferredSigninSchema, InferredSignupSchema } from './types';

type User = AuthModel;
const pb = new PockerBase(import.meta.env.VITE_API_URI);

export type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    signinError: string | null;
    signupError: string | null;
};

const getInitialState = (): AuthState => {
    const user = pb.authStore.model;
    const token = pb.authStore.token;

    return {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isAuthenticating: false,
        signinError: null,
        signupError: null,
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
            // const response = await axios.post(SIGNIN, credentials);
            // save<string>('auth', response.data.token);
            // save<User>('user', response.data.record);
            const response = await pb
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
            await pb.collection('user').create(credentials);

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
            state.signinError = null;
            state.signupError = null;
            pb.authStore.clear();
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

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
