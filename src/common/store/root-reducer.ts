import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/slice';
import { layoutReducer } from '@/features/layout/slice';
import { todoReducer } from '@/features/todos/slice';

export const reducers = combineReducers({
	auth: authReducer,
	layout: layoutReducer,
	todos: todoReducer,
});
