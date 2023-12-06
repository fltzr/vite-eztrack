/* eslint-disable react/no-multi-comp */
import { Outlet } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import { BlankTopNavigation } from '@/common/components/blank-top-navigation';

import styles from './styles.module.scss';

export const Shell = () => (
	<>
		<BlankTopNavigation />
		<AppLayout
			navigationHide
			toolsHide
			navigationWidth={0}
			toolsWidth={0}
			content={
				<div className={styles.container}>
					<Outlet />
				</div>
			}
		/>
	</>
);
