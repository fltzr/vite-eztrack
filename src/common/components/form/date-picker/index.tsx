import DatePicker, { DatePickerProps } from '@cloudscape-design/components/date-picker';
import FormField, { type FormFieldProps } from '@cloudscape-design/components/form-field';
import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';

type FormDatePickerProps<T extends FieldValues> = Omit<DatePickerProps, 'onChange' | 'name' | 'value'> & {
	name: Path<T>;
	label?: FormFieldProps['label'];
	description?: FormFieldProps['description'];
	info?: FormFieldProps['info'];
	constraintText?: FormFieldProps['constraintText'];
	i18nString?: FormFieldProps['i18nStrings'];
	stretch?: FormFieldProps['stretch'];
};

export const FormDatePicker = <T extends FieldValues>({ ...props }: FormDatePickerProps<T>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<T>();

	return (
		<Controller
			name={props.name}
			control={control}
			render={({ field }) => (
				<FormField label={props.label} errorText={errors[props.name]?.message as string | undefined}>
					<DatePicker
						{...field}
						{...props}
						value={field.value}
						onChange={(event) => {
							field.onChange(event.detail.value);
						}}
					/>
				</FormField>
			)}
		/>
	);
};
