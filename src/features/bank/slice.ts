/* eslint-disable @typescript-eslint/naming-convention */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { client } from '@/common/api/pocketbase-client';
import { handleThunkError } from '@/common/utils/handle-thunk-error';
import { addNotification } from '../layout/state/slice';

type BankState = {
	linkToken: string;
	loading: boolean;
	hasConnectedAccount?: boolean;
	error: string | null;
};

const initialState: BankState = {
	linkToken: '',
	loading: false,
	error: null,
};

export const checkAccountStatus = createAsyncThunk(
	'bank/checkAccountStatus',
	async (_, { dispatch, rejectWithValue }) => {
		const user = client.authStore.model;

		try {
			const response = await client
				.collection('bank')
				.getList(1, 50, { filter: `user.id='${user?.id}'` });

			return response.items;
		} catch (error) {
			const errorMessage = handleThunkError(dispatch, error);

			return rejectWithValue(errorMessage);
		}
	},
);

export const fetchLinkToken = createAsyncThunk(
	'bank/fetchLinkToken',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post<{
				link_token: string;
				expiration: string;
				request_id: string;
				hosted_link_url: string;
			}>(`${import.meta.env.VITE_API_URI}/plaid/link-token`, {
				user_record_id: client.authStore.model?.id,
			});

			return response.data.link_token;
		} catch (error) {
			const errorMessage = handleThunkError(dispatch, error);

			return rejectWithValue(errorMessage);
		}
	},
);

export const exchangePublicToken = createAsyncThunk(
	'plaid/exchangePublicToken',
	async (publicToken: string, { dispatch, rejectWithValue }) => {
		const user = client.authStore.model;

		try {
			const response = await axios.post<{ itemId: string }>(
				`${import.meta.env.VITE_API_URI}/plaid/token-exchange`,
				{
					user_id: user?.id,
					public_token: publicToken,
				},
			);

			dispatch(
				addNotification({
					autoDismiss: true,
					id: 'PLAID_TOKEN_EXCHANGE_SUCCESS',
					header: 'Successfully linked your account. Setting up...',
				}),
			);

			return response.data.itemId;
		} catch (error) {
			dispatch(
				addNotification({
					autoDismiss: true,
					id: 'PLAID_TOKEN_EXCHANGE_FAILED',
					header: 'Failed to link bank account. Please try again later.',
					content: `Error: PLAID_TOKEN_EXCHANGE_FAILED`,
				}),
			);

			return rejectWithValue(
				error instanceof Error
					? error.message
					: 'Error exchanging public token. Please try again later.',
			);
		}
	},
);

const bankSlice = createSlice({
	name: 'bank',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLinkToken.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchLinkToken.fulfilled, (state, action) => {
				state.linkToken = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchLinkToken.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error fetching link token.';
			})
			.addCase(exchangePublicToken.pending, (state) => {
				state.loading = true;
			})
			.addCase(exchangePublicToken.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(exchangePublicToken.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error exchanging public token.';
			})
			.addCase(checkAccountStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkAccountStatus.fulfilled, (state, action) => {
				state.loading = false;
				state.hasConnectedAccount = action.payload.length > 0;
			});
	},
});

export const bankReducer = bankSlice.reducer;
