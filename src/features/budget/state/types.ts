import type { InferredBudgetItemSchema } from '../types';

export type SingleBudgetItem = {
	item: InferredBudgetItemSchema;
};

export type MultipleBudgetItems = {
	items: InferredBudgetItemSchema[];
};
