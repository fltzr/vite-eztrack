import type { InferredBudgetItemSchema, InferredSubmitBudgetItemSchema } from '../types';

export type SingleBudgetItem = {
	item: InferredSubmitBudgetItemSchema;
};

export type MultipleBudgetItems = {
	items: InferredBudgetItemSchema[];
};
