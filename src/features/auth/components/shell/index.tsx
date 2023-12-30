import { Outlet } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import { BlankTopNavigation } from '@/common/layouts/blank-top-navigation';
import { Notification } from '@/features/layout/components/notification';
import styles from './styles.module.scss';

export const Component = () => (
	<>
		<BlankTopNavigation />
		<AppLayout
			navigationHide
			toolsHide
			navigationWidth={0}
			toolsWidth={0}
			notifications={<Notification />}
			content={
				<div className={styles.container}>
					<Outlet />
				</div>
			}
		/>
	</>
);
