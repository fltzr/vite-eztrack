import { configureStore } from '@reduxjs/toolkit';
import { appListenerMiddleware } from './listener-middleware';
import { logger } from './logger-middleware';
import { reducers } from './root-reducer';

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(appListenerMiddleware.middleware).prepend(logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
