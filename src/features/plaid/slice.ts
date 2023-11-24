import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppState } from '@/common/store';
import { selectUser } from '../auth/state/selectors';

type PlaidState = {
	linkToken: string;
	loading: boolean;
	error: string | null;
};

const initialState: PlaidState = {
	linkToken: '',
	loading: false,
	error: null,
};

export const fetchLinkToken = createAsyncThunk(
	'plaid/fetchLinkToken',
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as AppState;
		const user = selectUser(state);

		try {
			if (user) {
				const response = await axios.post<{
					link_token: string;
					expiration: string;
					request_id: string;
					hosted_link_url: string;
				}>(`${import.meta.env.VITE_API_URI}/plaid/link-token`, {
					user_record_id: user.id,
				});

				return response.data.link_token;
			}

			return null;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error
					? error.message
					: 'Error retrieving link_token. Please try again later.',
			);
		}
	},
);

const plaidSlice = createSlice({
	name: 'Plaid',
	initialState,
	reducer: {},
	extraReducers: (builder) => {
		builder.addCase();
	},
});
