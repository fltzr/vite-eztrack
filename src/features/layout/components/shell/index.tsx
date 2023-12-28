import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { setNavigationOpen, setToolsOpen } from '../../state/slice';
import { Breadcrumbs } from '../breadcrumbs';
import { Navigation } from '../navigation';
import { Notification } from '../notification';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import {
	selectBreadcrumbs,
	selectNavigationHidden,
	selectNavigationOpen,
	selectStickyNotifications,
	selectToolsHidden,
	selectToolsOpen,
} from '@/features/layout/state/selectors';

export const Shell = ({ children }: PropsWithChildren) => {
	const dispatch = useAppDispatch();

	const stickyNotifications = useAppSelector(selectStickyNotifications);
	const breadcrumbs = useAppSelector(selectBreadcrumbs);
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
			navigationWidth={240}
			navigation={<Navigation />}
			navigationOpen={navigationOpen}
			navigationHide={navigationHidden}
			toolsOpen={toolsOpen}
			toolsHide={toolsHidden}
			breadcrumbs={
				breadcrumbs.length > 2 ? <Breadcrumbs crumbs={breadcrumbs} /> : null
			}
			onNavigationChange={() => dispatch(setNavigationOpen(!navigationOpen))}
			onToolsChange={() => dispatch(setToolsOpen(!toolsOpen))}
		/>
	);
};
