import { format, isValid, parseISO } from 'date-fns';

export const isValidIsoDate = (date: string) => isValid(parseISO(date));

interface ParseValueParams { value: string; defaultTime: string }
export const parseValue = ({ value, defaultTime = '' }: ParseValueParams) => {
	const [dateValue = '', timeValue = ''] = value.split('T');

	return { date: dateValue, time: timeValue || defaultTime };
};

export const parseDateTimeFilter = (filter: string) => {
	const dateTime = parseISO(filter);

	if (!isValid(dateTime)) {
		return { date: '', time: '' };
	}

	const date = format(dateTime, 'yyyy-MM-dd');
	const time = format(dateTime, 'HH:mm');

	return { date, time };
};
