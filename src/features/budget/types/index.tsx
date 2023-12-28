import { z } from 'zod';

export type BudgetCatagories =
	| 'Shopping'
	| 'Bills'
	| 'Savings'
	| 'Loans'
	| 'Food'
	| 'Misc';

export const budgetItemSchema = z.object({
	id: z.string(),
	title: z.string(),
	value: z.string().transform((value) => parseFloat(value)),
	category: z.string(),
});

export const submitBudgetItemSchema = z.object({
	title: z.string(),
	value: z.string().transform((value) => parseFloat(value)),
	category: z.string(),
});

export type InferredBudgetItemSchema = z.infer<typeof budgetItemSchema>;

export type InferredSubmitBudgetItemSchema = z.infer<typeof submitBudgetItemSchema>;

export const incomeSchema = z.object({
	income: z.string(),
});

export type InferredIncomeSchema = z.infer<typeof incomeSchema>;
