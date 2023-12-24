import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/state/api';
import { authReducer } from '@/features/auth/state/slice';
import { layoutReducer } from '@/features/layout/state/slice';
import { budgetApi } from '@/features/budget/state/slice';

export const reducers = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	auth: authReducer,
	[budgetApi.reducerPath]: budgetApi.reducer,
	layout: layoutReducer,
});
