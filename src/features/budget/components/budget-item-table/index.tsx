import type { InferredBudgetItemSchema } from '../../types';
import { useDeleteBudgetItemMutation } from '../../state/slice';
import { budgetItemColumnDefinition } from './config';
import { ReusableTable } from '@/common/layouts/table';

interface BudgetItemTableProps {
	budgetItems: InferredBudgetItemSchema[];
}

export const BudgetItemTable = ({ budgetItems }: BudgetItemTableProps) => {
	const [deleteBudgetItem] = useDeleteBudgetItemMutation();

	const handleDeleteClick = async (id: string) => {
		try {
			const payload = await deleteBudgetItem({ id }).unwrap();

			console.log(payload);
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
			selectionType="multi"
			onDeleteClick={handleDeleteClick}
		/>
	);
};
