import {
	type TypedAddListener,
	type TypedStartListening,
	addListener,
	createListenerMiddleware,
} from '@reduxjs/toolkit';
import type { AppDispatch, AppState } from '.';

export const appListenerMiddleware = createListenerMiddleware();

export type StartAppListening = TypedStartListening<AppState, AppDispatch>;
export const startAppListening =
	appListenerMiddleware.startListening as StartAppListening;

export const addAppListener = addListener as TypedAddListener<AppState, AppDispatch>;
