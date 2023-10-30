import { layoutReducer } from '@/features/layout/slice';
import { combineReducers } from '@reduxjs/toolkit';

export const reducers = combineReducers({
	layout: layoutReducer,
});
