import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export const Center = ({ children }: PropsWithChildren) => (
	<div className={styles.container}>{children}</div>
);
