import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormInput } from '@/common/components/form/input';
import { FormSelect } from '@/common/components/form/select';
import { type InferredBudgetItemSchema, budgetItemSchema } from '@/features/budget/types';

type BudgetItemFormProps = {
	onSubmitBudgetItem: (data: InferredBudgetItemSchema) => void;
};

export const BudgetItemForm = ({ ...props }: BudgetItemFormProps) => {
	const methods = useForm<InferredBudgetItemSchema>({
		resolver: zodResolver(budgetItemSchema),
		defaultValues: {
			id: `budget-item-${Date.now()}`,
		},
	});

	return (
		<Container
			fitHeight
			variant="stacked"
			header={<Header variant="h2">Add a budget item</Header>}
			footer={
				<Box float="right">
					<Button
						fullWidth
						formAction="submit"
						form="budget-item-form"
						variant="primary"
						disabled={Object.keys(methods.formState.errors).length > 0}
					>
						Add budget item
					</Button>
				</Box>
			}
		>
			<FormProvider {...methods}>
				<Form variant="embedded">
					<form
						id="budget-item-form"
						onSubmit={(event) => {
							void methods.handleSubmit(props.onSubmitBudgetItem)(event);
							methods.reset({
								id: `budget-item-${Date.now()}`,
							});
						}}
					>
						<SpaceBetween size="m" direction="vertical">
							<FormInput<InferredBudgetItemSchema>
								ariaRequired
								name="title"
								label="Item name"
								autoComplete={false}
								clearAriaLabel="Clear"
							/>
							<FormInput<InferredBudgetItemSchema>
								ariaRequired
								disableBrowserAutocorrect
								autoComplete={false}
								name="value"
								label="Amount"
								type="number"
								inputMode="decimal"
								clearAriaLabel="Clear"
							/>
							{/* type BudgetCatagories = 'Shopping' | 'Bills' | 'Savings' | 'Loans' | 'Food' | 'Misc'; */}
							<FormSelect<InferredBudgetItemSchema>
								name="category"
								label="Category"
								options={[
									{ label: 'Shopping', value: 'shopping' },
									{ label: 'Bills', value: 'bills' },
									{ label: 'Savings', value: 'loans' },
									{ label: 'Food', value: 'food' },
									{ label: 'Misc.', value: 'misc' },
								]}
							/>
						</SpaceBetween>
					</form>
				</Form>
			</FormProvider>
		</Container>
	);
};
