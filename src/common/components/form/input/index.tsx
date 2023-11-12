import Button from '@cloudscape-design/components/button';
import FormField, { type FormFieldProps } from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Input, { type InputProps } from '@cloudscape-design/components/input';
import { useState } from 'react';
import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = Omit<InputProps, 'onChange' | 'name' | 'value'> & {
	name: Path<T>;
	label?: FormFieldProps['label'];
	description?: FormFieldProps['description'];
	info?: FormFieldProps['info'];
	constraintText?: FormFieldProps['constraintText'];
	i18nString?: FormFieldProps['i18nStrings'];
	stretch?: FormFieldProps['stretch'];
	sensitive?: boolean;
};

export const FormInput = <T extends FieldValues>({ ...props }: FormInputProps<T>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<T>();

	const [isInputVisible, setIsInputVisible] = useState(false);

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
					{props.sensitive ? (
						<Grid gridDefinition={[{ colspan: 1 }, { colspan: 11 }]}>
							<Button
								variant="icon"
								formAction="none"
								iconName={isInputVisible ? 'lock-private' : 'unlocked'}
								onClick={() => {
									setIsInputVisible((prev) => !prev);
								}}
							/>
							<Input
								{...field}
								{...props}
								type={isInputVisible ? 'text' : 'password'}
								onChange={(event) => {
									field.onChange(event.detail.value);
								}}
							/>
						</Grid>
					) : (
						<Input
							{...field}
							{...props}
							type={props.type}
							onChange={(event) => {
								field.onChange(event.detail.value);
							}}
						/>
					)}
				</FormField>
			)}
		/>
	);
};
