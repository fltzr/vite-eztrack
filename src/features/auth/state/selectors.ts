import type { AppState } from '@/common/store';

export const selectIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;
export const selectUser = (state: AppState) => state.auth.user;
