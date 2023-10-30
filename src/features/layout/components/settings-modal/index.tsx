import Modal from '@cloudscape-design/components/modal';

type SettingsModalProps = {
	visible: boolean;
	onDismiss: () => void;
};
export const SettingsModal = ({ visible, onDismiss }: SettingsModalProps) => {
	return (
		<Modal visible={visible} onDismiss={onDismiss}>
			<div>Settings</div>
		</Modal>
	);
};
