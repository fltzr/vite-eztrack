import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import FormField, { type FormFieldProps } from '@cloudscape-design/components/form-field';
import Tiles, { type TilesProps } from '@cloudscape-design/components/tiles';

type FormTilesProps<T extends FieldValues> = Omit<
	TilesProps,
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

export const FormTiles = <T extends FieldValues>({ ...props }: FormTilesProps<T>) => {
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
					<Tiles
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
