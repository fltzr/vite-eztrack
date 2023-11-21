import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/state/slice';
import { layoutReducer } from '@/features/layout/state/slice';
import { todoReducer } from '@/features/todos/state/slice';

export const reducers = combineReducers({
	auth: authReducer,
	layout: layoutReducer,
	todos: todoReducer,
});
