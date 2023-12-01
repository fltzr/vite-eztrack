import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { client } from '@/common/api/pocketbase-client';

type LinkTokenResponse = {
	link_token?: string;
	expiration?: string;
	request_id?: string;
	hosted_link_url?: string;
};

type ExchangePublicTokenResponse = {
	item_id?: string;
	request_id?: string;
};

export const bankApi = createApi({
	reducerPath: 'bankApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URI }),
	endpoints: (builder) => ({
		checkAccountStatus: builder.query<string[], undefined>({
			query: () => ({
				url: '/bank/account-status',
				method: 'GET',
			}),
		}),
		fetchLinkToken: builder.mutation<LinkTokenResponse, void>({
			query: () => ({
				url: '/plaid/link-token',
				method: 'POST',
				body: {
					user_record_id: client.authStore.model?.id,
				},
			}),
		}),
		exchangePublicToken: builder.mutation<ExchangePublicTokenResponse, string>({
			query: (publicToken: string) => ({
				url: '/plaid/exchange-public-token',
				method: 'POST',
				body: { public_token: publicToken },
			}),
		}),
	}),
});

export const {
	useCheckAccountStatusQuery,
	useFetchLinkTokenMutation,
	useExchangePublicTokenMutation,
} = bankApi;
