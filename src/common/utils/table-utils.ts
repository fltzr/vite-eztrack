import type { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';
import { capitalize, isEmpty } from 'lodash-es';
import type { TableProps } from '@cloudscape-design/components/table';
import { DateTimeForm } from '../layouts/table/date-time-form';

export type TableColumnWidth = { id: string; width: number };
export type TableColumnDefinition<T> = Omit<
	TableProps.ColumnDefinition<T>,
	'id' | 'width'
> &
	TableColumnWidth & {
		isVisible?: boolean;
		isDateOnly?: boolean;
		isDateTime?: boolean;
	};

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
	selectedItems && !isEmpty(selectedItems)
		? `(${selectedItems.length}/${items.length})`
		: `(${items.length}+)`;

export const createPageSizeOptions = (resource: string) => [
	{ value: 25, label: `25 ${capitalize(resource)}s` },
	{ value: 35, label: `35 ${capitalize(resource)}s` },
	{ value: 50, label: `50 ${capitalize(resource)}s` },
];

export const createFilteringProperties = <T>(
	columnDefinitions: TableColumnDefinition<T>[],
): PropertyFilterProperty[] =>
	columnDefinitions.map((columnDefinition) => ({
		key: columnDefinition.id,
		propertyLabel: columnDefinition.header?.toString() ?? '',
		groupValuesLabel: `${columnDefinition.header?.toString() ?? ''} values`,
		operators: columnDefinition.isDateTime
			? ['=', '!=', '<', '<=', '>', '>='].map((operator) => ({
					operator,
					match: 'datetime',
					form: DateTimeForm,
				}))
			: [':', '!:', '=', '!=', '^'],
	}));

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
		visible: columnDefinition.isVisible ?? true,
	})),
	wrapLines: false,
	stripedRows: false,
	contentDensity: 'comfortable',
	stickyColumns: { first: 0, last: 1 },
});
