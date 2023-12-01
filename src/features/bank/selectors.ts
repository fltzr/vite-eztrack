import type { AppState } from '@/common/store';

export const selectBankLinkToken = (state: AppState) => state.bank.linkToken;
export const selectBankLinkTokenLoading = (state: AppState) => state.bank.loading;
export const selectBankAccountStatus = (state: AppState) =>
	state.bank.hasConnectedAccount;
export const selectBankLinkTokenError = (state: AppState) => state.bank.error;
