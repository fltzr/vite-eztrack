import Spinner from '@cloudscape-design/components/spinner';
import styles from './styles.module.scss';

export const Loader = () => {
	return (
		<div className={styles['loader-container']}>
			<Spinner />
		</div>
	);
};
