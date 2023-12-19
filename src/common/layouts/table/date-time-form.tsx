/* eslint-disable react/hook-use-state */
import { useEffect, useState } from 'react';
import type { PropertyFilterOperatorFormProps } from '@cloudscape-design/collection-hooks';
import Calendar from '@cloudscape-design/components/calendar';
import DateInput from '@cloudscape-design/components/date-input';
import FormField from '@cloudscape-design/components/form-field';
import {
	isValidIsoDate,
	parseDateTimeFilter,
	parseValue,
} from '@/common/utils/table-preferences-utils';

type DateTimeFormProps = PropertyFilterOperatorFormProps<string>;
export const DateTimeForm = ({
	value,
	onChange,
	filter,
	operator,
}: DateTimeFormProps) => {
	const defaultTime = operator === '<' || operator === '>=' ? '00:00:00' : '23:59:59';
	const [{ date, time }, setDateTime] = useState(
		parseValue({ value: value ?? '', defaultTime }),
	);

	const handleChangeDate = (dateValue: string) => {
		setDateTime((prev) => ({ ...prev, date: dateValue }));
	};

	useEffect(() => {
		filter && setDateTime(parseDateTimeFilter(filter));
	}, [filter]);

	useEffect(() => {
		const dateTimeValue = `${date}T${time}`;

		if (dateTimeValue.trim()) {
			onChange(null);
		} else if (isValidIsoDate(dateTimeValue)) {
			onChange(dateTimeValue);
		}
	}, [date, onChange, time]);

	return (
		<div>
			<FormField description="Date" constraintText="Use YYYY/MM/DD format.">
				<DateInput
					placeholder="YYYY/MM/DD"
					value={date}
					onChange={(event) => {
						handleChangeDate(event.detail.value);
					}}
				/>
			</FormField>
			<Calendar
				value={date}
				locale="en-US"
				onChange={({ detail }) => {
					handleChangeDate(detail.value);
				}}
			/>
		</div>
	);
};
