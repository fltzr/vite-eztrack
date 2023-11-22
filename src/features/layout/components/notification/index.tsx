import Flashbar from '@cloudscape-design/components/flashbar';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectNotifications } from '../../state/selectors';
import { removeNotification } from '../../state/slice';

export const Notification = () => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(selectNotifications);

	const handleDismiss = (id: string) => {
		dispatch(removeNotification(id));
	};

	return (
		<Flashbar
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
