import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import FormField, { type FormFieldProps } from '@cloudscape-design/components/form-field';
import Select, { type SelectProps } from '@cloudscape-design/components/select';

type FormSelectProps<T extends FieldValues> = Omit<
	SelectProps,
	'onChange' | 'name' | 'selectedOption'
> & {
	name: Path<T>;
	label?: FormFieldProps['label'];
	description?: FormFieldProps['description'];
	info?: FormFieldProps['info'];
	constraintText?: FormFieldProps['constraintText'];
	i18nString?: FormFieldProps['i18nStrings'];
	stretch?: FormFieldProps['stretch'];
};

export const FormSelect = <T extends FieldValues>({
	options,
	...props
}: FormSelectProps<T>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<T>();

	return (
		<Controller
			name={props.name}
			control={control}
			render={({ field }) => (
				<FormField
					label={props.label}
					errorText={errors[props.name]?.message as string | undefined}
				>
					<Select
						{...field}
						{...props}
						options={options}
						selectedOption={
							options?.find(
								(option: SelectProps.Option) =>
									option.value === field.value,
							) ?? null
						}
						onChange={(event) => {
							field.onChange(event.detail.selectedOption.value);
						}}
					/>
				</FormField>
			)}
		/>
	);
};
