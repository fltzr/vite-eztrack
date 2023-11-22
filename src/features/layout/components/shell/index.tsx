import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import {
	selectNavigationHidden,
	selectNavigationOpen,
	selectStickyNotifications,
	selectToolsHidden,
	selectToolsOpen,
} from '@/features/layout/state/selectors';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { setNavigationOpen, setToolsOpen } from '../../state/slice';
import { Navigation } from '../navigation';
import { Notification } from '../notification';

export const Shell = ({ children }: PropsWithChildren) => {
	const dispatch = useAppDispatch();

	const stickyNotifications = useAppSelector(selectStickyNotifications);
	const navigationOpen = useAppSelector(selectNavigationOpen);
	const navigationHidden = useAppSelector(selectNavigationHidden);
	const toolsOpen = useAppSelector(selectToolsOpen);
	const toolsHidden = useAppSelector(selectToolsHidden);

	return (
		<AppLayout
			content={children}
			headerSelector="#h"
			stickyNotifications={stickyNotifications}
			notifications={<Notification />}
			navigation={<Navigation />}
			navigationOpen={navigationOpen}
			navigationHide={navigationHidden}
			toolsOpen={toolsOpen}
			toolsHide={toolsHidden}
			onNavigationChange={() => dispatch(setNavigationOpen(!navigationOpen))}
			onToolsChange={() => dispatch(setToolsOpen(!toolsOpen))}
		/>
	);
};
