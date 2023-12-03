import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';
import styles from './styles.module.scss';

type ConfirmDeleteModalProps = {
	visible: boolean;
	onDismiss: () => void;
	confirmDelete: () => void;
	resource: string;
	quantity: number;
};
export const ConfirmDeleteModal = ({ ...props }: ConfirmDeleteModalProps) => (
	<Modal
		size="medium"
		visible={props.visible}
		header={<Header variant="h2">Delete {props.resource}</Header>}
		footer={
			<div className={styles['footer-container']}>
				<SpaceBetween size="m" direction="horizontal">
					<Button variant="link" onClick={props.onDismiss}>
						Cancel
					</Button>
					<Button variant="primary" onClick={props.confirmDelete}>
						Delete
					</Button>
				</SpaceBetween>
			</div>
		}
		onDismiss={props.onDismiss}
	>
		<SpaceBetween size="s">
			<Box variant="span">
				{'Permanently delete '}
				<Box variant="strong">
					{props.quantity}{' '}
					{props.quantity === 1 ? `${props.resource}` : `${props.resource}s`}
				</Box>
				{"? You can't undo this action."}
			</Box>
			<Alert type="info" dismissible={false}>
				{'Proceeding with this action will delete the selected todo with all of '}
				{'their content, which can not be recovered.'}
			</Alert>
		</SpaceBetween>
	</Modal>
);
