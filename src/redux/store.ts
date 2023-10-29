import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './root-reducer';

export const store = configureStore({
	reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
