import type { PropsWithChildren } from 'react';
import Box from '@cloudscape-design/components/box';
import styles from './styles.module.scss';

export const Divider = ({ children }: PropsWithChildren) => (
	<div className={styles['divider-container']}>
		<hr className={`${styles.divider} ${styles['divider-left']}`} />
		<Box variant="span" color="text-status-inactive">
			{children}
		</Box>
		<hr className={`${styles.divider} ${styles['divider-right']}`} />
	</div>
);
