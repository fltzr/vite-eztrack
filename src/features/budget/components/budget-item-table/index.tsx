import { ReusableTable } from '@/common/layouts/table';
import { useDeleteBudgetItemMutation } from '../../state/slice';
import type { InferredBudgetItemSchema } from '../../types';
import { budgetItemColumnDefinition } from './config';

type BudgetItemTableProps = {
	tableStatus?: 'loading' | 'error' | 'finished';
	budgetItems: InferredBudgetItemSchema[];
};

export const BudgetItemTable = ({ tableStatus, budgetItems }: BudgetItemTableProps) => {
	const [deleteBudgetItem] = useDeleteBudgetItemMutation();

	const handleDeleteClick = async (id: string) => {
		try {
			await deleteBudgetItem({ id }).unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ReusableTable
			variant="container"
			localstorageKeyPrefix="Budget-Item"
			resource="Budget item"
			columnDefinitions={budgetItemColumnDefinition}
			items={budgetItems}
			loading={tableStatus === 'loading'}
			selectionType="multi"
			onDeleteClick={(event) => {
				void handleDeleteClick(event);
			}}
		/>
	);
};
