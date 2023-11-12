import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';
import Box from '@cloudscape-design/components/box';

export const Divider = ({ children }: PropsWithChildren) => (
    <div className={styles['divider-container']}>
        <hr className={`${styles['divider']} ${styles['divider-left']}`} />
        <Box variant="span" color="text-status-inactive">
            {children}
        </Box>
        <hr className={`${styles['divider']} ${styles['divider-right']}`} />
    </div>
);
