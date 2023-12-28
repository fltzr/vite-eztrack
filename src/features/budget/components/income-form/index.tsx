import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import { incomeSchema, type InferredIncomeSchema } from '../../types';
import { FormInput } from '@/common/components/form/input';

interface IncomeFormProps {
	onSubmitIncome: (data: InferredIncomeSchema) => void;
}

export const IncomeForm = ({ onSubmitIncome }: IncomeFormProps) => {
	const methods = useForm<InferredIncomeSchema>({
		resolver: zodResolver(incomeSchema),
	});

	return (
		<Container
			fitHeight
			variant="stacked"
			header={<Header variant="h2">Add income</Header>}
			footer={
				<Box float="right">
					<Button
						fullWidth
						formAction="submit"
						form="income-form"
						variant="primary"
						disabled={Object.keys(methods.formState.errors).length > 0}
					>
						Add income
					</Button>
				</Box>
			}
		>
			<FormProvider {...methods}>
				<form
					id="income-form"
					onSubmit={(event) => {
						void methods.handleSubmit(onSubmitIncome)(event);
					}}
				>
					<Form>
						<FormInput<InferredIncomeSchema>
							ariaRequired
							disableBrowserAutocorrect
							autoComplete={false}
							name="income"
							label="Income"
							type="number"
						/>
					</Form>
				</form>
			</FormProvider>
		</Container>
	);
};
