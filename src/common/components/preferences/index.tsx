import {
	CollectionPreferences,
	type CollectionPreferencesProps,
} from '@cloudscape-design/components';
import {
	createContentDisplayOptions,
	createPageSizeOptions,
	type TableColumnDefinition,
} from '@/common/utils/table-utils';
import { addNotification } from '@/features/layout/state/slice';
import { useAppDispatch } from '@/common/hooks';

type PreferencesProps = {
	resource: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items: TableColumnDefinition<any>[];
	preferences: CollectionPreferencesProps.Preferences;
	setPreferences: CollectionPreferencesProps['onConfirm'];
	disabled?: boolean;
};
export const Preferences = ({ ...props }: PreferencesProps) => {
	const dispatch = useAppDispatch();
	const contentDisplayOptions = createContentDisplayOptions(props.items);
	const pageSizeOptions = createPageSizeOptions(props.resource);

	return (
		<CollectionPreferences
			disabled={props.disabled}
			confirmLabel="Apply"
			cancelLabel="Cancel"
			preferences={props.preferences}
			contentDisplayPreference={{ options: contentDisplayOptions }}
			pageSizePreference={{ options: pageSizeOptions }}
			wrapLinesPreference={{}}
			stripedRowsPreference={{}}
			contentDensityPreference={{}}
			stickyColumnsPreference={{
				firstColumns: {
					title: 'Stick first column(s)',
					description:
						'Keep the first column(s) visible while scrolling horizontally',
					options: [
						{ label: 'None', value: 0 },
						{ label: 'First column', value: 1 },
						{ label: 'First two columns', value: 2 },
					],
				},
				lastColumns: {
					title: 'Stick last column',
					description:
						'Keep the last column visible while scrolling horizontally',
					options: [
						{ label: 'None', value: 0 },
						{ label: 'Last column', value: 1 },
					],
				},
			}}
			onConfirm={(event) => {
				if (props.setPreferences) {
					props.setPreferences(event);
				} else {
					dispatch(
						addNotification({
							type: 'warning',
							content: 'Unable to save preferences. Please try again.',
						}),
					);
				}
			}}
		/>
	);
};
