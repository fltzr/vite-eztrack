/* eslint-disable unicorn/prefer-spread */
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/state/api';
import { budgetApi } from '@/features/budget/state/slice';
import { appListenerMiddleware } from './listener-middleware';
import { reducers } from './root-reducer';

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			budgetApi.middleware,
			appListenerMiddleware.middleware,
		),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
