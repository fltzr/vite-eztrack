import type { InferredBudgetItemSchema, InferredSubmitBudgetItemSchema } from '../types';

export interface SingleBudgetItem {
	item: InferredSubmitBudgetItemSchema;
}

export interface MultipleBudgetItems {
	items: InferredBudgetItemSchema[];
}
