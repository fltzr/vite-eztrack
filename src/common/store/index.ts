import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './root-reducer';
import { logger } from './middleware';

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        import.meta.env.PROD
            ? getDefaultMiddleware()
            : getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
