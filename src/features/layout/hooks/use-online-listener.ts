import { useEffect, useRef } from 'react';
import { isError } from 'lodash-es';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectNotifications } from '../state/selectors';
import { addNotification, removeNotification } from '../state/slice';

export const useOnlineListener = () => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(selectNotifications);
	const ref = useRef(true);

	const offlineNotificationId = 'notification-client-offline';

	useEffect(() => {
		let counter = 0;
		let abort: AbortController | null = null;

		const interval = setInterval(() => {
			counter = counter + 1;

			if (ref.current && counter < 10) {
				return;
			}

			counter = 0;

			if (abort) {
				abort.abort();
			}

			abort = new AbortController();
			const { signal } = abort;

			fetch('/api/health-check', { signal })
				.then(() => {
					if (notifications?.some((n) => n.id === offlineNotificationId)) {
						dispatch(removeNotification(offlineNotificationId));
					}

					ref.current = true;
				})
				.catch((error) => {
					if (isError(error) && error.name === 'AbortError') {
						return;
					}

					if (!notifications?.some((n) => n.id === offlineNotificationId)) {
						dispatch(
							addNotification({
								id: offlineNotificationId,
								type: 'error',
								header: 'Check your connection.',
								dismissible: false,
							}),
						);
					}
				});
		}, 5000);

		return () => {
			clearInterval(interval);
			if (abort) {
				abort.abort();
			}
		};
	}, [dispatch, notifications]);
};
