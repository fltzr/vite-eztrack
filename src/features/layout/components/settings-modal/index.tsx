import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Select, { type SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tiles from '@cloudscape-design/components/tiles';
import { selectDensity, selectTheme } from '@/features/layout/state/selectors';
import { setDensity, setTheme } from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import comfortableImage from './images/comfortable-density';
import { compactImage } from './images/compact-density';

const themeOptions: SelectProps.Option[] = [
	{ value: Theme.Light, label: 'Light' },
	{ value: Theme.Dark, label: 'Dark' },
];

type SettingsModalProps = {
	visible: boolean;
	onDismiss: () => void;
};
export const SettingsModal = ({ visible, onDismiss }: SettingsModalProps) => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(selectTheme);
	const density = useAppSelector(selectDensity);

	return (
		<Modal
			size="medium"
			visible={visible}
			header={<Header variant="h2">Theme Settings</Header>}
			onDismiss={onDismiss}
		>
			<Box margin={{ bottom: 'l' }}>
				<SpaceBetween size="m" direction="vertical">
					<FormField label="Theme">
						<Select
							options={themeOptions}
							selectedOption={
								themeOptions.find((opt) => opt.value === theme) ?? null
							}
							onChange={(event) =>
								dispatch(
									setTheme(event.detail.selectedOption.value as Theme),
								)
							}
						/>
					</FormField>
					<FormField label="Density">
						<Tiles
							value={density}
							items={[
								{
									value: Density.Comfortable,
									label: 'Comfortable',
									image: comfortableImage,
								},
								{
									value: Density.Compact,
									label: 'Compact',
									image: compactImage,
								},
							]}
							onChange={({ detail }) =>
								dispatch(setDensity(detail.value as Density))
							}
						/>
						{/* <Select
							options={densityOptions}
							selectedOption={
								densityOptions.find((opt) => opt.value === density) ??
								null
							}
							onChange={(event) =>
								dispatch(
									setDensity(
										event.detail.selectedOption.value as Density,
									),
								)
							}
						/> */}
					</FormField>
				</SpaceBetween>
			</Box>
		</Modal>
	);
};
