import { Outlet } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import { Header } from '@/common/layouts/header';
import { Notification } from '@/features/layout/components/notification';
import styles from './styles.module.scss';

export const Component = () => (
	<>
		<Header />
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
