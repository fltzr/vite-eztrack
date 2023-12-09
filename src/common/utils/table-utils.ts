import type { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';
import { capitalize } from 'lodash';
import type { TableProps } from '@cloudscape-design/components/table';

export type TableColumnWidth = { id: string; width: number };
export type TableColumnDefinition<T> = Omit<
	TableProps.ColumnDefinition<T>,
	'id' | 'width'
> &
	TableColumnWidth & { visible?: boolean };

type AddWidthToColumnDefinitionsParams<T> = {
	columnDefinitions: TableColumnDefinition<T>[];
	columnWidthsArray: TableColumnWidth[];
};

export const addWidthToColumnDefinitions = <T>({
	columnDefinitions,
	columnWidthsArray,
}: AddWidthToColumnDefinitionsParams<T>): TableColumnDefinition<T>[] =>
	columnDefinitions.map((columnDefinition) => {
		const column = columnWidthsArray.find((col) => col.id === columnDefinition.id);

		return {
			...columnDefinition,
			width: column?.width ?? columnDefinition.width,
		};
	});

type MapWidthWithColumnDefinitionIdsParams<T> = {
	columnDefinitions: TableColumnDefinition<T>[];
	widths: readonly number[];
};

export const mapWidthWithColumnDefinitionIds = <T>({
	columnDefinitions,
	widths,
}: MapWidthWithColumnDefinitionIdsParams<T>): TableColumnWidth[] =>
	columnDefinitions.map((column, index) => ({
		id: column.id,
		width: widths[index],
	}));

export const getTextFilterCounterText = (count: number) =>
	`${count} ${count === 1 ? 'match' : 'matches'}`;

type GetHeaderCounterTextParams = {
	items: readonly unknown[];
	selectedItems?: readonly unknown[];
};
export const getHeaderCounterText = ({
	items,
	selectedItems,
}: GetHeaderCounterTextParams) =>
	selectedItems && selectedItems.length > 0
		? `(${selectedItems.length}/${items.length})`
		: `(${items.length}+)`;

export const createPageSizeOptions = (resource: string) => [
	{ value: 10, label: `10 ${capitalize(resource)}s` },
	{ value: 20, label: `20 ${capitalize(resource)}s` },
	{ value: 30, label: `30 ${capitalize(resource)}s` },
];

export const createFilteringProperties = <T>(
	columnDefinitions: TableColumnDefinition<T>[],
): PropertyFilterProperty[] =>
	columnDefinitions.map((columnDefinition) => {
		const isDate = columnDefinition.id.includes('date');

		return {
			key: columnDefinition.id,
			propertyLabel: columnDefinition.header?.toString() ?? '',
			groupValuesLabel: `${columnDefinition.header?.toString() ?? ''} values`,
			operators: isDate
				? ['=', '!=', '<', '<=', '>', '>='].map((operator) => ({
						operator,
						match: 'date',
				  }))
				: [':', '!:', '=', '!=', '^'],
		};
	});

export const createContentDisplayOptions = (
	columnDefinitions: TableColumnDefinition<unknown>[],
): CollectionPreferencesProps.ContentDisplayOption[] =>
	columnDefinitions.map((columnDefinition) => ({
		id: columnDefinition.id,
		label: columnDefinition.header?.toString() ?? '',
		alwaysVisible: columnDefinition.id === 'id',
	}));

export const createDefaultPreferences = <T>(
	columnDefinitions: TableColumnDefinition<T>[],
): CollectionPreferencesProps.Preferences => ({
	pageSize: 30,
	contentDisplay: columnDefinitions.map((columnDefinition) => ({
		id: columnDefinition.id,
		visible: columnDefinition.visible ?? true,
	})),
	wrapLines: false,
	stripedRows: false,
	contentDensity: 'comfortable',
	stickyColumns: { first: 0, last: 1 },
});
