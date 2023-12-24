import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type MultipleBudgetItems, type SingleBudgetItem } from './types';
import type { InferredBudgetItemSchema } from '../types';

export const budgetApi = createApi({
	reducerPath: 'budgetApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	endpoints: (builder) => ({
		fetchBudgetItems: builder.query<MultipleBudgetItems, void>({
			query: () => '/bank/budget-item/fetch',
		}),
		createBudgetItem: builder.mutation<void, SingleBudgetItem>({
			query: (data) => ({
				url: '/bank/budget-item/create',
				method: 'POST',
				body: data,
			}),
		}),
		deleteBudgetItem: builder.mutation<void, Pick<InferredBudgetItemSchema, 'id'>>({
			query: (data) => ({
				url: '/bank/budget-item/delete',
				method: 'DELETE',
				body: data,
			}),
		}),
	}),
});

export const {
	useCreateBudgetItemMutation,
	useFetchBudgetItemsQuery,
	useDeleteBudgetItemMutation,
} = budgetApi;
