import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types';

interface AuthResponse {
	user: User;
}

interface VerifyAuthResponse {
	user?: Partial<User>;
}

interface AuthCredentials {
	username: string;
	password: string;
}

type SignupRequest = AuthCredentials & Omit<User, 'username' | 'password'>;

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	endpoints: (builder) => ({
		signup: builder.mutation<AuthResponse, SignupRequest>({
			query: (data) => ({
				url: 'signup',
				method: 'POST',
				body: data,
			}),
		}),
		signin: builder.mutation<AuthResponse, AuthCredentials>({
			query: (credentials) => ({
				url: 'signin',
				method: 'POST',
				body: credentials,
				credentials: 'include',
			}),
		}),
		signout: builder.mutation({
			query: () => ({
				url: 'signout',
				method: 'POST',
				credentials: 'include',
			}),
		}),
		verify: builder.mutation<VerifyAuthResponse, void>({
			query: () => ({
				url: 'verify',
				method: 'POST',
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useSignupMutation,
	useSigninMutation,
	useSignoutMutation,
	useVerifyMutation,
} = authApi;
