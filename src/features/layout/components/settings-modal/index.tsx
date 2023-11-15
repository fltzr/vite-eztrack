import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import Modal from '@cloudscape-design/components/modal';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import FormField from '@cloudscape-design/components/form-field';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectDensity, selectTheme } from '@/features/layout/selectors';
import { changeDensity, changeTheme } from '../../slice';

const themeOptions: SelectProps.Option[] = [
    { value: Theme.Light, label: 'Light' },
    { value: Theme.Dark, label: 'Dark' },
];

const densityOptions: SelectProps.Option[] = [
    { value: Density.Comfortable, label: 'Comfortable' },
    { value: Density.Compact, label: 'Compact' },
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
            size="small"
            visible={visible}
            onDismiss={onDismiss}
            header={<Header variant="h2" children={'User Settings'} />}
        >
            <SpaceBetween size="m" direction="vertical">
                <FormField label="Theme">
                    <Select
                        selectedOption={
                            themeOptions.find((opt) => opt.value === theme) || null
                        }
                        options={themeOptions}
                        onChange={(event) =>
                            dispatch(
                                changeTheme(event.detail.selectedOption.value as Theme),
                            )
                        }
                    />
                </FormField>
                <FormField label="Density">
                    <Select
                        selectedOption={
                            densityOptions.find((opt) => opt.value === density) || null
                        }
                        options={densityOptions}
                        onChange={(event) =>
                            dispatch(
                                changeDensity(
                                    event.detail.selectedOption.value as Density,
                                ),
                            )
                        }
                    />
                </FormField>
            </SpaceBetween>
        </Modal>
    );
};
