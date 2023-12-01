import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ClientResponseError } from 'pocketbase';
import { addNotification } from '@/features/layout/state/slice';

export const handleThunkError = (
	dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
	error: unknown,
) => {
	const errorMessage =
		error instanceof ClientResponseError
			? error.message
			: 'An unknown error has occured. Please try again later.';
	const errorType = error instanceof ClientResponseError ? 'error' : 'warning';

	dispatch(
		addNotification({
			autoDismiss: true,
			id: `notification-${Date.now()}`,
			type: errorType,
			header: 'Operation failed.',
			content: errorMessage,
		}),
	);

	return errorMessage;
};
