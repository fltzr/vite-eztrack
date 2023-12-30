import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constant } from 'lodash-es';
import type { InferredBudgetItemSchema } from '../types';
import type { MultipleBudgetItems, SingleBudgetItem } from './types';

export const budgetApi = createApi({
	reducerPath: 'budgetApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	tagTypes: ['BudgetItem'],
	endpoints: (builder) => ({
		fetchBudgetItems: builder.query<MultipleBudgetItems, undefined>({
			query: constant('/bank/budget-item/fetch'),
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }) => ({
								type: 'BudgetItem' as const,
								id,
							})),
							'BudgetItem',
						]
					: ['BudgetItem'],
		}),
		createBudgetItem: builder.mutation<
			{ item: InferredBudgetItemSchema; messaage: string },
			SingleBudgetItem
		>({
			query: (data) => ({
				url: '/bank/budget-item/create',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (result) => [
				{ type: 'BudgetItem', id: result?.item.id },
				'BudgetItem',
			],
		}),
		deleteBudgetItem: builder.mutation<
			undefined,
			Pick<InferredBudgetItemSchema, 'id'>
		>({
			query: (data) => ({
				url: `/bank/budget-item/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => ['BudgetItem'],
		}),
	}),
});

export const {
	useCreateBudgetItemMutation,
	useFetchBudgetItemsQuery,
	useDeleteBudgetItemMutation,
} = budgetApi;
