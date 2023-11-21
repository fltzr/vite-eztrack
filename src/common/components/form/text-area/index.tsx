import { useFormContext, type FieldValues, type Path, Controller } from 'react-hook-form';
import FormField, { type FormFieldProps } from '@cloudscape-design/components/form-field';
import Textarea, { type TextareaProps } from '@cloudscape-design/components/textarea';

type FormTextareaProps<T extends FieldValues> = Omit<
	TextareaProps,
	'onChange' | 'name' | 'value'
> & {
	name: Path<T>;
	label?: FormFieldProps['label'];
	description?: FormFieldProps['description'];
	info?: FormFieldProps['info'];
	constraintText?: FormFieldProps['constraintText'];
	i18nString?: FormFieldProps['i18nStrings'];
	stretch?: FormFieldProps['stretch'];
};

export const FormTextarea = <T extends FieldValues>({
	...props
}: FormTextareaProps<T>) => {
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
					stretch={props.stretch}
					errorText={errors[props.name]?.message as string | undefined}
				>
					<Textarea
						{...field}
						{...props}
						onChange={(event) => {
							field.onChange(event.detail.value);
						}}
					/>
				</FormField>
			)}
		/>
	);
};
