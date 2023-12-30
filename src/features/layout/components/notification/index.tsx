import { useCallback, useEffect } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectNotifications } from '../../state/selectors';
import { removeNotification } from '../../state/slice';

export const Notification = () => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(selectNotifications);

	const handleDismiss = useCallback(
		(id: string) => {
			dispatch(removeNotification(id));
		},
		[dispatch],
	);

	useEffect(() => {
		const timers = notifications
			?.filter((noti) => noti.autoDismiss)
			.map((noti) =>
				setTimeout(() => {
					handleDismiss(noti.id ?? '');
				}, 5000),
			);

		return () => {
			timers?.forEach((timer) => {
				clearTimeout(timer);
			});
		};
	}, [notifications, handleDismiss]);

	return (
		<Flashbar
			stackItems
			items={
				notifications
					? notifications.map((notification) => ({
							...notification,
							dismissible: true,
							dismissLabel: 'Close',
							onDismiss: () => {
								handleDismiss(notification.id ?? '');
							},
						}))
					: []
			}
		/>
	);
};
