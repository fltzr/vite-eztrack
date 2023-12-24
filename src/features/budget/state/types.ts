import type { InferredBudgetItemSchema } from '../types';

export type LinkTokenResponse = {
	link_token?: string;
	expiration?: string;
	request_id?: string;
	hosted_link_url?: string;
};

export type ExchangePublicTokenResponse = {
	item_id?: string;
	request_id?: string;
};

export type SingleBudgetItem = {
	item: InferredBudgetItemSchema;
};

export type MultipleBudgetItems = {
	items: InferredBudgetItemSchema[];
};
