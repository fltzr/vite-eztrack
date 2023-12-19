import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReusableTable } from '@/common/layouts/table';
import { holidayColumnDefinitions, type Holiday, type HolidayResponse } from './config';

export const HolidaysTable = () => {
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [loadingHolidays, setLoadingHolidays] = useState(false);

	useEffect(() => {
		setLoadingHolidays(true);
		const fetchHolidays = async () => {
			const { data } = await axios.get<HolidayResponse>(
				'https://holidayapi.com/v1/holidays',
				{
					params: {
						country: 'US',
						year: 2022,
						key: '9fa56194-379a-4b34-8c54-978df8cb326a',
					},
				},
			);

			return data.holidays;
		};

		fetchHolidays()
			.then((data) => {
				setHolidays(data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoadingHolidays(false);
			});
	}, []);

	return (
		<ReusableTable
			variant="stacked"
			localstorageKeyPrefix="Holidays"
			resource="Holiday"
			columnDefinitions={holidayColumnDefinitions}
			items={holidays}
			loading={loadingHolidays}
			loadingText="Loading holiday items..."
			selectionType="single"
		/>
	);
};
