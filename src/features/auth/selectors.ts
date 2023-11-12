import { AppState } from '@/common/store';

export const selectUser = (state: AppState) => state.auth.user;
export const selectToken = (state: AppState) => state.auth.token;
export const selectIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;
export const selectIsAuthenticating = (state: AppState) => state.auth.isAuthenticating;
export const selectSigninError = (state: AppState) => state.auth.signinError;
export const selectSignupError = (state: AppState) => state.auth.signupError;
