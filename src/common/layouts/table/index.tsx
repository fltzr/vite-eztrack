import { useCollection } from '@cloudscape-design/collection-hooks';
import { capitalize } from 'lodash';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table, { type TableProps } from '@cloudscape-design/components/table';
import { Preferences } from '@/common/components/preferences';
import { useColumnWidths } from '@/common/hooks/use-column-widths';
import { useLocalStorage } from '@/common/hooks/use-local-storage';
import {
	createDefaultPreferences,
	createFilteringProperties,
	getHeaderCounterText,
	getTextFilterCounterText,
	type TableColumnDefinition,
} from '@/common/utils/table-utils';
import { FullPageHeader } from '../full-page-header';
import { TableEmptyState, TableNoMatchState } from './states';

type ReusableTableProps<T> = Partial<TableProps> & {
	localstorageKeyPrefix: string;
	resource: string;
	columnDefinitions: TableColumnDefinition<T>[];
	items: T[];
	loading?: boolean;
	loadingText?: string;
	onInfoClick?: () => void;
	onViewClick?: () => void;
	onEditClick?: () => void;
	onDeleteClick?: () => void;
	onCreateClick?: () => void;
};
export const ReusableTable = <T,>({
	localstorageKeyPrefix,
	resource,
	loading,
	loadingText,
	...props
}: ReusableTableProps<T>) => {
	const tableWidthsStorageKey = `React-${localstorageKeyPrefix}-Table-Widths`;
	const tablePreferencesStorageKey = `React-${localstorageKeyPrefix}-Table-Preferences`;

	const [columnDefinitions, saveWidths] = useColumnWidths({
		localstorageKey: tableWidthsStorageKey,
		columnDefinitions: props.columnDefinitions,
	});

	const [preferences, setPreferences] =
		useLocalStorage<CollectionPreferencesProps.Preferences>({
			localstorageKey: tablePreferencesStorageKey,
			initialValue: createDefaultPreferences(columnDefinitions),
		});

	const filteringProperties = createFilteringProperties(columnDefinitions);

	const {
		items,
		actions,
		filteredItemsCount,
		collectionProps,
		propertyFilterProps,
		paginationProps,
	} = useCollection(props.items, {
		propertyFiltering: {
			filteringProperties,
			empty: <TableEmptyState resource={resource.toLowerCase()} />,
			noMatch: (
				<TableNoMatchState
					onClearFilter={() => {
						actions.setFiltering('');
					}}
				/>
			),
		},
		pagination: { pageSize: 10 },
		sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
		selection: {},
	});

	return (
		<Table
			{...collectionProps}
			resizableColumns
			variant={props.variant}
			stickyHeader={props.stickyHeader}
			columnDefinitions={columnDefinitions}
			items={items}
			selectionType={props.selectionType}
			loading={loading}
			loadingText={loadingText}
			columnDisplay={preferences.contentDisplay}
			wrapLines={preferences.wrapLines}
			stripedRows={preferences.stripedRows}
			contentDensity={preferences.contentDensity}
			stickyColumns={preferences.stickyColumns}
			pagination={<Pagination {...paginationProps} />}
			header={
				<FullPageHeader
					title={`${capitalize(resource)}s`}
					selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
					counter={getHeaderCounterText({
						items,
						selectedItems: collectionProps.selectedItems,
					})}
					onInfoLinkClick={props.onInfoClick}
					onViewResourceClick={props.onViewClick}
					onEditResourceClick={props.onEditClick}
					onDeleteResourceClick={props.onDeleteClick}
					onCreateResourceClick={props.onCreateClick}
				/>
			}
			filter={
				<PropertyFilter
					{...propertyFilterProps}
					expandToViewport
					countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
					filteringAriaLabel={`Filter ${resource.toLowerCase()}s`}
					filteringPlaceholder={`Filter ${resource.toLowerCase()}s`}
				/>
			}
			preferences={
				<Preferences
					resource={resource}
					items={columnDefinitions}
					preferences={preferences}
					setPreferences={(event) => {
						setPreferences(event.detail);
					}}
				/>
			}
			onColumnWidthsChange={(event) => {
				console.log(`Widths changed: ${JSON.stringify(event.detail.widths)}`);
				saveWidths(event);
			}}
		/>
	);
};
