import Modal from '@cloudscape-design/components/modal';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import RadioGroup from '@cloudscape-design/components/radio-group';
import FormField from '@cloudscape-design/components/form-field';
import Box from '@cloudscape-design/components/box';

type SettingsModalProps = {
	visible: boolean;
	onDismiss: () => void;
};
export const SettingsModal = ({ visible, onDismiss }: SettingsModalProps) => {
	return (
		<Modal
			size="small"
			visible={visible}
			onDismiss={onDismiss}
			header={<Header variant="h2" children={'User Settings'} />}
		>
			<Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
				<Box margin={{ top: 'xs', bottom: 'l' }}>
					<FormField label="Theme">
						<RadioGroup
							name="theme-radio-group"
							value={null}
							items={[
								{ label: 'Light', value: 'light' },
								{ label: 'Dark', value: 'dark' },
							]}
						/>
					</FormField>
				</Box>

				<Box margin={{ top: 'xs', bottom: 'l' }}>
					<FormField label="Density">
						<RadioGroup
							name="density-radio-group"
							value={null}
							items={[
								{ label: 'Comfortable', value: 'comfortable' },
								{ label: 'Compact', value: 'compact' },
							]}
						/>
					</FormField>
				</Box>
			</Grid>
		</Modal>
	);
};
