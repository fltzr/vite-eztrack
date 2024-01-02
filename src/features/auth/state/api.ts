import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types';

type AuthResponse = {
	user: User;
};

type VerifyAuthResponse = {
	data?: Pick<User, 'id' | 'username' | 'email'>;
	message: string;
};

type AuthCredentials = {
	username: string;
	password: string;
};

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
		verify: builder.mutation<VerifyAuthResponse, undefined>({
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
