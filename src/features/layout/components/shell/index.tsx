import AppLayout from '@cloudscape-design/components/app-layout';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import {
	selectNavigationHidden,
	selectNavigationOpen,
	selectToolsHidden,
	selectToolsOpen,
} from '@/features/layout/selectors';
import { PropsWithChildren } from 'react';
import { setNavigationOpen, setToolsOpen } from '../../slice';

export const Shell = ({ children }: PropsWithChildren) => {
	const dispatch = useAppDispatch();
	const navigationOpen = useAppSelector(selectNavigationOpen);
	const navigationHidden = useAppSelector(selectNavigationHidden);
	const toolsOpen = useAppSelector(selectToolsOpen);
	const toolsHidden = useAppSelector(selectToolsHidden);

	return (
		<AppLayout
			content={children}
			headerSelector="#h"
			navigationOpen={navigationOpen}
			navigationHide={navigationHidden}
			onNavigationChange={() => dispatch(setNavigationOpen(!navigationOpen))}
			toolsOpen={toolsOpen}
			toolsHide={toolsHidden}
			onToolsChange={() => dispatch(setToolsOpen(!toolsOpen))}
		/>
	);
};
